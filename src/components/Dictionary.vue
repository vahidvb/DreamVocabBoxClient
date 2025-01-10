<template>
    <div v-if="dictionary != null">
        <label>📚 {{ dictionary.Word }} In Dictionary</label>
        <v-btn @click="textToSpeach(dictionary.Word)" icon="mdi-volume-high" color="primary" variant="tonal"
            size="xs-small" class="ms-2" v-if="t2sSupported"></v-btn>
        <div class="dictionary-help">
            <label v-if="dictionary.Forms != null">✨ "forms" {{ dictionary.Forms }}</label>
            <div v-if="dictionary.DefinitionEn != null">
                <div v-for="(meaning, index) in dictionary.DefinitionEn.ss" :key="index" class="dic-help">
                    "{{ meaning.g ?? 'noun' }}" {{ (meaning.p == undefined ? '' : ' 🔊 ' + meaning.p) ?? '' }}
                    <div v-for="(part, idx) in (meaning.d ? meaning.d.split(';') : [])" :key="idx">
                        - {{ part }}
                    </div>
                </div>
            </div>
            <div v-if="dictionary.DefinitionFa != null">
                <div v-for="(rootDefinition, rootIndex) in dictionary.DefinitionFa" :key="rootIndex">
                    <div v-for="(meanings, index) in rootDefinition" :key="index">
                        <div v-for="(examples, examplesIndex) in meanings" :key="examplesIndex">
                            <div v-for="(example, exampleIndex) in examples.es" :key="exampleIndex">
                                📜 {{ example.e }}
                            </div>
                        </div>
                        <div style="font-family: tahoma;" v-show="meaning.s != null"
                            v-for="(meaning, index) in meanings" :key="index" class="dic-help">
                            {{ meaning.s }}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div v-if="dictionary == null">
        <label v-if="text">📚 {{ text }} Dosen't Exist In Dictionary</label>
    </div>
</template>

<script>
export default {
    name: "DictionaryComponent",
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            t2sSupported: 'speechSynthesis' in window,
            dictionary: null,
        };
    },
    watch: {
        text: {
            immediate: true,
            handler(newVal) {
                this.findEnglishToEnglish(newVal);
            },
        },
    },
    methods: {
        textToSpeach(text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            const voices = window.speechSynthesis.getVoices();
            const localVoice = voices.find(voice => voice.lang === 'en-US');

            if (localVoice)
                utterance.voice = localVoice;

            window.speechSynthesis.speak(utterance);
        },
        async findEnglishToEnglish(input) {

            const response = await this.postRequest("Dictionaries", "FindEnglish", input, false);
            if (response.IsSuccess) {
                this.dictionary = response.Data;
                if (this.dictionary.DefinitionEn != null)
                    this.dictionary.DefinitionEn = JSON.parse(this.dictionary.DefinitionEn);


                if (this.dictionary.DefinitionFa != null) {
                    this.dictionary.DefinitionFa = JSON.parse(this.dictionary.DefinitionFa);
                }
            } else {
                this.dictionary = null;
            }

        }
    },
};
</script>