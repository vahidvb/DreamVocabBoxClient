<template>
  <div v-show="isLoading" class="overlay">
    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
  </div>

</template>
  
<script>
import { useLoadingStore } from '../stores/loadingStore';

export default {
  name: 'LoadingComponent',
  data() {
    return {
      loadingStore: useLoadingStore(),
    };
  },
  computed: {
    isLoading() {
      return this.loadingStore.isLoading;
    },
  },
};
</script>
