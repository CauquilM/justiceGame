import Vue from 'vue'
import App from './App.vue'
import "./assets/main.css"
import './assets/css/tabler-icons.min.css'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
