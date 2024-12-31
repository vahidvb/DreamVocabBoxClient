<template>
  <div v-show="isLoading" class="loading-overlay">
    <div class="spinner"></div>
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
