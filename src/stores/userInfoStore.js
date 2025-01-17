import { defineStore } from 'pinia';
import api from '../plugins/axios';

const postRequest = api.postRequest;

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    nickname: '',
    avatar: '',
    email: '',
    username: '',
    boxscenario: '',
    boxScenarios: [],
  }),
  actions: {
    async reloadValues() {
      let response = await postRequest('Users', 'GetProfile', null, false);
      if (response.IsSuccess) {
        this.nickname = response.Data.NickName;
        this.avatar = response.Data.Avatar;
        this.email = response.Data.Email;
        this.username = response.Data.UserName;
        this.boxscenario = response.Data.BoxScenario;
      }
      else
        this.notyf.apiResult(response);
      response = await postRequest('Users', 'GetScenarios', null, false);
      if (response.IsSuccess) {
        this.boxScenarios = response.Data;
      }
    },
    emptyValues() {
        this.nickname = '';
        this.avatar = '';
        this.email = '';
        this.username = '';
        this.boxscenario = '';
        this.boxScenarios = [];
    }
  },
});
