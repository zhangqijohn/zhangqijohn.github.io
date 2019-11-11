const user = {
  state: {
    userInfo: {
      name: null
    },
    avatar: '/static/img/icon_default.png'
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
      state.userInfo = avatar
    }
  },
  actions: {
    setUser ({ commit }, userInfo) {
      commit('SET_USER', userInfo)
    },
    setAvatar ({ commit }, avatar) {
      commit('SET_AVATAR', avatar)
    }
  }
}

export default user
