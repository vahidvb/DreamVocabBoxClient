<template>
  <div>
    <HeaderComponent v-if="$route.meta.showHeader" />
    <Loading />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';
import Loading from './components/Loading.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    Loading,
  },
};
</script>