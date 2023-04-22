import Vue from 'vue'
import VueRouter from 'vue-router'
import CourtView from "@/views/CourtView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CourtView
  },
]

const router = new VueRouter({
  routes
})

export default router
