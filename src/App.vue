<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <!-- Login page install webapp button -->
      <v-btn icon v-show="!$route.meta.Authorize && showWebAppButton" @click="handleInstallPWA"
        style="position: absolute;top:10px;left: 10px;cursor: pointer;z-index: 9;">
        <v-icon>mdi-open-in-app</v-icon>
      </v-btn>
      <v-navigation-drawer v-model="drawer" temporary v-if="$route.meta.Authorize">

        <v-list-item lines="two">
          <template v-slot:prepend>
            <v-avatar size="64px">
              <v-img v-if="userInfoStore.avatar" alt="Avatar"
                :src="'images/avatars/avatar-' + userInfoStore.avatar + '.png'"></v-img>
              <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
            </v-avatar>
          </template>
          <v-list-item-content>
            <v-list-item-title>{{ userInfoStore.nickname }}</v-list-item-title>
            <v-list-item-subtitle>{{ userInfoStore.username }}</v-list-item-subtitle>

            <!-- Avatar/Name & Edit Profile Modal -->
            <v-dialog max-width="500">
              <!-- Avatar/Name -->
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" @click="fillProfile(); drawer = null" class="mt-1"
                  prepend-icon="mdi-account-edit" variant="tonal" size="x-small">
                  Edit Profile
                </v-btn>
              </template>
              <!-- Edit Profile Modal -->
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
                    <!-- Logout Button -->
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










          </v-list-item-content>
        </v-list-item>



        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link to="/Vocabularies" class="nav-link">
            <v-list-item prepend-icon="mdi-receipt-text" title="My Words" value="My Words">
            </v-list-item>
          </router-link>
          <router-link to="/AddVocabulary" class="nav-link">

            <v-list-item prepend-icon="mdi-receipt-text-plus" title="Add New Word/Idiom" value="Add New Word/Idiom">
            </v-list-item>
          </router-link>
          <router-link to="/Boxes" class="nav-link">
            <v-list-item prepend-icon="mdi-inbox-multiple" title="Boxes" value="Boxes">
            </v-list-item>
          </router-link>
          <!-- Application Settings -->
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-list-item prepend-icon="mdi-cog" title="Application Settings" value="Application Settings"
                v-bind="activatorProps" @click="drawer = null"></v-list-item>
            </template>
            <!-- Application Settings Modal -->
            <template v-slot:default="{ isActive }">
              <v-card title="Application Settings" class="mb-3" v-bind="isActive">
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-switch style="font-size: 11px;" color="success" v-model="autoSuggestOnPageLoad"
                        @change="handleAutoSuggestOnPageLoad" :label="`Auto suggest words on page load`" hide-details
                        inset></v-switch>

                      <v-switch style="font-size: 11px;" color="success" v-model="autoSpeechOnChecking"
                        @change="handleAutoSpeechOnChecking" :label="`Auto play the word when it begins to show`"
                        hide-details inset></v-switch>

                      <v-switch v-bind:class="{ 'just-disabled': !clipboardGranted }" color="success"
                        v-model="autoDetectClipboardChange" @change="handleAutoDetectClipboardChange"
                        :label="`Auto detect clipboard text`" hide-details inset></v-switch>


                      <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                          <div v-if="!clipboardGranted" v-bind="activatorProps" @click="readClipboard" class="mb-2">
                            <v-text style="font-size: 12px;" class="text-danger" role="button">The app needs permission
                              to
                              access the clipboard in browser settings. <b>For more help, click here.</b></v-text>
                          </div>
                        </template>

                        <template v-slot:default="{ isActive }">
                          <v-card title="How to Enable Clipboard Access">
                            <v-card-text>
                              <h4><v-icon color="#DB4437" icon="mdi-google-chrome" /> Chrome</h4>
                              <ul>
                                <li>Open the Chrome browser.</li>
                                <li>Go to the browser's settings.</li>
                                <li>Find the "Site Settings" or "Settings" section.</li>
                                <li>Navigate to "Permissions" and enable "Clipboard".</li>
                              </ul>

                              <h4><v-icon color="#FF9400" icon="mdi-firefox" /> Firefox</h4>
                              <ul>
                                <li>Open the Firefox browser.</li>
                                <li>Go to the browser's Settings.</li>
                                <li>Find the "Permissions" section and enable clipboard access.</li>
                              </ul>

                              <h4><v-icon color="#1E90FF" icon="mdi-apple-safari" /> Safari</h4>
                              <ul>
                                <li>Open your phone's Settings app.</li>
                                <li>Navigate to Safari.</li>
                                <li>Look for clipboard-related settings and enable them.</li>
                              </ul>
                              <h5>If using another browser:</h5>
                              <ul>
                                <li>Look for a similar "Permissions" or "Site Settings" option in the browser's settings
                                  and enable clipboard access.</li>
                              </ul>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn text="Close" @click="isActive.value = false"></v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>



                      <v-text v-if="!t2sSupported" style="font-size: 12px;" class="text-danger m-0 p-0">Your browser
                        does
                        not support SpeechSynthesis</v-text>
                      <div v-bind:class="{ 'disabled': !t2sSupported }">


                        <h5 class="mt-0">Text To Speech Settings</h5>
                        <v-row>
                          <v-col cols="8">
                            <v-text-field label="Text for test speech" v-model="sampleText"></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-btn color="primary" icon="mdi-play" size="55" @click="textToSpeech(sampleText)"></v-btn>
                          </v-col>
                        </v-row>
                        <div class="text-caption">Rate</div>
                        <v-slider show-ticks="always" step="10" tick-size="4" v-model="speechRate"
                          @mouseleave="soundSettingsChange" hint="Controls the speed of speech."
                          persistent-hint></v-slider>
                        <div class="text-caption mt-3">Pitch</div>

                        <v-slider show-ticks="always" step="10" tick-size="4" v-model="speechPitch"
                          @mouseleave="soundSettingsChange" hint="Adjusts the pitch of the voice."
                          persistent-hint></v-slider>
                        <div class="text-caption mt-3">Volume</div>

                        <v-slider show-ticks="always" step="10" tick-size="4" v-model="speechVolume"
                          @mouseleave="soundSettingsChange" hint="Sets the volume of the speech."
                          persistent-hint></v-slider>

                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <router-link to="/Friends" class="nav-link">
            <v-badge :model-value="this.userInfoStore.friendshipPending > 0"
              :content="this.userInfoStore.friendshipPending" color="danger" class="w-100 pe-2">
              <v-list-item prepend-icon="mdi-account-group" title="Friends" value="Friends" class="w-100">
              </v-list-item>
            </v-badge>
          </router-link>
          <router-link to="/MessagesList" class="nav-link">
            <v-badge :model-value="this.userInfoStore.messagesUnread > 0" :content="this.userInfoStore.messagesUnread"
              color="danger" class="w-100 pe-2">
              <v-list-item prepend-icon="mdi-forum" title="Messages" value="Messages" class="w-100">
              </v-list-item>
            </v-badge>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <!-- App Bar - Need Authorize -->
      <v-app-bar v-if="$route.meta.Authorize" style="width: 448px;left: 50%;transform: translateX(-50%);"
        color="teal-darken-4" image="images/bg.webp" title="Dream Vocab Box">

        <template v-slot:prepend>
          <v-btn v-bind:disabled="isBoxesPage" @click="goBack" icon="mdi-arrow-left"></v-btn>
        </template>
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.7)"></v-img>
        </template>





        <!-- Right Side Icons -->
        <v-btn icon @click="suggestion.Show = false; getSuggestionWord()">
          <v-icon>mdi-auto-fix</v-icon>
        </v-btn>



        <v-btn icon v-if="showWebAppButton" @click="handleInstallPWA">
          <v-icon>mdi-open-in-app</v-icon>
        </v-btn>

        <v-btn icon @click.stop="drawer = !drawer">
          <v-badge v-if="this.userInfoStore.friendshipPending + this.userInfoStore.messagesUnread > 0"
            :content="this.userInfoStore.friendshipPending + this.userInfoStore.messagesUnread" color="danger">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-badge>
          <v-icon
            v-if="this.userInfoStore.friendshipPending + this.userInfoStore.messagesUnread == 0">mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Router View -->
      <v-main style="min-height: 100vh;padding-left: 0;">
        <router-view />
      </v-main>

    </v-layout>
  </v-card>

  <!-- Loading overally Component -->
  <Loading />

  <!-- Text Selection or Clipboard Bar -->
  <v-container v-if="$route.meta.Authorize"
    v-bind:class="{ 'show': $route.meta.Authorize && selection.showBarLevel == 2 }" class="selection-bar">
    <v-row>
      <v-col>

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
  <v-container class="selection-bar-toggler"
    v-bind:class="{ 'show': $route.meta.Authorize && selection.showBarLevel > 0 }" v-if="$route.meta.Authorize">
    <v-text class="h3" block>{{ selection.text }}</v-text>
    <v-icon @click="selection.showBarLevel = 2"
      v-if="selection.showBarLevel == 1 && $route.meta.Authorize">mdi-arrow-down-drop-circle</v-icon>
    <v-icon @click="selection.showBarLevel = 0; selection.text = ''"
      v-if="selection.showBarLevel == 2 && $route.meta.Authorize">mdi-close-circle</v-icon>

  </v-container>

  <!-- Word Suggestion -->
  <div class="suggest-notify" v-bind:class="{ 'show-notify': suggestion.Show }" v-if="$route.meta.Authorize"
    v-touch:swipe="() => { suggestion.Show = false; getSuggestionWord() }">
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
import { useSharedMethods } from './stores/sharedMethodsStore';


export default {
  name: 'App',
  components: {
    Loading, Dictionary,
  },
  data() {
    return {
      drawer: null,
      speechPitch: localStorage.getItem('speechPitch') ? parseFloat(localStorage.getItem('speechPitch')) * 100 : 100,
      speechRate: localStorage.getItem('speechRate') ? parseFloat(localStorage.getItem('speechRate')) * 100 : 100,
      speechVolume: localStorage.getItem('speechVolume') ? parseFloat(localStorage.getItem('speechVolume')) * 100 : 100,
      sampleText: 'Dream Vocab Box',
      autoSuggestOnPageLoad: localStorage.getItem('autoSuggestOnPageLoad') == 'true',
      autoDetectClipboardChange: localStorage.getItem('autoDetectClipboardChange') == 'true',
      autoSpeechOnChecking: localStorage.getItem('autoSpeechOnChecking') == 'true',
      clipboardGranted: false,
      lastClipboardText: '',
      autoSuggested: false,
      showWebAppButton: false,
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
        nickname: '',
        avatar: 0,
        email: '',
        boxscenario: '',
        username: '',
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

    if (localStorage.getItem('autoSuggestOnPageLoad') == null)
      localStorage.setItem('autoSuggestOnPageLoad', 'true');

    if (localStorage.getItem('autoSpeechOnChecking') == null)
      localStorage.setItem('autoSpeechOnChecking', 'false');

    window.addEventListener('focus', () => this.checkClipboard());
    this.checkClipboard();


    // Start Install PWA
    window.addEventListener("load", () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
      }
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.showWebAppButton = true;
      this.deferredPrompt = e;
      return false;
    });
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      this.showWebAppButton = false;
      window.resizeTo(500, 870);
      window.addEventListener('resize', () => window.resizeTo(500, 870));
    }
    else if (this.deferredPrompt) {
      this.showWebAppButton = true;
    }
    window.addEventListener('appinstalled', () => this.showWebAppButton = false);
    // End Install PWA

    document.addEventListener("selectionchange", this.handleSelectionChange);
    if (localStorage.getItem('token') && !this.autoSuggested && this.autoSuggestOnPageLoad) {
      this.autoSuggested = true;
      await this.getSuggestionWord();
    }

    if (localStorage.getItem('token') != null) {
      await this.fillProfile();
    }
  },
  beforeUnmount() {
    document.removeEventListener("selectionchange", this.handleSelectionChange);
  },
  methods: {
    soundSettingsChange() {
      localStorage.setItem('speechPitch', this.speechPitch / 100);
      localStorage.setItem('speechRate', this.speechRate / 100);
      localStorage.setItem('speechVolume', this.speechVolume / 100);
    },
    checkClipboard() {
      try {
        if (localStorage.getItem('token'))
          navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
            if (result.state === "granted") {
              if (localStorage.getItem('autoDetectClipboardChange') == null)
                localStorage.setItem('autoDetectClipboardChange', 'true');
              this.clipboardGranted = true;
              if (this.autoDetectClipboardChange) {
                this.readClipboard();
              }
            } else if (result.state === "prompt") {
              this.readClipboard();
            } else {
              this.clipboardGranted = false;
              localStorage.setItem('autoDetectClipboardChange', 'false');
            }
          });
      } catch (error) {
        console.log(error);
      }

    },
    readClipboard() {
      try {
        navigator.clipboard.readText().then((text) => {
          this.clipboardGranted = true;
          localStorage.setItem('autoDetectClipboardChange', 'true');
          if (text.trim().split(/\s+/).length > 2 || text.trim().length > 30 || !text.trim() || this.lastClipboardText === text.trim()) {
            return;
          }
          this.selection.showBarLevel = 1;
          this.selection.text = text.trim();
          this.lastClipboardText = text.trim();
        }).catch(() => {
          this.clipboardGranted = false;
          localStorage.setItem('autoDetectClipboardChange', 'false');
        });
      } catch (error) {
        console.log(error);
      }

    },
    handleAutoSpeechOnChecking() {
      localStorage.setItem('autoSpeechOnChecking', this.autoSpeechOnChecking);
    },
    handleAutoDetectClipboardChange() {
      localStorage.setItem('autoDetectClipboardChange', this.autoDetectClipboardChange);
    },
    handleAutoSuggestOnPageLoad() {
      localStorage.setItem('autoSuggestOnPageLoad', this.autoSuggestOnPageLoad);
    },
    handleInstallPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.showWebAppButton = false;
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted')
            this.showWebAppButton = false;
          else
            this.showWebAppButton = true;
        });
      }
      else
        this.showWebAppButton = false;

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
      }, 400);
    },
    async updateProfile() {
      const response = await this.postRequest('Users', 'UpdateProfile', this.profile);
      this.notyf.apiResult(response);
      if (response.IsSuccess) {
        localStorage.setItem("token", response.Data.Token);
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
      localStorage.removeItem("token");
      this.userInfoStore.emptyValues();

      this.$router.push('/Login');
    },
    async fillProfile() {
      await this.userInfoStore.reloadValues();

      this.profile.nickname = this.userInfoStore.nickname;
      this.profile.avatar = this.userInfoStore.avatar;
      this.profile.email = this.userInfoStore.email;
      this.profile.username = this.userInfoStore.username;
      this.profile.boxscenario = this.userInfoStore.boxscenario;
      this.profile.password = '';
      this.boxScenarios = this.userInfoStore.boxScenarios;
    }





  }
};
</script>
<style></style>