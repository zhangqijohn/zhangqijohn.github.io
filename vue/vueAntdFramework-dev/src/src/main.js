import Vue from 'vue'
import App from './App'
import router from './router/'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import axios from 'axios'
import store from './store'
import { getContext } from './api/user'

Vue.prototype.http = axios
Vue.config.productionTip = false
Vue.use(Antd)

router.beforeEach((to, from, next) => {
  if (store.getters.userRoutes.length === 0) {
    getContext().then(response => {
      store.dispatch('setUser', {name: response.body.name})
      next()
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
