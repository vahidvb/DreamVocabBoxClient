<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field append-inner-icon="mdi-magnify" density="compact"
                    :label="$t('pages.vocabularies.searchLabel')" variant="solo" hide-details
                    v-model:model-value="page.SearchText" v-stop-typing:500="getVocabularies"
                    @click:append-inner="getVocabularies" @click:clear="getVocabularies" clearable>
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select hide-details v-model:model-value="page.ListLength" :items="pageLengths"
                    v-on:update:modelValue="() => { currentPage = 1; getVocabularies() }"
                    :label="$t('pages.vocabularies.listLength')">
                </v-select>
            </v-col>
            <v-col>
                <v-select hide-details :items="boxes" v-model="selectedBox"
                    v-on:update:modelValue="(selected) => { currentPage = 1; page.BoxNumber = selected; getVocabularies() }"
                    :label="$t('pages.vocabularies.boxNumber')">
                </v-select>
            </v-col>
        </v-row>
    </v-container>

    <div v-if="vocabularies.length == 0" class="mt-5">
        <h3 class="text-center">{{ $t('pages.vocabularies.nothingFound') }}</h3>
        <h4 class="text-center">{{ $t('pages.vocabularies.adjustFilters') }}</h4>
    </div>

    <v-table v-if="vocabularies.length > 0">
        <thead style="background-color: rgba(79, 129, 152, 0.78);color:white;">
            <tr>
                <th class="text-left" style="width: 45px;">
                    <v-checkbox v-model="checkAllVocabularies" @click="checkedSomeVocabularies = false" color="indigo"
                        v-bind:indeterminate="checkedSomeVocabularies" hide-details></v-checkbox>
                </th>
                <th class="text-left" style="width: calc(65% - 45px);">
                    {{ $t('pages.vocabularies.tableWord') }}
                </th>
                <th class="text-right" style="width: 35%;min-width: 136px;" v-if="!vocabularies.some(x => x.checked)">
                    {{ $t('pages.vocabularies.tableAction') }}
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
                                prepend-icon="mdi-eye">{{ $t('pages.vocabularies.showDetails') }}</v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card :title="$t('pages.vocabularies.completeInfo')">
                                <v-card-text>
                                    <v-card elevation="16" class="pa-4 mb-2">
                                        <h1 class="text-center">{{ vocabulary.Word }}
                                            <SpeechPlay :text="vocabulary.Word" style="font-size: 25px;" />
                                        </h1>
                                    </v-card>
                                    <DetailCard :title="$t('pages.vocabularies.meaning')" :value="vocabulary.Meaning"
                                        v-show="vocabulary.Meaning" />
                                    <DetailCard :title="$t('pages.vocabularies.example')" :value="vocabulary.Example"
                                        v-show="vocabulary.Example" class="mt-2" />
                                    <DetailCard :title="$t('pages.vocabularies.description')"
                                        :value="vocabulary.Description" v-show="vocabulary.Description" class="mt-2" />


                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn :text="$t('pages.vocabularies.close')"
                                        @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </td>

                <td style="width: 35%;min-width: 136px;" class="text-right">
                    <div v-if="!vocabularies.some(x => x.checked)">
                        <ShareButton :words="[vocabulary.Word]" color="success" btnclass="mx-1" />
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" icon="mdi-pencil" size="x-small" color="primary"></v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card :title="$t('pages.vocabularies.editTitle')">
                                    <v-card-text>
                                        <form @submit.prevent="handleAddNewWord(vocabulary)" class="pb-3">
                                            <div class="mb-1">
                                                <h1>{{ vocabulary.Word }}
                                                    <SpeechPlay :text="vocabulary.Word" style="font-size: 25px;" />
                                                </h1>
                                            </div>

                                            <div class="mb-1">
                                                <v-textarea rows="3" :label="$t('pages.vocabularies.meaning')"
                                                    v-stop-typing:100="handleWordChange(vocabulary)"
                                                    v-model="vocabulary.Meaning">
                                                </v-textarea>
                                                <v-icon @click="pasteMethod(vocabulary)" color="info"
                                                    class="paste-icon">mdi-content-paste</v-icon>
                                            </div>
                                            <div class="mb-1">
                                                <v-textarea rows="2" :label="$t('pages.vocabularies.example')"
                                                    v-model="vocabulary.Example"></v-textarea>
                                            </div>
                                            <div class="mb-1">
                                                <v-textarea rows="2" :label="$t('pages.vocabularies.description')"
                                                    v-model="vocabulary.Description"></v-textarea>
                                            </div>
                                            <v-btn type="submit" class="btn btn-success w-100" color="#5865f2"
                                                @click="isActive.value = false" variant="flat">
                                                {{ $t('pages.vocabularies.editBtn') }}
                                            </v-btn>
                                        </form>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn :text="$t('pages.vocabularies.close')"
                                            @click="isActive.value = false"></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>

                        <v-dialog v-model="vocabulary.dialog" max-width="400" persistent>
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" class="mx-1 text-white" icon="mdi-delete" size="x-small"
                                    color="danger"></v-btn>
                            </template>

                            <v-card prepend-icon="mdi-delete" :text="$t('pages.vocabularies.deleteConfirmText')"
                                :title="$t('pages.vocabularies.deleteTitle', { word: vocabulary.Word })">
                                <template v-slot:actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="vocabulary.dialog = false" class="bg-success">
                                        {{ $t('pages.vocabularies.no') }}
                                    </v-btn>
                                    <v-btn @click="handleRemoveWord(vocabulary.Id)" class="bg-danger">
                                        {{ $t('pages.vocabularies.yes') }}
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
import DetailCard from "@/components/DetailCard.vue";
import ShareButton from "@/components/ShareButton.vue";
import SpeechPlay from "@/components/SpeechPlay.vue";
export default {
    name: 'VocabulariesPage',
    components: { DetailCard, ShareButton, SpeechPlay },
    data() {
        return {
            selectedBox: null,
            pageLengths: [10, 20, 50, 100, 200, 400, 500],
            totalPage: 0,
            currentPage: 1,
            totalItem: 0,
            checkAllVocabularies: false,
            checkedSomeVocabularies: false,
            dictionary: null,
            vocabularies: [],
            page: {
                "BoxNumber": this.$route.params.boxNumber ?? 0,
                "SearchText": this.$route.query.text ?? '',
                "ListLength": 10,
                "ListPosition": 0
            }
        };
    },
    computed: {
        checkedVocabulariesItems() {
            return this.vocabularies.filter(v => v.checked);
        },
        boxes() {
            return [
                { title: this.$t('pages.boxes.all'), value: 0 },
                ...Array.from({ length: 7 }, (_, i) => ({
                    title: `${this.$t('pages.boxes.box')} ${i + 1}`,
                    value: i + 1
                }))
            ]
        }
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
        },
        // eslint-disable-next-line
        $route(to, from) {
            this.page.SearchText = this.$route.query.text ?? '';
            this.getVocabularies();
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
        },
        async handleWordChange(wordForm) {
            try {
                const parsed = JSON.parse(wordForm.Meaning);
                if (typeof parsed === 'object' && parsed !== null && parsed.Word != null && parsed.Word === wordForm.Word) {
                    wordForm.Meaning = parsed.Meaning ?? '';
                    wordForm.Example = parsed.Example ?? '';
                    wordForm.Description = parsed.Description ?? '';
                }
                // eslint-disable-next-line
            } catch { }
        },
        async pasteMethod(wordForm) {
            navigator.clipboard.readText().then(async (text) => {
                if (!text || text.trim() === '') {
                    this.notyf.warning("Clipboard is empty. Please copy some text and try again.");
                    return;
                }
                wordForm.Meaning = text;
                this.handleWordChange(wordForm);
            }).catch(() => {
                this.notyf.error("Failed to read clipboard contents. Please allow clipboard access or try again.");
            });
        }
    },
    async created() {
        await this.getVocabularies();
    },
    async mounted() {
        const boxNumber = Number(this.$route.params.boxNumber ?? 0);
        this.selectedBox = this.boxes.find(x => x.value === boxNumber);
    }

}
</script>
