import Vue from 'vue'
import VueRouter from 'vue-router'
import CourtView from "@/views/CourtView.vue";
/*import CreateCaseView from "@/views/CreateCaseView.vue";*/

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'court',
    component: CourtView
  },
  /*{
    path: '/create',
    name: 'case-creation',
    component: CreateCaseView
  },
  {
    path: '*',
    name: 'not-found',
    redirect: '/'
  },*/
]

const router = new VueRouter({
  routes
})

export default router
