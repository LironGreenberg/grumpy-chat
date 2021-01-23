import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userName: ''
  },
  getters: {
    getUserName: state => state.userName,
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    },
  },
  actions: {
    changeUserName({ commit }, usersName) {
      commit('setUserName', usersName);
    }
  },
  modules: {
  }
})
