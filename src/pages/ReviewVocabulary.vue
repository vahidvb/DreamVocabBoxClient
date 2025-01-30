<template>
    <v-container class="h-100" v-touch:swipe.left="() => goTo(false)"
        v-touch:swipe.right="() => goTo(true)">
        <v-carousel progress="primary" hide-delimiters :show-arrows="false" height="100%" v-model="current">
            <v-carousel-item v-for="vocabulary in vocabularies" :key="vocabulary.Text">
                <div class="d-flex justify-center align-center">
                    <v-row height="100%">
                        <v-col cols="12" class="text-center">
                            <v-card class="pa-4">
                                <h1 class="text-center">{{ vocabulary.Word }}
                                    <ShareButton :words="[vocabulary.Word]" color="default" btnclass="me-3" />
                                </h1>
    
                                <v-btn color="success" @click="showMeaning = true" v-show="!showMeaning">
                                    Show Meaning
                                </v-btn>
                                <v-btn color="success" @click="showMeaning = false" v-show="showMeaning">
                                    Hide Meaning
                                </v-btn>
                                <SpeechPlay :text="vocabulary.Word" style="font-size: 25px;" />
    
                            </v-card>
                        </v-col>
                        <v-col cols="12" v-show="showMeaning">
                            <DetailCard :title="'Meaning'" :value="vocabulary.Meaning" v-if="vocabulary.Example" />
                            <DetailCard :title="'Example'" :value="vocabulary.Example" v-if="vocabulary.Example"
                                class="mt-2" />
                            <DetailCard :title="'Description'" :value="vocabulary.Description" v-if="vocabulary.Description"
                                class="mt-2" />
                            <v-card outlined class="pa-4 mt-2" v-if="vocabulary.Word" style="margin-bottom: 60px;">
                                <Dictionary :text="vocabulary.Word" />
                            </v-card>
    
                        </v-col>
                    </v-row>
                </div>
    
            </v-carousel-item>
        </v-carousel>
    </v-container>
    <v-row class="fixed-bottom d-flex align-center justify-center" no-gutters
        style="width: 448px;left: 50%;transform: translateX(-50%);">
        <v-col cols="6">
            <v-btn color="info" rounded="0" block @click="goTo(false)" style="height: 60px;font-size: x-small;">
                <v-icon size="30" class="me-1">mdi-chevron-left</v-icon>
                Prev
            </v-btn>
        </v-col>
        <v-col cols="6">
            <v-btn color="success" rounded="0" block @click="goTo(true)" style="height: 60px;font-size: x-small;">
                Next
                <v-icon size="30" class="me-1">mdi-chevron-right</v-icon>
            </v-btn>
        </v-col>

    </v-row>
</template>
<script>
import DetailCard from "@/components/DetailCard";
import Dictionary from "@/components/Dictionary";
import ShareButton from "@/components/ShareButton.vue";
import SpeechPlay from "@/components/SpeechPlay";

export default {
    name: 'CheckVocabularyPage',
    components: { DetailCard, Dictionary, SpeechPlay, ShareButton },
    data() {
        return {
            current: 0,
            vocabulary: {},
            nvocabulary: {},
            pvocabulary: null,
            showMeaning: false,
            vocabularies: [],
            page: {
                "BoxNumber": this.$route.params.boxNumber ?? 0,
                "SearchText": '',
                "ListLength": 10000,
                "ListPosition": 0
            }
        };
    },

    methods: {
        async getVocabularies() {
            const response = await this.postRequest('Vocabularies', 'GetVocabularies', this.page);
            this.vocabularies = response.Data.Items.slice().sort(() => Math.random() - 0.5);
            if (this.vocabularies.length > 0 && localStorage.getItem('autoSpeechOnChecking') == 'true')
                this.textToSpeech(this.vocabularies[0].Word);
        },
        goTo(next) {
            if (next) {
                this.current == this.vocabularies.length - 1 ? this.current = 0 : this.current++;
                this.showMeaning = false;
            } else {
                this.current == 0 ? this.current = this.vocabularies.length - 1 : this.current--;
                this.showMeaning = false;
            }
            if (localStorage.getItem('autoSpeechOnChecking') == 'true')
                this.textToSpeech(this.vocabularies[this.current].Word);
        }
    },
    async mounted() {
        await this.getVocabularies();
    },
}
</script>