import { createRouter, createWebHistory } from "vue-router"
import BmonsterView from "@/views/BmonsterView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "bmonster",
      component: BmonsterView
    }
  ]
})

export default router
