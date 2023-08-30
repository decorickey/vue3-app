<script setup lang="ts">
// import { ref } from "vue"

// const rightDrawerOpen = ref(false)
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- Title -->
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" bordered> -->
      <!-- drawer content -->
    <!-- </q-drawer> -->

    <q-page-container class="q-ma-md">
      <suspense>
        <router-view />
      </suspense>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
