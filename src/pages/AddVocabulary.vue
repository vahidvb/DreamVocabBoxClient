<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-12">
                <img class="w-50 mt-3" src="images/icons/icon-512x512.png">
            </div>

            <div class="col-12 mt-2">
                <h3 class="fw-bolder">
                    {{ $t('pages.addVocabulary.title') }}
                </h3>
            </div>
        </div>

        <hr>

        <form @submit.prevent="handleAddNewWord" class="pb-3">

            <v-btn type="submit" class="btn btn-success w-100 mb-2" color="#5865f2" variant="flat">
                {{ $t('pages.addVocabulary.add') }}
            </v-btn>

            <div class="mb-2" style="position: relative;">
                <v-combobox ref="WordInput" v-model="wordForm.Word" v-capitalize v-stop-typing:100="handleWordChange"
                    :label="$t('pages.addVocabulary.word')" :items="wordsInDictionary" hide-details />

                <v-icon @click="pasteMethod" color="info"
                    class="paste-icon">
                    mdi-content-paste
                </v-icon>
            </div>

            <div class="mb-2">
                <Dictionary :text="wordForm.Word" :isOpen="false" v-if="wordForm.Word != null && wordForm.Word != ''" />

                <v-textarea v-capitalize rows="3" :label="$t('pages.addVocabulary.meaning')" v-model="wordForm.Meaning"
                    hide-details />
            </div>

            <div class="mb-2">
                <v-textarea v-capitalize rows="2" :label="$t('pages.addVocabulary.example')" v-model="wordForm.Example"
                    hide-details />
            </div>

            <div class="mb-2">
                <v-textarea v-capitalize rows="2" :label="$t('pages.addVocabulary.description')"
                    v-model="wordForm.Description" hide-details />
            </div>

        </form>
    </div>
</template>

<script>
import Dictionary from "@/components/Dictionary.vue";
import { useLangStore } from '@/stores/langStore';

export default {
    name: 'LoginPage',
    components: { Dictionary },
    data() {
        return {
            wordForm: {
                Word: this.$route.params.Word ?? this.$route.query.Word ?? null,
                Meaning: this.$route.query.Meaning ?? '',
                Example: this.$route.query.Example ?? '',
                Description: this.$route.query.Description ?? '',
            },
            wordsInDictionary: [],
        };
    },
    setup() {
        const lang = useLangStore()
        return { lang }
    },
    watch: {
        // eslint-disable-next-line
        $route(to, from) {
            this.wordForm.Word = to.params.Word ?? to.query.Word;
        }
    },
    methods: {
        async handleAddNewWord() {
            try {
                const response = await this.postRequest('Vocabularies', 'AddVocabulary', this.wordForm);
                this.notyf.apiResult(response);
                if (response.IsSuccess)
                    if (this.$route.query.ref != null)
                        this.$router.push(`${this.$route.query.ref}`);
                    else {
                        this.wordForm.Word = '';
                        this.wordForm.Meaning = '';
                        this.wordForm.Example = '';
                        this.wordForm.Description = '';
                        this.$refs.WordInput.focus();
                        this.wordsInDictionary = [];

                    }
            } catch (error) {
                console.error(error);
            }
        },
        async handleWordChange() {
            if (this.wordForm.Word == null || this.wordForm.Word.trim() == '') {
                this.wordsInDictionary = [];
                return;
            }
            try {
                const parsed = JSON.parse(this.wordForm.Word);
                if (typeof parsed === 'object' && parsed !== null && parsed.Word != null && this.wordForm.Word != parsed.Word) {
                    this.wordForm.Word = parsed.Word;
                    this.wordForm.Meaning = parsed.Meaning ?? '';
                    this.wordForm.Example = parsed.Example ?? '';
                    this.wordForm.Description = parsed.Description ?? '';
                }
                // eslint-disable-next-line
            } catch { }

            try {
                const response = await this.postRequest('Dictionaries', 'GetSimilarWords', this.wordForm.Word, false);
                this.wordsInDictionary = response.Data;
            } catch (error) {
                console.error(error);
            }
        },
        async pasteMethod() {
            navigator.clipboard.readText().then(async (text) => {
                if (!text || text.trim() === '') {
                    this.notyf.warning("Clipboard is empty. Please copy some text and try again.");
                    return;
                }
                this.wordForm.Word = text;
                this.handleWordChange();
            }).catch(() => {
                this.notyf.error("Failed to read clipboard contents. Please allow clipboard access or try again.");
            });
        }
    }
};

</script>