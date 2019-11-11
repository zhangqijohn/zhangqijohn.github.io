import 'babel-polyfill'
import 'json3'
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'
import { device } from '@/util'
import './mock'

Vue.config.productionTip = false

if(device.isMobile()) {
  device.flexible({
    width: 750
  })
}

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})