import { defineStore } from 'pinia';

export const useSharedMethods = defineStore('sharedMethods', {
  state: () => ({
    triggerAction_getVocabulariesBoxes: false,
  }),
  actions: {
    toggle_getVocabulariesBoxes() {
      this.triggerAction_getVocabulariesBoxes = !this.triggerAction_getVocabulariesBoxes;
    },
  },
});
