import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    createSession(state, user) {
      state.user = user;
    },
    destroySession(state) {
      delete state.user;
    }
  },
  actions: {},
  modules: {}
});
