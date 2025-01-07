<template>
    <div v-if="dictionary != null">
        <label>📚 {{ dictionary.Word }} In Dictionary</label>
        <div class="dictionary-help">
            <label v-if="dictionary.Forms != null">✨ "forms" {{ dictionary.Forms }}</label>
            <div v-if="dictionary.DefinitionEn != null">
                <div v-for="(meaning, index) in dictionary.DefinitionEn.ss" :key="index" class="dic-help">
                    "{{ meaning.g ?? 'noun' }}" {{ meaning.d }}
                </div>
            </div>
            <div v-if="dictionary.DefinitionFa != null">
                <div v-for="(meaningss, indexpp) in dictionary.DefinitionFa" :key="indexpp">
                    <div v-for="(meanings, index) in meaningss" :key="index">
                        <div v-show="meaning.s!=null" v-for="(meaning, index) in meanings" :key="index" class="dic-help">
                        {{ meaning.s }}
                    </div>
                    </div>
                </div>

            </div>
        </div>
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