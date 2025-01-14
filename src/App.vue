<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <v-btn icon v-show="!$route.meta.Authorize && showWebAppButton" @click="handleInstallPWA"
        style="position: absolute;top:10px;left: 10px;cursor: pointer;z-index: 9;">
        <v-icon>mdi-open-in-app</v-icon>
      </v-btn>
      <v-app-bar v-if="$route.meta.Authorize" style="width: 448px;left: 50%;transform: translateX(-50%);"
        color="teal-darken-4" image="images/bg.webp">
        <template v-slot:prepend>
          <v-btn v-bind:disabled="isBoxesPage" @click="goBack" icon="mdi-arrow-left"></v-btn>
        </template>
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.7)"></v-img>
        </template>

        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-app-bar-nav-icon v-bind="activatorProps" @click="fillProfile">
              <img :src="'images/avatars/avatar-' + userInfoStore.avatar + '.png'">
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

                    <v-select v-if="boxScenarios.length > 0" v-model="profile.boxscenario" :items="boxScenarios"
                      item-title="Title" label="Box Scenarios" item-value="Id" persistent-hint
                      :hint="boxScenarios[profile.boxscenario].Description" class="mb-3">
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :key="item.Id">

                        </v-list-item>
                      </template>
                    </v-select>

                    <v-text-field v-model="profile.username" label="UserName" hint="Your unique username for login"
                      autocomplete="off" persistent-hint outlined class="mb-3"></v-text-field>
                    <v-text-field v-model="profile.nickname" label="Name" hint="What should we call you?"
                      autocomplete="off" persistent-hint outlined class="mb-3"></v-text-field>
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



        <v-btn icon @click="suggestion.Show = false; getSuggestionWord()">
          <v-icon>mdi-auto-fix</v-icon>
        </v-btn>


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
        <v-btn icon v-if="showWebAppButton" @click="handleInstallPWA">
          <v-icon>mdi-open-in-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main style="min-height: 100vh;">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>

  <Loading />

  <v-container v-if="$route.meta.Authorize"
    v-bind:class="{ 'show': $route.meta.Authorize && selection.showBarLevel == 2, 'semi-show': $route.meta.Authorize && selection.showBarLevel == 1 }"
    class="selection-bar">
    <v-row>
      <v-col>
        <v-text class="text-center h1 w-100" block>{{ selection.text }}</v-text>
        <v-spacer></v-spacer>
        <router-link @click="selection.showBarLevel = 0" class="navbar-brand"
          :to="{ path: `/AddVocabulary/${selection.text}` }">
          <v-btn color="success" size="xs-small" class="p-1 mb-2" prepend-icon="mdi-book-alphabet">Add {{ selection.text
            }}
            To
            My Words</v-btn>
        </router-link>

        <Dictionary :text="selection.text" v-if="selection.showBarLevel > 0"></Dictionary>

      </v-col>
    </v-row>
  </v-container>
  <v-icon @click="selection.showBarLevel = 2" v-if="selection.showBarLevel == 1 && $route.meta.Authorize"
    class="selection-bar-toggler text-white">mdi-arrow-down-drop-circle</v-icon>
  <v-icon @click="selection.showBarLevel = 0; selection.text = ''"
    v-if="selection.showBarLevel == 2 && $route.meta.Authorize"
    class="selection-bar-toggler text-white">mdi-close-circle</v-icon>


  <div class="suggest-notify" v-bind:class="{ 'show-notify': suggestion.Show }" v-if="$route.meta.Authorize">
    <h7>Word Suggestion</h7>
    <h5 class="m-0">{{ suggestion.Word }}</h5>
    <div>{{ suggestion.Definition }}</div>
    <router-link :to="'/AddVocabulary/' + suggestion.Word" @click="suggestion.Show = false">
      <button class="btn btn-sm btn-light mt-2"><span class="mdi mdi-receipt-text-plus"></span> Go To Add New
        Word</button>
    </router-link>
    <v-icon class="suggest-close" @click="suggestion.Show = false">mdi-close</v-icon>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import Loading from './components/Loading.vue';
import Dictionary from './components/Dictionary.vue';
import { useUserInfoStore } from './stores/userInfoStore';
import { useSharedMethods } from './stores/sharedMethods';
export default {
  name: 'App',
  components: {
    Loading, Dictionary,

  },
  data() {
    return {
      showWebAppButton: (!localStorage.getItem('appInstalled') ?? true) && this.deferredPrompt != null,
      deferredPrompt: null,
      suggestion: {
        Show: false,
        Word: '',
        Definition: {}
      },
      boxScenarios: [],
      selection: {
        showBarLevel: 0,
        text: ''
      },
      userInfoStore: useUserInfoStore(),
      isBoxesPage: false,
      profile: {
        nickname: localStorage.getItem("nickname"),
        avatar: parseInt(localStorage.getItem("avatar")),
        email: localStorage.getItem("email"),
        boxscenario: localStorage.getItem("boxscenario"),
        username: localStorage.getItem("username"),
        password: '',
      }
    };
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.selection.showBarLevel = 0;
      this.selection.text = '';
      this.isBoxesPage = to.path.toLocaleLowerCase() == "/boxes";
    }
  },
  async mounted() {

    // Start Install PWA
    window.addEventListener("load", () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
      }
      if (localStorage.getItem('appInstalled')) {
        this.showWebAppButton = false;
      }
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      localStorage.removeItem('appInstalled');
      e.preventDefault();
      this.showWebAppButton = true;
      this.deferredPrompt = e;
      return false;
    });
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      this.showWebAppButton = false;
      window.resizeTo(500, 870);

      window.addEventListener('resize', () => {
        window.resizeTo(500, 870);
      })
    }
    else if (this.deferredPrompt) {
      this.showWebAppButton = true;
      localStorage.removeItem('appInstalled');

    }
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('appInstalled', 'true');
      this.showWebAppButton = false;
    });
    // End Install PWA



    document.addEventListener("selectionchange", this.handleSelectionChange);

    if (this.$route.meta.Authorize && this.isBoxesPage)
      await this.getSuggestionWord();
  },
  beforeUnmount() {

    document.removeEventListener("selectionchange", this.handleSelectionChange);
  },
  methods: {
    handleInstallPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.showWebAppButton = false;
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            this.showWebAppButton = false;
          } else {
            this.showWebAppButton = true;
          }
        });
      }
      else {
        this.showWebAppButton = true;
      }

    },
    handleSelectionChange: debounce(function () {
      const userSelection = window.getSelection().toString().trim();
      if (userSelection.split(/\s+/).length > 2 || userSelection.length > 30) {
        this.selection.showBarLevel = 0;
        this.selection.text = '';
        return;
      }
      if (!userSelection) {
        if (this.selection.showBarLevel === 1) {
          this.selection.showBarLevel = 0;
          this.selection.text = '';
        }
      } else if (this.selection.text !== userSelection) {
        this.selection.showBarLevel = 1;
        this.selection.text = userSelection;
      }
    }, 500),
    async getSuggestionWord() {
      const response = await this.postRequest('Dictionaries', 'SuggestWord', null, false);
      if (response.IsSuccess) {
        this.suggestion = response.Data;
        this.suggestion.Definition = JSON.parse(this.suggestion.Definition);
        const randomIndex = Math.floor(Math.random() * this.suggestion.Definition.ss.length);
        const randomDefinition = this.suggestion.Definition.ss[randomIndex].d;
        this.suggestion.Definition = randomDefinition;
      }
      setTimeout(() => {
        this.suggestion.Show = true;
      }, 300);
    },
    async updateProfile() {
      const response = await this.postRequest('Users', 'UpdateProfile', this.profile);
      this.notyf.apiResult(response);
      if (response.IsSuccess) {
        localStorage.setItem("token", response.Data.Token);
        localStorage.setItem("nickname", response.Data.NickName);
        localStorage.setItem("avatar", response.Data.Avatar);
        localStorage.setItem("email", response.Data.Email);
        localStorage.setItem("username", response.Data.UserName);
        localStorage.setItem("boxscenario", response.Data.BoxScenario);
        this.userInfoStore.reloadValues();
        if (this.isBoxesPage) {
          const sharedStore = useSharedMethods();
          sharedStore.toggle_getVocabulariesBoxes();
        }
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
    async fillProfile() {
      let response = await this.postRequest('Users', 'GetProfile', null);
      if (response.IsSuccess) {
        this.profile.nickname = response.Data.NickName;
        this.profile.avatar = response.Data.Avatar;
        this.profile.email = response.Data.Email;
        this.profile.username = response.Data.UserName;
        this.profile.boxscenario = response.Data.BoxScenario;
        this.profile.password = '';
      }
      else
        this.notyf.apiResult(response);

      response = await this.postRequest('Users', 'GetScenarios', null);
      if (response.IsSuccess) {
        this.boxScenarios = response.Data;
      }
    }


  }
};
</script>
<style></style>