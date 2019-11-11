import Vue from 'vue'
import Router from 'vue-router'
import hi from '@/components/hi'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'hi',
      component: hi
    }
  ]
})
