<template>
    <div class="Container">
        <div class="row">
            <div class="col-12 text-center">
                <h1>{{ vocabulary.Word }}</h1>
                <button class="btn btn-success" @click="showMeaning = true" v-show="!showMeaning">Show Meaning</button>
                <button class="btn btn-success" @click="showMeaning = false" v-show="showMeaning">Hide Meaning</button>
            </div>
            <div class="col-12" v-show="showMeaning">
                {{ vocabulary.Meaning }}
            </div>
            <div class="col-6">
                <button class="btn btn-success" @click="setVocabularyCheck(true)">I Remember</button>
            </div>
            <div class="col-6">
                <button class="btn btn-warning" @click="setVocabularyCheck(false)">I Don't Remember</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CheckVocabularyPage',
    data() {
        return {
            vocabulary: {},
            showMeaning: false
        };
    },
    methods: {
        async getVocabulary() {
            const form = { BoxNumber: this.$route.params.boxNumber };
            const response = await this.postRequest('Vocabularies', 'GetUnCheckedVocabulary', form);
            if (response.IsSuccess)
                this.vocabulary = response.Data;
            else {
                this.notyf.apiResult(response);
                this.$router.push('/Boxes');
            }
        },
        async setVocabularyCheck(learned) {
            const form = { VocabularyId: this.vocabulary.Id, Learned: learned };
            const response = await this.postRequest('Vocabularies', 'SetVocabularyCheck', form);
            if (response.Data == undefined && response.IsSuccess) {
                this.notyf.apiResult(response, 6000);
                this.$router.push('/Boxes');
            }
            else
                this.vocabulary = response.Data;
            this.showMeaning = false;
        }
    },
    async created() {
        await this.getVocabulary();
    },
}
</script>