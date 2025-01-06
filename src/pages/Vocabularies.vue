<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Word
                </th>
                <th class="text-left">
                    Meaning
                </th>
                <th class="text-center">

                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in vocabularies" :key="item.Word">
                <td>{{ item.Word }}</td>
                <td>{{ item.Meaning }}</td>
                <td>
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">

                            <v-btn v-bind="activatorProps" icon="mdi-pencil" size="x-small" color="primary"></v-btn>
                            <v-btn class="ml-3 text-white" icon="mdi-delete" size="x-small" color="danger"></v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="Word full information">
                                <v-card-text>
                                    <form @submit.prevent="handleAddNewWord(item)" class="pb-3">
                                        <div class="mb-1">
                                            <h1>{{ item.Word }}</h1>
                                        </div>
                                        <div class="mb-1">
                                            <Dictionary :text="item.Word" />
                                            <v-textarea rows="3" label="Meaning" v-model="item.Meaning"></v-textarea>
                                        </div>
                                        <div class="mb-1">
                                            <v-textarea rows="2" label="Example" v-model="item.Example"></v-textarea>
                                        </div>
                                        <div class="mb-1">
                                            <v-textarea rows="2" label="Description"
                                                v-model="item.Description"></v-textarea>
                                        </div>
                                        <!-- <button type="submit" class="btn btn-success w-100">Add</button> -->
                                        <v-btn type="submit" class="btn btn-success w-100" color="#5865f2" @click="isActive.value = false"
                                            variant="flat">
                                            Edit
                                        </v-btn>
                                    </form>

                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text="Close" @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>

                </td>
            </tr>
        </tbody>
    </v-table>
</template>
<script>
import Dictionary from "@/components/Dictionary.vue";

export default {
    name: 'VocabulariesComponent',
    components: { Dictionary },
    data() {
        return {
            wordsInDictionary: [],
            dictionary: null,
            vocabularies: [],
            page: {
                "BoxNumber": this.$route.params.boxNumber,
                "ListLength": 20,
                "ListPosition": 0
            }
        };
    },
    methods: {
        async handleAddNewWord(wordForm) {
            try {
                const response = await this.postRequest('Vocabularies', 'EditVocabulary', wordForm);
                this.notyf.apiResult(response);
            } catch (error) {
                console.error(error);
            }
        },
        async getVocabularies() {
            const response = await this.postRequest('Vocabularies', 'GetVocabularies', this.page);
            if (response.Data != null)
                this.vocabularies = response.Data.Items;

        }
    },
    async created() {
        await this.getVocabularies();
    },
}
</script>
