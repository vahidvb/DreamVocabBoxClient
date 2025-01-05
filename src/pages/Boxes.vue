<template>


    <div class="container-fluid mt-2">
        <div class="row">
            <div class="d-flex justify-content-center" :class="{ 'col-4': index < 6, 'col-10 mx-auto': index == 6 }"
                v-for="(box, index) in boxes" :key="index">
                <div class="box">
                    <div class="row">
                        <div :class="{ 'col-12': index < 6, 'col-5': index == 6 }" @click="showDetails(box)">
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">

                                    <img v-bind="activatorProps" :class="{ 'shake-item faster': box.UnCheckedCount }"
                                        v-bind:src="'/images/boxes/' + box.BoxNumber + '.png'" alt="">
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Box information">
                                        <v-card-text>
                                            <div class="fw-bolder">Total Vocabularies: {{box.AllCount}}</div>
                                            <div class="fw-bolder">Locked Items: {{box.CheckedCount}}</div>
                                            <div class="fw-bolder">Waiting For Check: {{box.UnCheckedCount}}</div>
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
                            You have deeply memorized <span style="font-size: 2em;">{{ box.CheckedCount }}</span> words.
                        </div>
                        <div class="col-7 box-7-text" v-if="index == 6 && box.CheckedCount == 0">
                            Oops! You haven't reached this box yet.
                        </div>
                        <div class="col-12 align-self-center">
                            <router-link class="btn shake-item" v-if="box.UnCheckedCount"
                                :to="{ path: `/CheckVocabulary/${box.BoxNumber}` }">Start Checking</router-link>

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
    </div>

</template>

<script>

export default {
    name: 'BoxesPage',
    components: {

    },
    data() {
        return {
            boxes: []
        };
    },
    methods: {
        test() {

        },
        async getVocabulariesBoxes() {
            const response = await this.postRequest('Vocabularies', 'GetVocabulariesBoxes', this.loginForm);
            this.boxes = response.Data;
        },
        showDetails(box) {
            let result = `<div class="fw-bolder">Total Vocabularies: ${box.AllCount}</div>
                    <div class="fw-bolder">Locked Items: ${box.CheckedCount}</div>
                    <div class="fw-bolder">Waiting For Check: ${box.UnCheckedCount}</div>`
            this.MessageBox.success(result, `Box No${box.BoxNumber}`);
        }
    },
    created() {
        this.getVocabulariesBoxes();
    },
};

</script>
<style></style>