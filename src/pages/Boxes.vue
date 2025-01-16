<template>


    <div class="container-fluid mt-2">
        <div class="row">
            <div class="d-flex justify-content-center" :class="{ 'col-4': index < 6, 'col-10 mx-auto': index == 6 }"
                v-for="(box, index) in boxes" :key="index">
                <div class="box">
                    <div class="row">
                        <div :class="{ 'col-12': index < 6, 'col-5': index == 6, 'just-disabled': box.AllCount == 0 }">
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <img v-bind="activatorProps" :class="{ 'shake-item faster': box.UnCheckedCount }"
                                        v-bind:src="'/images/boxes/' + box.BoxNumber + '.png'" alt="">
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Box information">
                                        <v-card-text>
                                            <div class="fw-bolder">Total Vocabularies: {{ box.AllCount }}</div>
                                            <div class="fw-bolder">Locked Items: {{ box.CheckedCount }}</div>
                                            <div class="fw-bolder">Waiting For Check: {{ box.UnCheckedCount }}</div>
                                            <div class="fw-bolder">The closest time to the due date for checking: {{
                                                box.SoonTime }}</div>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text="Close" @click="isActive.value = false"></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>

                        </div>
                        <div class="col-7 box-7-text" v-if="index == 6 && box.CheckedCount > 0">
                            <span>You have deeply memorized <b style="font-size: 2em;">{{ box.CheckedCount }}</b>
                                words.</span>
                        </div>
                        <div class="col-7 box-7-text" v-if="index == 6 && box.CheckedCount == 0">
                            <span>Oops! You haven't reached this box yet.</span>
                        </div>
                        <div class="col-12 align-self-center">
                            <router-link class="btn shake-item" v-if="box.UnCheckedCount"
                                :to="{ path: `/CheckVocabulary/${box.BoxNumber}` }">Start Checking {{ box.UnCheckedCount
                                }} {{
                                    box.UnCheckedCount==1 ? "Word" : "Words" }}</router-link>

                            <span class="btn btn-soft disabled" v-if="box.AllCount == 0 && index > 0">It's Empty</span>

                            <router-link class="btn" v-if="box.AllCount == 0 && index == 0"
                                :to="{ path: `/AddVocabulary` }">Add
                                New</router-link>

                            <router-link class="btn btn-soft" v-if="box.UnCheckedCount == 0 && box.CheckedCount > 0"
                                :to="{ path: `/Vocabularies/${box.BoxNumber}` }">Show Words</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <router-link to="/AddVocabulary" class="nav-link">
            <v-fab :active="!hidden" style="transform: translateY(calc(-100% - 10px));" class="me-4" icon="mdi-plus"
                size="x-large" location="top end" color="#ffdb00" absolute offset>
            </v-fab>
        </router-link>

    </div>

</template>

<script>
import { useSharedMethods } from '../stores/sharedMethodsStore';

export default {
    name: 'BoxesPage',
    components: {

    },
    data() {
        return {
            boxes: [],
            sharedMethods: useSharedMethods(),
        };
    },
    methods: {
        async getVocabulariesBoxes() {
            const response = await this.postRequest('Vocabularies', 'GetVocabulariesBoxes', this.loginForm);
            this.boxes = response.Data;
        }
    },
    created() {
        this.getVocabulariesBoxes();
        const sharedStore = useSharedMethods();
        this.triggerAction_getVocabulariesBoxes = sharedStore.triggerAction_getVocabulariesBoxes;
    },
    watch: {
        'sharedMethods.triggerAction_getVocabulariesBoxes': {
            immediate: true,
            handler(newVal) {
                if (newVal){
                    this.getVocabulariesBoxes();
                    this.sharedMethods.toggle_getVocabulariesBoxes();
                }
            },
        },
    },
};

</script>
<style></style>