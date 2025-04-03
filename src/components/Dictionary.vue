<template>
    <div v-if="debounceSearch || dictionary == null">
        <div v-if="text">
            <v-progress-circular v-if="debounceSearch" color="grey-lighten-4" class="mb-2"
                indeterminate></v-progress-circular>
        </div>
        <div v-if="text">
            <v-list-item-title v-if="!debounceSearch && dictionary == null">{{ text }}
                <SpeechPlay :text="text" />
            </v-list-item-title>
            <v-list-item-subtitle v-if="!debounceSearch && dictionary == null">Dosen't Exist In Dictionary</v-list-item-subtitle>
        </div>
    </div>
    <v-expansion-panels v-model="panels" v-show="dictionary != null">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <v-icon size="30">mdi-book-alphabet</v-icon>
                <v-text v-if="dictionary != null">{{ dictionary.Word }} in dictionary</v-text>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-list-item v-if="text">
                    <v-list-item-content>



                        <div v-if="!debounceSearch && dictionary != null">

                            <v-list-item-title>{{ dictionary.Word }}
                                <SpeechPlay :text="dictionary.Word" />
                            </v-list-item-title>


                            <div class="dictionary-help">
                                <v-text v-if="dictionary.Forms != null">✨ "forms" {{ dictionary.Forms }}
                                    <SpeechPlay :text="dictionary.Forms" />
                                </v-text>
                                <div v-if="dictionary.DefinitionEn != null">
                                    <div v-for="(meaning, index) in dictionary.DefinitionEn.ss" :key="index"
                                        class="dic-help">
                                        "{{ meaning.g ?? 'noun' }}"
                                        <div v-if="meaning.p != undefined"><span class="mdi mdi-account-voice"
                                                style="color: #5f5f5f;"></span> {{ meaning.p }}</div>
                                        <div v-for="(part, idx) in (meaning.d ? meaning.d.split(';') : [])" :key="idx">
                                            - {{ part }}
                                            <SpeechPlay :text="part" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="dictionary.DefinitionFa != null">
                                    <div v-for="(rootDefinition, rootIndex) in dictionary.DefinitionFa"
                                        :key="rootIndex">
                                        <div v-for="(meanings, index) in rootDefinition" :key="index">
                                            <div v-for="(examples, examplesIndex) in meanings" :key="examplesIndex">
                                                <div v-for="(example, exampleIndex) in examples.es" :key="exampleIndex">
                                                    <span class="mdi mdi-script-text" style="color: #5f5f5f;"></span> {{
                                                        example.e }}
                                                    <SpeechPlay :text="example.e" />
                                                </div>
                                            </div>
                                            <div style="font-family: tahoma;" v-show="meaning.s != null"
                                                v-for="(meaning, index) in meanings" :key="index">
                                                - {{ meaning.s }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </v-list-item-content>
                </v-list-item>
            </v-expansion-panel-text>

        </v-expansion-panel>
    </v-expansion-panels>



</template>

<script>
import SpeechPlay from "./SpeechPlay.vue";
import { debounce } from "lodash";

export default {
    name: "DictionaryComponent",
    components: {
        SpeechPlay,
    },
    props: {
        text: {
            type: String,
            required: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    data() {
        return {
            panels: [0],
            dictionary: null,
            debounceSearch: null,
        };
    },
    mounted() {
        this.panels = this.isOpen ? [0] : [];
    },
    watch: {
        text: {
            immediate: true,
            handler(newVal) {
                if (this.debounceSearch)
                    this.debounceSearch.cancel();

                this.debounceSearch = debounce(async () => {
                    await this.findEnglishToEnglish(newVal);
                }, 500);

                this.debounceSearch();
            },
        },
    },
    methods: {
        async findEnglishToEnglish(input) {
            if (input == null || input.trim() == "")
                return;

            const response = await this.postRequest("Dictionaries", "FindEnglish", input, false);
            if (response.IsSuccess) {
                this.dictionary = response.Data;
                if (this.dictionary.DefinitionEn != null) {
                    this.dictionary.DefinitionEn = JSON.parse(this.dictionary.DefinitionEn);
                }

                if (this.dictionary.DefinitionFa != null) {
                    this.dictionary.DefinitionFa = JSON.parse(this.dictionary.DefinitionFa);
                }
            } else {
                this.dictionary = null;
            }
            this.debounceSearch = null;
        },
    },
};
</script>
<style>
.v-list-item__prepend {
    align-self: self-start !important;
}
</style>