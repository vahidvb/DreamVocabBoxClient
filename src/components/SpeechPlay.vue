<template>
    <v-btn @click="textToSpeech(text)" :icon="isPlaying && isPlayingText == text ? 'mdi-stop' : 'mdi-volume-high'" color="primary"
        variant="tonal" size="xs-small" class="mx-2" v-if="t2sSupported"
        v-bind:class="{'disabled' : isPlaying && isPlayingText != text }"></v-btn>

</template>
<script>
import { useSpeechStore } from '../stores/speechStore';

export default {
    name: "SpeechPlayComponent",
    props: {
        text: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            playingStore: useSpeechStore(),
        };
    },
    computed: {
        isPlaying() {
            return this.playingStore.isPlaying;
        },
        isPlayingText() {
            return this.playingStore.text;
        },
    },
}
</script>
