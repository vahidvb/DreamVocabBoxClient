import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    token: localStorage.getItem("token"),
    nickname: localStorage.getItem("nickname"),
    avatar: localStorage.getItem("avatar"),
    email: localStorage.getItem("email"),
    username: localStorage.getItem("username"),
  }),
  actions: {
    reloadValues() {
      this.token = localStorage.getItem("token");
      this.nickname = localStorage.getItem("nickname");
      this.avatar = localStorage.getItem("avatar");
      this.email = localStorage.getItem("email");
      this.username = localStorage.getItem("username");
    }
  },
});
