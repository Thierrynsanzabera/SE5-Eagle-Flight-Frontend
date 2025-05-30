// import { createStore } from "vuex";
// import Utils from "./config/utils";

// Vue.use(Vuex);

// const user = Utils.getStore("user");

// const store = createStore({
//   state: {
//     loginUser: user,
//   },
//   mutations: {
//     setLoginUser(state, user) {
//       state.loginUser = user;
//       Utils.setStore("user", user);
//     },
//   },
//   actions: {},
//   getters: {
//     getLoginUserInfo(state) {
//       return state.loginUser;
//     },
//   },
// });

// export default store;

import { defineStore } from 'pinia'
import Utils from '@/config/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginUser: Utils.getStore('user')
  }),
  actions: {
    setLoginUser(user) {
      this.loginUser = user
      Utils.setStore('user', user)
    }
  },
  getters: {
    getLoginUserInfo: (state) => state.loginUser,
    userId: (state) => state.loginUser?.userId
  }
})