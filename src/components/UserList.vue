<template>
  <v-list-item-group v-for="(user, userIndex) in users" :key="user.Id">
    <v-list-item :prepend-avatar="`images/avatars/avatar-${user.Avatar}.png`">
      <v-list-item-title>{{ user.NickName }}</v-list-item-title>
      <v-list-item-subtitle>{{ user.UserName }}</v-list-item-subtitle>

      <!-- Friend Actions -->
      <v-list-item-action v-if="type != 'share'">
        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-minus" color="warning" variant="tonal"
          @click="cancelFriendship(user.UserId)"
          v-if="user.FriendshipStatus == friendshipStatuses.Pending && user.IsSentByUser" size="x-small"
          style="font-size: 12px;">
          {{ $t('components.userList.cancelRequest') }}
        </v-btn>

        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-remove" color="danger" variant="tonal"
          @click="deleteFriendship(user.UserId)" v-if="user.FriendshipStatus == friendshipStatuses.Accepted"
          size="x-small" style="font-size: 12px;">
          {{ $t('components.userList.unfriend') }}
        </v-btn>

        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-plus" color="primary" variant="tonal"
          @click="requestFriendship(user.UserId)" v-if="user.FriendshipStatus == friendshipStatuses.Nothing">
          {{ $t('components.userList.sendRequest') }}
        </v-btn>

        <v-btn class="mt-1 me-2" prepend-icon="mdi-account-multiple-check" color="success" variant="tonal"
          @click="acceptFriendship(user.UserId)"
          v-if="user.FriendshipStatus == friendshipStatuses.Pending && !user.IsSentByUser">
          {{ $t('components.userList.accept') }}
        </v-btn>

        <v-btn class="mt-1" prepend-icon="mdi-account-multiple-remove" color="danger" variant="tonal"
          @click="rejectFriendship(user.UserId)"
          v-if="user.FriendshipStatus == friendshipStatuses.Pending && !user.IsSentByUser">
          {{ $t('components.userList.reject') }}
        </v-btn>
      </v-list-item-action>

      <!-- Append Section -->
      <template v-slot:append>

        <!-- Share Mode -->
        <div v-if="type == 'share'">
          <v-btn class="mt-1" prepend-icon="mdi-share" color="success" variant="tonal"
            @click="shareVocabulary(user.UserId)" v-if="!user.AddedVocabulary" style="font-size: 12px;">
            {{ $t('components.userList.share') }}
          </v-btn>

          <v-text v-if="user.AddedVocabulary" class="description-text">
            {{ $t('components.userList.addedBefore') }}
          </v-text>
        </div>

        <!-- Profile Dialog -->
        <v-dialog max-width="500" v-if="type != 'share'">
          <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps" @click="getUserProfileStatics(user.UserId)" class="mt-1"
              icon="mdi-information-slab-circle" variant="tonal" />
          </template>

          <template v-slot:default="{ isActive }">
            <v-card :prepend-avatar="`images/avatars/avatar-${user.Avatar}.png`"
              :title="`${userProfileStatics.NickName}`">
              <v-card-text>

                <!-- Boxes -->
                <div class="container-fluid mt-2">
                  <div class="row">
                    <div class="d-flex justify-content-center"
                      :class="{ 'col-4': index < 6, 'col-10 mx-auto': index == 6 }"
                      v-for="(box, index) in userProfileStatics.InBoxVocabularyCount" :key="index">
                      <div class="box">
                        <div class="row">
                          <div class="text-center" :class="{ 'col-12': index < 6, 'col-5': index == 6 }">
                            <img :src="'/images/boxes/' + (index + 1) + '.png'" alt="">
                            {{ box }}
                          </div>

                          <!-- Box 7 Text -->
                          <div class="col-7 box-7-text" v-if="index == 6 && box > 0">
                            <span style="font-size: .7em;">
                              {{ $t('components.userList.deeplyMemorized', {
                                name: user.NickName,
                                count: box
                              }) }}
                            </span>
                          </div>

                          <div class="col-7 box-7-text" v-if="index == 6 && box == 0">
                            <span style="font-size: .7em;">
                              {{ $t('components.userList.notReachedBox', {
                                name: user.NickName
                              }) }}
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <v-divider class="my-2"></v-divider>

                <!-- Statistics -->
                <div class="fw-bolder">
                  {{ $t('components.userList.totalVocabularies') }}:
                  {{ userProfileStatics.TotalVocabularyCount }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.registerAge') }}:
                  {{ userProfileStatics.RegisterAge }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.lastCheck') }}:
                  {{ userProfileStatics.LastCheck }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.lastAddedVocabulary') }}:
                  {{ userProfileStatics.LastAddVocabulary }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.totalChecks') }}:
                  {{ userProfileStatics.TotalCheck }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.averageDailyCheck') }}:
                  {{ userProfileStatics.AverageDailyCheck }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.averageDailyLearnedCheck') }}:
                  {{ userProfileStatics.AverageDailyLearnedCheck }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.averageDailyNotLearnedCheck') }}:
                  {{ userProfileStatics.AverageDailyNotLearnedCheck }}
                </div>

                <div class="fw-bolder">
                  {{ $t('components.userList.averageDailyAdd') }}:
                  {{ userProfileStatics.AverageDailyAdd }}
                </div>

              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :text="$t('public.close')" @click="userProfileStatics = {}; isActive.value = false" />
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
    refreshMethod: {
      type: Function,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    shareAttachments: {
      type: Array,
      required: false,
    },
    shareMessage: {
      type: String,
      required: false,
    }
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
    async shareVocabulary(UserId) {
      const form = {
        ReceiverUserId: UserId,
        Content: this.shareMessage,
        Attachments: this.shareAttachments,
      };
      const response = await this.postRequest("Messages", "AddMessage", form, true);
      this.checkResponse(response);
    },
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
      this.userInfoStore.reloadValues();
    },
    async acceptFriendship(UserId) {
      const response = await this.postRequest("Friendships", "AcceptFriendship", UserId, true);
      this.checkResponse(response);
      this.userInfoStore.reloadValues();
    },
    async getUserProfileStatics(UserId) {
      const response = await this.postRequest("Users", "GetUserProfileStatics", UserId);
      this.userProfileStatics = response.IsSuccess ? response.Data : {};
    },
    async checkResponse(response) {
      if (response.IsSuccess) {
        await this.userInfoStore.reloadValues();
        if (this.refreshMethod)
          this.refreshMethod();
      }
      this.notyf.apiResult(response);
    }
  },
};
</script>