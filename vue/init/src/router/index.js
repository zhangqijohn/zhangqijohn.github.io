import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home',
      hidden: true
    },
    {
      path: '/home',
      component: Layout,
      children: [{
        path: '',
        name: 'home-index',
        component: () => import('@/views/Home/Index'),
        meta: {title: '冰川权限管理系统', icon: 'home'}
      }]
    }
  ]
})
