import { useQuasar } from "quasar"
import type { QVueGlobals } from "quasar"

let $q: QVueGlobals

export function useShowLoading() {
  if (!$q) {
    $q = useQuasar()
  }
  $q.loading.show()
}

export function useHideLoading() {
  if ($q) {
    $q.loading.hide()
  }
}
