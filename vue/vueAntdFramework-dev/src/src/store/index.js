import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import user from './modules/user'
import router from '@/store/modules/router'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    router,
    setting
  },
  getters: {
    userInfo: state => state.user.userInfo,
    avatar: state => state.user.avatar,
    userRoutes: state => state.router.userRoutes
  }
})
