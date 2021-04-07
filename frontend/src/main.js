import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import './main.css'

Vue.config.productionTip = false

Vue.prototype.$http = http

if (localStorage.getItem('token')) {
  http.defaults.headers.common.Authorization = localStorage.getItem('token');
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
