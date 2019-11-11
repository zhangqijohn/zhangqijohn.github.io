const user = {
  state: {
    userInfo: {
      name: null
    }
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUser ({ commit }, userInfo) {
      commit('SET_USER', userInfo)
    }
  }
}

export default user
