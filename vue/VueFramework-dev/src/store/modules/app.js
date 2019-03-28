const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    toggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar: ({ commit }, { withoutAnimation }) => {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice: ({ commit }, device) => {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
