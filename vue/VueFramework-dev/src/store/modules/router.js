import { fixedRoutes, dynamicRoutes } from '@/router'

function hasRoute (menus, route) {
  return menus.some(menu => menu.name === route.name)
}

function getRoutes (menus, dynamicRoutes) {
  const routes = dynamicRoutes.filter(route => {
    if (hasRoute(menus, route)) {
      if (route.children && route.children.length) {
        route.children = getRoutes(menus, route.children)
      }
      return true
    }
    return false
  })
  return routes
}

const router = {
  state: {
    routes: fixedRoutes,
    userRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.userRoutes = routes
      state.routes = fixedRoutes.concat(routes)
    }
  },
  actions: {
    setRoutes ({ commit }, menus) {
      var routes = getRoutes(menus, dynamicRoutes)
      routes = routes.concat([{ path: '*', redirect: '/404', hidden: true }])
      commit('SET_ROUTES', routes)
    }
  }
}

export default router
