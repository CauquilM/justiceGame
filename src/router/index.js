import Vue from 'vue'
import VueRouter from 'vue-router'
import CourtView from "@/views/CourtView.vue";
import CasesHistoryView from "@/views/CasesHistoryView.vue";
import CasesStatisticsView from "@/views/CasesStatisticsView.vue";
import PenalCodeView from "@/views/PenalCodeView.vue";
import IdeasView from "@/views/IdeasView.vue";
/*import CreateCaseView from "@/views/CreateCaseView.vue";*/

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'court',
    component: CourtView
  },
  {
    path: '/history',
    name: 'cases-history',
    component: CasesHistoryView
  },
  {
    path: '/statistics',
    name: 'cases-statistics',
    component: CasesStatisticsView
  },
  {
    path: '/laws',
    name: 'penal-code',
    component: PenalCodeView
  },
  {
    path: '/ideas',
    name: 'ideas',
    component: IdeasView
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
