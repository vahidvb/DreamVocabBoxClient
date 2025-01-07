<template>
  <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <v-app-bar v-if="$route.meta.showHeader" style="width: 448px;left: 50%;transform: translateX(-50%);"
        color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:prepend>
          <v-btn v-bind:disabled="hideBackBtn" @click="goBack" icon="mdi-arrow-left"></v-btn>
        </template>
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>


        <v-app-bar-nav-icon>
          <router-link class="navbar-brand" to="/">
            <img :src="'images/avatars/avatar-' + avatar + '.png'">
          </router-link>
        </v-app-bar-nav-icon>


        <v-app-bar-title style="font-size: 15px;">{{ nickName }}</v-app-bar-title>

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


        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
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

export default {
  name: 'App',
  components: {
    Loading,
  },
  data() {
    return {
      nickName: localStorage.getItem("nickname"),
      avatar: localStorage.getItem("avatar"),
      hideBackBtn: false,
    };
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.hideBackBtn = to.path.toLocaleLowerCase() == "/boxes";
    }
  },
  methods: {

    goBack() {
      this.$router.back(-1);
    }


  }
};
</script>
<style></style>