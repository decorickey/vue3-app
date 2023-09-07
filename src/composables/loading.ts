import { useQuasar } from "quasar"

export default function () {
  const $q = useQuasar()
  const showLoading = () => $q.loading.show()
  const hideLoading = () => $q.loading.hide()

  return { showLoading, hideLoading }
}
