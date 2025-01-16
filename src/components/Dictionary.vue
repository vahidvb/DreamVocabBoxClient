<template>
    <div v-if="dictionary != null">
        <label>📚 {{ dictionary.Word }} In Dictionary</label>
        <SpeechPlay :text="dictionary.Word" />

        <div class="dictionary-help">
            <v-text v-if="dictionary.Forms != null">✨ "forms" {{ dictionary.Forms }}
                <SpeechPlay :text="dictionary.Forms" />
            </v-text>
            <div v-if="dictionary.DefinitionEn != null">
                <div v-for="(meaning, index) in dictionary.DefinitionEn.ss" :key="index" class="dic-help">
                    "{{ meaning.g ?? 'noun' }}" {{ (meaning.p == undefined ? '' : ' 🔊 ' + meaning.p) ?? '' }}
                    <div v-for="(part, idx) in (meaning.d ? meaning.d.split(';') : [])" :key="idx">
                        - {{ part }}
                        <SpeechPlay :text="part" />
                    </div>
                </div>
            </div>
            <div v-if="dictionary.DefinitionFa != null">
                <div v-for="(rootDefinition, rootIndex) in dictionary.DefinitionFa" :key="rootIndex">
                    <div v-for="(meanings, index) in rootDefinition" :key="index">
                        <div v-for="(examples, examplesIndex) in meanings" :key="examplesIndex">
                            <div v-for="(example, exampleIndex) in examples.es" :key="exampleIndex">
                                📜 {{ example.e }}
                                <SpeechPlay :text="example.e" />
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
        <label v-if="text">📚 {{ text }}
            <SpeechPlay :text="text" /> Dosen't Exist In Dictionary
        </label>
    </div>
</template>

<script>
import SpeechPlay from "./SpeechPlay.vue";

export default {
    name: "DictionaryComponent",
    components: {
        SpeechPlay
    },
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
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