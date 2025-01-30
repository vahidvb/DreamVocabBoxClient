<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Search text" variant="solo"
                    hide-details v-model:model-value="page.SearchText" v-stop-typing:500="getVocabularies"
                    @click:append-inner="getVocabularies" @click:clear="getVocabularies" clearable></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select hide-details v-model:model-value="page.ListLength" :items="pageLengths"
                    v-on:update:modelValue="() => { currentPage = 1; getVocabularies() }" label="List Length">
                </v-select>
            </v-col>
            <v-col>
                <v-select hide-details :items="boxes" v-model="selectedBox"
                    v-on:update:modelValue="(selected) => { currentPage = 1; page.BoxNumber = selected; getVocabularies() }"
                    label="Box Number"></v-select>
            </v-col>
        </v-row>
    </v-container>
    <div v-if="vocabularies.length == 0" class="mt-5">
        <h3 class="text-center">Nothing found !!!</h3>
        <h4 class="text-center">Please try adjusting your filters</h4>
    </div>
    <v-table v-if="vocabularies.length > 0">
        <thead style="background-color: rgba(79, 129, 152, 0.78);color:white;">
            <tr>
                <th class="text-left" style="width: 45px;">
                    <v-checkbox v-model="checkAllVocabularies" @click="checkedSomeVocabularies = false" color="indigo"
                        v-bind:indeterminate="checkedSomeVocabularies" hide-details></v-checkbox>
                </th>
                <th class="text-left" style="width: calc(65% - 45px);">
                    Word
                </th>
                <th class="text-right" style="width: 35%;min-width: 136px;" v-if="!vocabularies.some(x => x.checked)">
                    Action
                </th>
                <th class="text-right" style="width: 35%;min-width: 136px;" v-if="vocabularies.some(x => x.checked)">
                    <ShareButton :words="vocabularies.filter(x => x.checked).map(x => x.Word)" color="default"
                        icon="mdi-share-all" btnclass="mr-1" />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vocabulary in vocabularies" :key="vocabulary.Word">
                <td style="width: 45px;">
                    <v-checkbox v-model="vocabulary.checked" color="indigo" hide-details></v-checkbox>
                </td>
                <td style="width: calc(65% - 45px);">
                    <div style="font-weight: bold;">
                        {{ vocabulary.Word }}
                    </div>
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn v-bind="activatorProps" size="x-small" class="mb-1" color="primary" variant="tonal"
                                prepend-icon="mdi-eye">Show Details</v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="Complete information">
                                <v-card-text>
                                    <v-card elevation="16" class="pa-4 mb-2">
                                        <h1 class="text-center">{{ vocabulary.Word }}</h1>
                                    </v-card>
                                    <DetailCard :title="'Meaning'" :value="vocabulary.Meaning"
                                        v-show="vocabulary.Meaning" />
                                    <DetailCard :title="'Example'" :value="vocabulary.Example"
                                        v-show="vocabulary.Example" class="mt-2" />
                                    <DetailCard :title="'Description'" :value="vocabulary.Description"
                                        v-show="vocabulary.Description" class="mt-2" />
                                    <v-card outlined class="pa-4 mt-2" v-if="vocabulary.Word"
                                        style="margin-bottom: 60px;">
                                        <Dictionary :text="vocabulary.Word" style="padding: 0;" />
                                    </v-card>
                                </v-card-text>


                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text="Close" @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </td>


                <td style="width: 35%;min-width: 136px;" class="text-right">
                    <div v-if="!vocabularies.some(x => x.checked)">
                        <ShareButton :words="[vocabulary.Word]" color="success" btnclass="mr-1" />
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
                                                <v-textarea rows="3" label="Meaning"
                                                    v-model="vocabulary.Meaning"></v-textarea>
                                            </div>
                                            <div class="mb-1">
                                                <v-textarea rows="2" label="Example"
                                                    v-model="vocabulary.Example"></v-textarea>
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
                        <v-dialog v-model="vocabulary.dialog" max-width="400" persistent>
                            <template v-slot:activator="{ props: activatorProps }">

                                <v-btn v-bind="activatorProps" class="ml-1 text-white" icon="mdi-delete" size="x-small"
                                    color="danger"></v-btn>

                            </template>

                            <v-card prepend-icon="mdi-delete" text="Are you sure you want to delete this vocabulary? 
                                Please note that once deleted, it cannot be restored."
                                :title="'Remove ' + vocabulary.Word">
                                <template v-slot:actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="vocabulary.dialog = false" class="bg-success">
                                        No
                                    </v-btn>

                                    <v-btn @click="handleRemoveWord(vocabulary.Id)" class="bg-danger">
                                        Yes!
                                    </v-btn>
                                </template>
                            </v-card>
                        </v-dialog>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-pagination v-if="vocabularies.length > 0" :length="totalPage" v-model="currentPage"
        v-on:update:model-value="getVocabularies"></v-pagination>
</template>
<script>
import Dictionary from "@/components/Dictionary.vue";
import DetailCard from "@/components/DetailCard.vue";
import ShareButton from "@/components/ShareButton.vue";

export default {
    name: 'VocabulariesPage',
    components: { Dictionary, DetailCard, ShareButton },
    data() {
        return {
            boxes: [{ title: "Show all boxes", value: 0 }, { title: "Box 1", value: 1 }, { title: "Box 2", value: 2 },
            { title: "Box 3", value: 3 }, { title: "Box 4", value: 4 },
            { title: "Box 5", value: 5 }, { title: "Box 6", value: 6 },
            { title: "Box 7", value: 7 }],
            selectedBox: this.$route.params.boxNumber == undefined || this.$route.params.boxNumber == 0 ? { title: "Show all boxes", value: 0 } : { title: `Box ${this.$route.params.boxNumber}`, value: this.$route.params.boxNumber },
            pageLengths: [10, 20, 50, 100, 200, 400, 500],
            totalPage: 0,
            currentPage: 1,
            totalItem: 0,
            checkAllVocabularies: false,
            checkedSomeVocabularies: false,
            wordsInDictionary: [],
            dictionary: null,
            vocabularies: [],
            page: {
                "BoxNumber": this.$route.params.boxNumber ?? 0,
                "SearchText": '',
                "ListLength": 10,
                "ListPosition": 0
            }
        };
    },
    computed: {
        checkedVocabulariesItems() {
            return this.vocabularies.filter(v => v.checked);
        },
    },
    watch: {
        checkAllVocabularies(newVal) {
            if (!this.checkedSomeVocabularies)
                this.vocabularies.forEach(vocabulary => {
                    vocabulary.checked = newVal;
                });
        },
        checkedVocabulariesItems(newVal) {
            this.checkedSomeVocabularies = newVal.length > 0 && newVal.length < this.vocabularies.length;
            if (newVal.length == this.vocabularies.length)
                this.checkAllVocabularies = true;
            else
                this.checkAllVocabularies = false;
        }
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
            this.page.ListPosition = (this.currentPage - 1) * this.page.ListLength;
            const response = await this.postRequest('Vocabularies', 'GetVocabularies', this.page);

            this.totalPage = response.Data.TotalPage;
            this.currentPage = response.Data.CurrentPage;
            this.totalItem = response.Data.TotalItem;
            this.vocabularies = response.Data.Items;

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
