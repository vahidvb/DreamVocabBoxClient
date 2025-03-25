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
    friendshipPending: 0,
    messagesUnread: 0,
    allVocabularyCount: 0,
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
        this.boxScenarios = response.Data.Scenarios;
        this.friendshipPending = response.Data.FriendshipPending;
        this.messagesUnread = response.Data.MessagesUnread;
        this.allVocabularyCount = response.Data.AllVocabularyCount;
      }
      else
        this.notyf.apiResult(response);
    },
    emptyValues() {
      this.nickname = '';
      this.avatar = '';
      this.email = '';
      this.username = '';
      this.boxscenario = '';
      this.boxScenarios = [];
      this.friendshipPending = 0;
      this.messagesUnread = 0;
      this.allVocabularyCount = 0;
    }
  },
});
