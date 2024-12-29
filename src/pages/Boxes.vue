<template>
    <div class="row box" v-for="(box, index) in boxes" :key="index">
        <div class="col-4">
            <img v-bind:src="'/images/boxes/' + box.BoxNumber + '.png'" alt="">
        </div>
        <div class="col-8">
            <p class="fw-bolder">Total: {{ box.AllCount }}</p>
            <p class="fw-bolder">Locked: {{ box.CheckedCount }}</p>
            <p class="fw-bolder">Waiting: {{ box.UnCheckedCount }}</p>
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
        async getVocabulariesBoxes() {
            const response = await this.postRequest('Vocabularies', 'GetVocabulariesBoxes', this.loginForm);
            this.boxes = response.Data;
        }
    },
    created() {
        this.getVocabulariesBoxes();
    },
};

</script>