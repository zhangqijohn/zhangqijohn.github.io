import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app'
import user from '@/store/modules/user'
import router from '@/store/modules/router'
import tagsView from '@/store/modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    router,
    tagsView
  },
  getters: {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    userInfo: state => state.user.userInfo,
    routes: state => state.router.routes,
    userRoutes: state => state.router.userRoutes
  }
})

export default store
