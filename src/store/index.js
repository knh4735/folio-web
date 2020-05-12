import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    createSession (state, payload) {
      state.user = payload.user;
      localStorage.setItem('user', JSON.stringify(payload.session));
    },
    destroySession (state) {
      delete state.user;
      localStorage.removeItem('user');
    }
  },
  actions: {
  },
  modules: {
  }
})
