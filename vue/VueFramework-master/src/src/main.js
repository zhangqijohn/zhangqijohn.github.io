import 'babel-polyfill'
import 'es6-promise/auto'

import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import '@/icons'

// import { getContext } from '@/api/user'

Vue.use(ElementUI)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   if (store.getters.userRoutes.length === 0) {
//     getContext('app-center').then(response => {
//       store.dispatch('setUser', {name: response.name})
//       store.dispatch('setRoutes', response.menus)
//       router.addRoutes(store.getters.userRoutes)
//       next({ ...to, replace: true })
//     })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
