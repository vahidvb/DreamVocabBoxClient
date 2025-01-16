import { defineStore } from 'pinia';

export const useSpeechStore = defineStore('speechStore', {
  state: () => ({
    isPlaying: false,
    text: '',
  }),
  actions: {
    startPlaying(text) {
      this.isPlaying = true;
      this.text = text;
    },
    stopPlaying() {
      this.isPlaying = false;
      this.text = '';
    },
  },
});
