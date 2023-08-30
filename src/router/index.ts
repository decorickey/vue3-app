import { createRouter, createWebHistory } from "vue-router"
import IndexView from "@/views/IndexView.vue"
import BmonsterView from "@/views/BmonsterView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView
    },
    {
      path: "/bmonster",
      name: "bmonster",
      component: BmonsterView
    }
  ]
})

export default router
