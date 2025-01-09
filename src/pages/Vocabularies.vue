<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left" style="width: 65%;">
                    Word
                </th>
                <th class="text-right" style="width: 35%;">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vocabulary in vocabularies" :key="vocabulary.Word">
                <td>
                    <div style="font-weight: bold;">
                        {{ vocabulary.Word }}
                    </div>
                    <div role="button" @click="vocabulary.showMeaning = !vocabulary.showMeaning">
                        <span v-show="vocabulary.showMeaning">
                            {{ vocabulary.Meaning }}
                            <v-spacer></v-spacer>
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn v-bind="activatorProps" size="x-small" class="mb-1" color="primary"
                                        prepend-icon="mdi-eye">Full Show</v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Complete information" class="p-4">
                                        <v-card elevation="16" class="pa-4 mb-2">
                                            <h1 class="text-center">{{ vocabulary.Word }}</h1>
                                        </v-card>
                                        <DetailCard :title="'Meaning'" :value="vocabulary.Meaning" />
                                        <DetailCard :title="'Example'" :value="vocabulary.Example" v-show="vocabulary.Example"
                                            class="mt-2" />
                                        <DetailCard :title="'Description'" :value="vocabulary.Description"
                                            v-show="vocabulary.Description" class="mt-2" />
                                        <v-card outlined class="pa-4 mt-2" v-if="vocabulary.Word"
                                            style="margin-bottom: 60px;">
                                            <Dictionary :text="vocabulary.Word" />
                                        </v-card>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text="Close" @click="isActive.value = false"></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </span>
                        <span v-show="!vocabulary.showMeaning">Click for show</span>
                    </div>
                </td>


                <td class="text-right">
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn v-bind="activatorProps" icon="mdi-pencil" size="x-small" color="primary"></v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="Word full information">
                                <v-card-text>
                                    <form @submit.prevent="handleAddNewWord(vocabulary)" class="pb-3">
                                        <div class="mb-1">
                                            <h1>{{ vocabulary.Word }}</h1>
                                        </div>
                                        <div class="mb-1">
                                            <Dictionary :text="vocabulary.Word" />
                                            <v-textarea rows="3" label="Meaning" v-model="vocabulary.Meaning"></v-textarea>
                                        </div>
                                        <div class="mb-1">
                                            <v-textarea rows="2" label="Example" v-model="vocabulary.Example"></v-textarea>
                                        </div>
                                        <div class="mb-1">
                                            <v-textarea rows="2" label="Description"
                                                v-model="vocabulary.Description"></v-textarea>
                                        </div>
                                        <v-btn type="submit" class="btn btn-success w-100" color="#5865f2"
                                            @click="isActive.value = false" variant="flat">
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
                    <v-dialog v-model="dialog" max-width="400" persistent>
                        <template v-slot:activator="{ props: activatorProps }">

                            <v-btn v-bind="activatorProps" class="ml-3 text-white" icon="mdi-delete" size="x-small"
                                color="danger"></v-btn>

                        </template>

                        <v-card prepend-icon="mdi-delete" text="Are you sure you want to delete this vocabulary? 
                            Please note that once deleted, it cannot be restored." :title="'Remove ' + vocabulary.Word">
                            <template v-slot:actions>
                                <v-spacer></v-spacer>

                                <v-btn @click="dialog = false" class="bg-success">
                                    No
                                </v-btn>

                                <v-btn @click="handleRemoveWord(vocabulary.Id)" class="bg-danger">
                                    Yes!
                                </v-btn>
                            </template>
                        </v-card>
                    </v-dialog>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
<script>
import Dictionary from "@/components/Dictionary.vue";
import DetailCard from "@/components/DetailCard.vue";

export default {
    name: 'VocabulariesComponent',
    components: { Dictionary, DetailCard },
    data() {
        return {
            dialog: false,
            wordsInDictionary: [],
            dictionary: null,
            vocabularies: [],
            page: {
                "BoxNumber": this.$route.params.boxNumber,
                "ListLength": 1000,
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
            if (response.Data.TotalItem > 0) {
                this.vocabularies = response.Data.Items;
                this.vocabularies.forEach(x => {
                    x.showMeaning = false;
                });
            }
            else
                this.$router.push('/Boxes');
        }
        ,
        async handleRemoveWord(id) {
            const response = await this.postRequest('Vocabularies', 'RemoveVocabulary', id);
            this.notyf.apiResult(response);
            if (response.IsSuccess)
                await this.getVocabularies();
            this.dialog = false;
        }
    },
    async created() {
        await this.getVocabularies();
    },
}
</script>
