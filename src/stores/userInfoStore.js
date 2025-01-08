import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    token: localStorage.getItem("token"),
    nickname: localStorage.getItem("nickname"),
    avatar: localStorage.getItem("avatar"),

  }),
  actions: {
    reloadValues() {
      this.token = localStorage.getItem("token");
      this.nickname = localStorage.getItem("nickname");
      this.avatar = localStorage.getItem("avatar");
    }
  },
});
