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
    children: [{
      path: '',
      name: 'home-index',
      component: () => import('@/views/Home/Index'),
      meta: { title: '主页', icon: 'home' }
    }]
  },
  {
    path: '/DataManage',
    name: 'DataManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '数据管理', icon: 'task' },
    children: [{
      path: 'UserList',
      name: 'UserList',
      component: () => import('@/views/DataManage/UserList'),
      meta: { title: '用户列表', icon: 'home' }
    },
    {
      path: 'ShopList',
      name: 'ShopList',
      component: () => import('@/views/DataManage/ShopList'),
      meta: { title: '商家列表', icon: 'home' }
    }]
  }
]

export const dynamicRoutes = []

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: fixedRoutes
})
