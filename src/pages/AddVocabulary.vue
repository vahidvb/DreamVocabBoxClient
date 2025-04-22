<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-12">
                <img class="w-50" src="images/box.png">
            </div>
            <div class="col-12 mt-2">
                <h3 class="fw-bolder">Add New Word</h3>
            </div>
        </div>
        <hr>
        <form @submit.prevent="handleAddNewWord" class="pb-3">
            <v-btn type="submit" class="btn btn-success w-100 mb-2" color="#5865f2" variant="flat">
                Add
            </v-btn>
            <div class="mb-2">
                <v-combobox v-model="wordForm.Word" v-capitalize v-stop-typing:100="handleWordChange"
                    label="Word/Phrase" :items="wordsInDictionary" hide-details></v-combobox>
            </div>
            <div class="mb-2">
                <Dictionary :text="wordForm.Word" :isOpen="false" />
                <v-textarea v-capitalize rows="3" label="Meaning" v-model="wordForm.Meaning" hide-details></v-textarea>
            </div>
            <div class="mb-2">
                <v-textarea v-capitalize rows="2" label="Example" v-model="wordForm.Example" hide-details></v-textarea>
            </div>
            <div class="mb-2">
                <v-textarea v-capitalize rows="2" label="Description" v-model="wordForm.Description"
                    hide-details></v-textarea>
            </div>

        </form>
    </div>

</template>
<script>
import Dictionary from "@/components/Dictionary.vue";

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
                    else
                        this.$router.push('/Boxes');
            } catch (error) {
                console.error(error);
            }
        },
        async handleWordChange() {
            if (this.wordForm.Word == null || this.wordForm.Word.trim() == '') {
                this.wordsInDictionary = [];
                return;
            }
            if (this.wordForm.Meaning == '' && this.wordForm.Example == '' && this.wordForm.Description == '') {
                try {
                    const parsed = JSON.parse(this.wordForm.Word);
                    if (typeof parsed === 'object' && parsed !== null && parsed.Word != null) {
                        this.wordForm.Word = parsed.Word;
                        this.wordForm.Meaning = parsed.Meaning ?? '';
                        this.wordForm.Example = parsed.Example ?? '';
                        this.wordForm.Description = parsed.Description ?? '';
                    }
                    // eslint-disable-next-line
                } catch { }
            }

            try {
                const response = await this.postRequest('Dictionaries', 'GetSimilarWords', this.wordForm.Word, false);
                this.wordsInDictionary = response.Data;
            } catch (error) {
                console.error(error);
            }
        }
    }
};

</script>