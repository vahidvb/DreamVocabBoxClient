<template>
    <div v-if="dictionary != null">
        <label>📚 {{ dictionary.Word }} In Dictionary</label>
        <div class="dictionary-help">
            <label v-if="dictionary.Forms != null">✨ "forms" {{ dictionary.Forms }}</label>
            <div v-for="(meaning, index) in dictionary.Definition.ss" :key="index" class="d-block dic-help">
                "{{ meaning.g ?? 'noun' }}" {{ meaning.d }}
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
       
                const response = await this.postRequest("Dictionaries", "FindEnglishToEnglish", input, false);
                if (response.IsSuccess) {
                    this.dictionary = response.Data;
                    this.dictionary.Definition = JSON.parse(this.dictionary.Definition);
                } else {
                    this.dictionary = null;
                }
        
        }
    },
};
</script>