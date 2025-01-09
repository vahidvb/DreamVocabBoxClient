<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <v-app-bar v-if="$route.meta.showHeader" style="width: 448px;left: 50%;transform: translateX(-50%);"
        color="teal-darken-4" image="images/bg.webp">
        <template v-slot:prepend>
          <v-btn v-bind:disabled="hideBackBtn" @click="goBack" icon="mdi-arrow-left"></v-btn>
        </template>
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.7)"></v-img>
        </template>

        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">

            <v-app-bar-nav-icon v-bind="activatorProps" @click="fillProfile">
              <router-link class="navbar-brand" to="/">
                <img :src="'images/avatars/avatar-' + userInfoStore.avatar + '.png'">
              </router-link>
            </v-app-bar-nav-icon>
            <v-app-bar-title v-bind="activatorProps" @click="fillProfile" style="font-size: 15px;">{{
              userInfoStore.nickname }}</v-app-bar-title>


          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Edit Profile">
              <v-card-text>

                <v-row>
                  <v-col cols="3">
                    <v-row>
                      <v-col cols="12">
                        <img :src="'images/avatars/avatar-' + profile.avatar + '.png'">
                      </v-col>
                      <v-col cols="6">
                        <v-icon color="primary" :disabled="profile.avatar == 1"
                          @click="profile.avatar > 1 ? profile.avatar -= 1 : 1">mdi-chevron-left</v-icon>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <v-icon color="primary" :disabled="profile.avatar == 26"
                          @click="profile.avatar += 1">mdi-chevron-right</v-icon>
                      </v-col>

                    </v-row>


                  </v-col>
                  <v-col cols="9">
                    <v-text-field v-model="profile.username" label="UserName" hint="Your unique username for login" autocomplete="off"
                      persistent-hint outlined class="mb-3"></v-text-field>
                    <v-text-field v-model="profile.nickname" label="Name" hint="What should we call you?" autocomplete="off"
                      persistent-hint outlined class="mb-3"></v-text-field>
                    <v-text-field v-model="profile.email" label="Email Address" autocomplete="off"
                      hint="Email for password recovery (optional)" persistent-hint outlined type="email"
                      class="mb-3"></v-text-field>
                    <v-text-field v-model="profile.password" label="Change Password" autocomplete="new-password"
                      hint="If you do not want to change the password, leave this field blank (optional)"
                      persistent-hint outlined type="password" class="mb-3"></v-text-field>
                  </v-col>

                </v-row>


              </v-card-text>

              <v-card-actions>
                <v-dialog max-width="300">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="mr-auto" v-bind="activatorProps" color="danger">Logout</v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Confirm Logout">
                      <v-card-text>
                        Are you sure you want to logout?
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" text @click="isActive.value = false">Cancel</v-btn>
                        <v-btn color="red" text @click="logout">Logout</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-btn text="Close" @click="isActive.value = false"></v-btn>
                <v-btn color="success" @click="updateProfile">Update Profile</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-spacer></v-spacer>


        <router-link to="/Boxes" class="nav-link">
          <v-btn icon>
            <v-icon>mdi-inbox-multiple</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/AddVocabulary" class="nav-link">
          <v-btn icon>
            <v-icon>mdi-receipt-text-plus</v-icon>
          </v-btn>
        </router-link>

      </v-app-bar>

      <v-main style="min-height: 100vh;">
        <router-view />
        <Loading />
      </v-main>
    </v-layout>
  </v-card>


</template>

<script>
import Loading from './components/Loading.vue';
import { useUserInfoStore } from './stores/userInfoStore';

export default {
  name: 'App',
  components: {
    Loading,
  },
  data() {
    return {
      userInfoStore: useUserInfoStore(),
      hideBackBtn: false,
      profile: {
        nickname: localStorage.getItem("nickname"),
        avatar: parseInt(localStorage.getItem("avatar")),
        email: localStorage.getItem("email"),
        username: localStorage.getItem("username"),
        password: '',
      }
    };
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.hideBackBtn = to.path.toLocaleLowerCase() == "/boxes";
    }
  },
  methods: {
    async updateProfile() {
      const response = await this.postRequest('Users', 'UpdateProfile', this.profile);
      this.notyf.apiResult(response);
      if (response.IsSuccess) {
        localStorage.setItem("token", response.Data.Token);
        localStorage.setItem("nickname", response.Data.NickName);
        localStorage.setItem("avatar", response.Data.Avatar);
        localStorage.setItem("email", response.Data.Email);
        localStorage.setItem("username", response.Data.UserName);
        this.userInfoStore.reloadValues();
  
      }

    },
    goBack() {
      this.$router.back(-1);
    },
    logout() {
      localStorage.removeItem("nickname");
      localStorage.removeItem("avatar");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.userInfoStore.reloadValues();
      this.$router.push('/Login');
    },
    fillProfile() {

      this.profile.nickname = localStorage.getItem("nickname");
      this.profile.avatar = parseInt(localStorage.getItem("avatar"));
      this.profile.email = localStorage.getItem("email");
      this.profile.username = localStorage.getItem("username");
      this.profile.password = '';

    }


  }
};
</script>
<style></style>