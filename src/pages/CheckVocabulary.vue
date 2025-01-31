<template>
    <div class="overlay checking-overaly" v-bind:class="{ 'not': !checkedTrue }"
        v-bind:style="{ opacity: checkedAnim ? 1 : 0 }">

    </div>
    <v-container class="h-100" v-touch:swipe.left="() => setVocabularyCheck(true)"
        v-touch:swipe.right="() => setVocabularyCheck(false)">
        <v-row>
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
                    <span class="remain-badge"><span v-if="vocabulary.RemainCount > 1">{{ vocabulary.RemainCount }}
                            Words
                            Remain</span><span v-if="vocabulary.RemainCount <= 1">Last One</span></span>
                </v-card>
            </v-col>
            <v-col cols="12" v-show="showMeaning">
                <DetailCard :title="'Meaning'" :value="vocabulary.Meaning" v-if="vocabulary.Meaning" />
                <DetailCard :title="'Example'" :value="vocabulary.Example" v-if="vocabulary.Example" class="mt-2" />
                <DetailCard :title="'Description'" :value="vocabulary.Description" v-if="vocabulary.Description"
                    class="mt-2" />
                <v-card outlined class="pa-4 mt-2" v-if="vocabulary.Word" style="margin-bottom: 60px;">
                    <Dictionary :text="vocabulary.Word" />
                </v-card>

            </v-col>
        </v-row>
        <v-row class="fixed-bottom d-flex align-center justify-center" no-gutters
            style="width: 448px;left: 50%;transform: translateX(-50%);">
            <v-col cols="6">
                <v-btn color="success" rounded="0" block @click="setVocabularyCheck(true)"
                    style="height: 60px;font-size: x-small;">
                    <v-icon size="30" class="me-1">mdi-emoticon-happy</v-icon>
                    I Remember
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn color="warning" rounded="0" block @click="setVocabularyCheck(false)"
                    style="height: 60px;font-size: x-small;">
                    <v-icon size="30" class="me-1">mdi-emoticon-sad</v-icon>
                    I Don't Remember
                </v-btn>
            </v-col>
        </v-row>

    </v-container>
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
            vocabulary: {},
            showMeaning: false,
            checkedAnim: false,
            checkedTrue: false,
        };
    },

    methods: {
        async getVocabulary() {
            const form = { BoxNumber: this.$route.params.boxNumber };
            const response = await this.postRequest('Vocabularies', 'GetUnCheckedVocabulary', form);
            if (response.IsSuccess) {
                this.vocabulary = response.Data;
                if (localStorage.getItem('autoSpeechOnChecking') == 'true')
                    this.textToSpeech(this.vocabulary.Word);
            }
            else {
                this.notyf.apiResult(response);
                this.$router.push('/Boxes');
            }
        },
        async setVocabularyCheck(learned) {
            this.checkedAnim = true;
            this.checkedTrue = learned
            const form = { VocabularyId: this.vocabulary.Id, Learned: learned };
            const response = await this.postRequest('Vocabularies', 'SetVocabularyCheck', form);
            if (response.Data == undefined && response.IsSuccess) {
                this.notyf.apiResult(response, 6000);
                this.$router.push('/Boxes');
            }
            else {
                this.vocabulary = response.Data;
                if (localStorage.getItem('autoSpeechOnChecking') == 'true')
                    this.textToSpeech(this.vocabulary.Word);
            }
            this.showMeaning = false;
            setTimeout(() => {
                this.checkedAnim = 0;
            }, 300);
        }
    },
    async mounted() {
        await this.getVocabulary();
    },
}
</script>