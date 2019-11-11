import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'

Vue.use(Router)

export const fixedRoutes = [
  {
    path: '/404',
    component: () => import('@/views/NotFound'),
    hidden: true
  },
  {
    path: '',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home-index',
        component: () => import('@/views/Home/Index'),
        meta: { title: '主页', icon: 'home' }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    children: [
      {
        path: '',
        name: 'chat',
        component: () => import('@/views/Chat/Chat1'),
        meta: { title: '聊天', icon: 'home' }
      }
    ]
  }
]

export const dynamicRoutes = []

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: fixedRoutes
})
