import Vue from 'vue'
import Router from 'vue-router'
// import RouteView from '@/layouts/RouteView'
import PageView from '@/layouts/PageView'
import MenuView from '@/layouts/MenuView'

Vue.use(Router)

export const fixedRoutes = [
  {
    path: '',
    redirect: '/activity/list',
    hidden: true
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/pages/NotFound'),
    hidden: true
  },
  {
    path: '/',
    component: MenuView,
    icon: 'none',
    redirect: '/activity/list',
    children: [
      {
        path: '/',
        name: '活动',
        component: PageView,
        icon: 'dashboard',
        children: [
          {
            path: '/activity/create',
            name: '创建活动',
            component: () => import('@/pages/Activity/Create'),
            icon: 'none'
          },
          {
            path: '/activity/type',
            name: '活动类型',
            component: () => import('@/pages/Activity/Type'),
            icon: 'none'
          },
          {
            path: '/activity/list',
            name: '活动列表',
            component: () => import('@/pages/Activity/List'),
            icon: 'none'
          }
        ]
      }
    ]
  }
]

export const dynamicRoutes = []

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...fixedRoutes,
    ...dynamicRoutes
  ]
})
