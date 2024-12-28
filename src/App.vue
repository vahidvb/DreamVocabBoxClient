<template>
  <HeaderComponent v-if="$route.meta.showHeader" />
  <router-view />
</template>
<script>
import HeaderComponent from './components/Header.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  data() {
    return {
    };
  }
}
</script>