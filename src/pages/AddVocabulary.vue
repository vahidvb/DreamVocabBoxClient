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
            <div class="mb-1">
                <v-text-field @keyup="handleWordChange" autofocus list="WordsInDictionary" label="Word" v-model="wordForm.Word"></v-text-field>
                <datalist id="WordsInDictionary">
                    <option v-for="(word, index) in wordsInDictionary" v-bind:value="word.Word" v-bind:key="index">
                    </option>
                </datalist>
            </div>
            <div class="mb-1">
                <Dictionary :text="wordForm.Word" />
                <v-textarea rows="3" label="Meaning" v-model="wordForm.Meaning"></v-textarea>
            </div>
            <div class="mb-1">
                <v-textarea rows="2" label="Example" v-model="wordForm.Example"></v-textarea>
            </div>
            <div class="mb-1">
                <v-textarea rows="2" label="Description" v-model="wordForm.Description"></v-textarea>
            </div>
            <!-- <button type="submit" class="btn btn-success w-100">Add</button> -->
            <v-btn
            type="submit"
          class="btn btn-success w-100"
          color="#5865f2"
          variant="flat"
        >
          Add
        </v-btn>
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
                Word: '',
                Meaning: '',
                Example: '',
                Description: ''
            },
            wordsInDictionary: [],
            suggestWord: null,
        };
    },
    methods: {
        async handleAddNewWord() {
            try {
                const response = await this.postRequest('Vocabularies', 'AddVocabulary', this.wordForm);
                this.notyf.apiResult(response);
                if (response.IsSuccess)
                    this.$router.push('/Boxes');
            } catch (error) {
                console.error(error);
            }
        },
        async handleWordChange() {
            try {
                const response = await this.postRequest('Dictionaries', 'SearchEnglishToEnglish', this.wordForm.Word, false);
                this.wordsInDictionary = response.Data;
                this.suggestWord = this.wordsInDictionary.findLast(x => x.Word.toLowerCase() == this.wordForm.Word.toLowerCase());
                if (this.suggestWord != null) {
                    this.suggestWord.Definition = JSON.parse(this.suggestWord.Definition);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
};

</script>