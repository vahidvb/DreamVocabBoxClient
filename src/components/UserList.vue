<template>
  <v-list-item-group v-for="(user, userIndex) in users" :key="user.Id">
    <v-list-item :prepend-avatar="`images/avatars/avatar-${user.Avatar}.png`">
      <v-list-item-title>{{ user.NickName }}</v-list-item-title>
      <v-list-item-subtitle>{{ user.UserName }}</v-list-item-subtitle>
      <v-list-item-action>
        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-minus" color="warning" variant="tonal"
          @click="cancelFriendship(user.UserId)"
          v-if="user.FriendshipStatus == friendshipStatuses.Pending && user.IsSentByUser" size="x-small"
          style="font-size: 12px;">
          Cancel Request
        </v-btn>
        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-remove" color="danger" variant="tonal"
          @click="deleteFriendship(user.UserId)" v-if="user.FriendshipStatus == friendshipStatuses.Accepted"
          size="x-small" style="font-size: 12px;">
          Unfriend
        </v-btn>
        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-plus" color="primary" variant="tonal"
          @click="requestFriendship(user.UserId)" v-if="user.FriendshipStatus == friendshipStatuses.Nothing">
          Send Request
        </v-btn>
        <v-btn class="mt-1 me-2" prepend-icon="mdi-account-multiple-check" color="success" variant="tonal"
          @click="acceptFriendship(user.UserId)"
          v-if="user.FriendshipStatus == friendshipStatuses.Pending && !user.IsSentByUser">Accept</v-btn>
        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-remove" color="danger" variant="tonal"
          @click="rejectFriendship(user.UserId)"
          v-if="user.FriendshipStatus == friendshipStatuses.Pending && !user.IsSentByUser">Reject</v-btn>
      </v-list-item-action>
      <template v-slot:append>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps" @click="getUserProfileStatics(user.UserId)" class="mt-1"
              icon="mdi-information-slab-circle" variant="tonal">
            </v-icon>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card :prepend-avatar="`images/avatars/avatar-${user.Avatar}.png`"
              :title="`${userProfileStatics.NickName}`">
              <v-card-text>
                <div class="fw-bolder">
                  <div class="container-fluid mt-2">
                    <div class="row">
                      <div class="d-flex justify-content-center"
                        :class="{ 'col-4': index < 6, 'col-10 mx-auto': index == 6 }"
                        v-for="(box, index) in userProfileStatics.InBoxVocabularyCount" :key="index">
                        <div class="box">
                          <div class="row">
                            <div class="text-center" :class="{ 'col-12': index < 6, 'col-5': index == 6 }">
                              <img v-bind="activatorProps" v-bind:src="'/images/boxes/' + (index + 1) + '.png'" alt="">
                              {{ box }}
                            </div>
                            <div class="col-7 box-7-text" v-if="index == 6 && box > 0">
                              <span style="font-size: .7em;">{{ user.NickName }} has deeply memorized
                                <b style="font-size: 2em;">{{ box }}</b>
                                words.</span>
                            </div>
                            <div class="col-7 box-7-text" v-if="index == 6 && box == 0">
                              <span style="font-size: .7em;">{{ user.NickName }} hasnt reached this box yet.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <v-divider></v-divider>
                <div class="fw-bolder">Total Vocabularies: {{ userProfileStatics.TotalVocabularyCount }}</div>
                <div class="fw-bolder">Register Age: {{ userProfileStatics.RegisterAge }}
                </div>
                <div class="fw-bolder">Last Check: {{ userProfileStatics.LastCheck }}</div>
                <div class="fw-bolder">Last Added Vocabulary: {{
                  userProfileStatics.LastAddVocabulary }}</div>
                <div class="fw-bolder">Total Checks: {{
                  userProfileStatics.TotalCheck }}</div>
                <div class="fw-bolder">Average Daily Check: {{
                  userProfileStatics.AverageDailyCheck }}</div>
                <div class="fw-bolder">Average Daily Learned Check: {{
                  userProfileStatics.AverageDailyLearnedCheck }}</div>
                <div class="fw-bolder">Average Daily Not Learned Check: {{
                  userProfileStatics.AverageDailyNotLearnedCheck }}</div>
                <div class="fw-bolder">Average Daily Add: {{
                  userProfileStatics.AverageDailyAdd }}</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" @click="userProfileStatics = {}; isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-list-item>
    <v-list-item v-if="userIndex < users.length - 1">
      <v-divider inset style="margin: 0; max-width: 100%"></v-divider>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { useUserInfoStore } from '../stores/userInfoStore';

export default {
  name: "UserListComponent",
  props: {
    users: {
      type: Array,
      required: true,
    },
    search: {
      type: Function,
      required: false,
    },
    getFriendList: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      userInfoStore: useUserInfoStore(),
      userProfileStatics: {},
      friendshipStatuses: {
        Pending: 0,
        Accepted: 1,
        Nothing: 6,
      },
    };
  },
  methods: {
    async requestFriendship(UserId) {
      const response = await this.postRequest("Friendships", "RequestFriendship", UserId, true);
      this.checkResponse(response);
    },
    async cancelFriendship(UserId) {
      const response = await this.postRequest("Friendships", "CancelFriendship", UserId, true);
      this.checkResponse(response);
    },
    async deleteFriendship(UserId) {
      const response = await this.postRequest("Friendships", "DeleteFriendship", UserId, true);
      this.checkResponse(response);
    },
    async rejectFriendship(UserId) {
      const response = await this.postRequest("Friendships", "RejectFriendship", UserId, true);
      this.checkResponse(response);
    },
    async acceptFriendship(UserId) {
      const response = await this.postRequest("Friendships", "AcceptFriendship", UserId, true);
      this.checkResponse(response);
    },
    async getUserProfileStatics(UserId) {
      const response = await this.postRequest("Users", "GetUserProfileStatics", UserId);
      this.userProfileStatics = response.IsSuccess ? response.Data : {};
    },
    async checkResponse(response) {
      if (response.IsSuccess) {
        await this.userInfoStore.reloadValues();
        if (this.getFriendList)
          this.getFriendList();
        if (this.search)
          this.search();
      }
      this.notyf.apiResult(response);
    }
  },
};
</script>