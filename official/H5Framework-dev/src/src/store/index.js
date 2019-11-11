import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/auth'

Vue.use(Vuex);

const storeConf = {
    state: {
        logined: true,
        user: {},
        clientContext: {}
    },
    mutations: {
        SET_USER (state, value) {
            state.user = value
        },
        SET_CONTEXT (state, value) {
            state.clientContext = value.clientContext
        }
    },
    actions: {
        GET_USER ({ commit }) {
            return getUserInfo()
                    .then((response) => {
                        commit("SET_USER", response.body)
                    })
                    .catch(error => {
                        if(error.response.data.statusCode===403) {
                            const query = window.location.href.split('?')[1];
                            window.location.href = `/index.html?${query}`
                        }
                    })
        },
        GET_CONTEXT ({ commit }, value) {
            commit("SET_CONTEXT", value)
        }
    },
    getters: {
        user: state => state.user,
        context: state => state.clientContext
    }
};

export default new Vuex.Store(storeConf)