import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER: function (state, user) {
      state.user = user
    }
  },
  getters: {
    signed: function (state) {
      return state.user !== null
    }
  },
  modules: {
  }
})
