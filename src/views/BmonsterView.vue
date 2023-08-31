<script setup lang="ts">
import { ref, watch, toValue } from "vue"
import type { QTableProps } from "quasar"
import type { Performer, Schedule } from "@/interfaces/bmonster"
import useLoading from "@/composables/loading"
import { useFetch } from "@/composables/fetch"
import { useDayOfWeek } from "@/composables/date"
import { useLocalStorage } from "@vueuse/core"

const { showLoading, hideLoading } = useLoading()
showLoading()

const selectedIds = useLocalStorage<number[]>("performer-ids", [])
const performers = await useFetch<Performer[]>("/api/bmonster/performers/")
const selectedPerformers = ref<Performer[] | null>(
  performers.value.filter((performer) => selectedIds.value.includes(performer.id))
)
watch(selectedPerformers, () => {
  selectedIds.value = selectedPerformers.value.map((performer) => performer.id)
})

const schedules = await fetchSchedules()
async function fetchSchedules() {
  if (selectedPerformers.value == null) {
    return ref([])
  }
  const schedulesList = await Promise.all(
    selectedPerformers.value.map((performer) =>
      useFetch<Schedule[]>(`/api/bmonster/performers/${performer.id}/schedules/`)
    )
  )
  const newSchedules = schedulesList
    .map((schedules) => toValue(schedules))
    .flat()
    .sort((a, b) => {
      const x = new Date(a.startAt)
      const y = new Date(b.startAt)
      return x.valueOf() - y.valueOf()
    })
  return ref(newSchedules)
}
async function updateSchedules() {
  showLoading()
  const schedulesRef = await fetchSchedules()
  schedules.value = toValue(schedulesRef)
  hideLoading()
}

const tableProps: QTableProps = {
  columns: [
    {
      name: "startAt",
      label: "DateTime",
      field: "startAt",
      align: "left",
      format: (val) => {
        const date = new Date(val)
        const dateStr = `${date.toLocaleDateString().slice(5)}`
        const dayStr = useDayOfWeek(date)
        const timeStr = `${date.toLocaleTimeString().slice(0, -3)}`
        return `${dateStr}(${dayStr}) ${timeStr}`
      },
    },
    {
      name: "performerName",
      label: "Performer",
      field: "performerName",
      align: "left",
    },
    { name: "program", label: "Program", field: "program", align: "left" },
    { name: "studio", label: "Studio", field: "studio", align: "left" },
  ],
}
function openUrl(evt: Event, row: Schedule) {
  if (row.url) {
    window.open(row.url, "_blank")
  }
}

hideLoading()
</script>

<template>
  <div class="row justify-center q-col-gutter-md">
    <div class="col-12 col-md-6">
      <q-select
        v-model="selectedPerformers"
        clearable
        multiple
        outlined
        use-chips
        :options="performers"
        option-label="name"
        @update:model-value="updateSchedules"
      />
    </div>

    <div class="col-12 col-md-6">
      <q-table
        :rows="schedules"
        row-key="index"
        :columns="tableProps.columns"
        :pagination="{ rowsPerPage: 30 }"
        @row-click="openUrl"
      />
    </div>
  </div>
</template>

<style scoped></style>
