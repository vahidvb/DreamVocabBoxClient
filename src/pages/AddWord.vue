<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-12">
                <img class="w-50" src="images/box.png">
            </div>
            <div class="col-12 mt-2">
                <h3 class="fw-bolder">Add New Word</h3>
            </div>
        </div>
        <hr>
        <form @submit.prevent="handleAddNewWord">
            <div class="mb-1">
                <label for="Word" class="form-label">Word</label>
                <input type="text" class="form-control" id="Word" v-model="wordForm.Word" placeholder="">
            </div>
            <div class="mb-1">
                <label for="Meaning" class="form-label">Meaning</label>
                <input type="text" class="form-control" id="Meaning" v-model="wordForm.Meaning" placeholder="">
            </div>
            <div class="mb-1">
                <label for="Example" class="form-label">Example</label>
                <input type="text" class="form-control" id="Example" v-model="wordForm.Example" placeholder="">
            </div>
            <div class="mb-1">
                <label for="Description" class="form-label">Description</label>
                <input type="text" class="form-control" id="Description" v-model="wordForm.Description" placeholder="">
            </div>
            <button type="submit" class="btn btn-success w-100">Add</button>
        </form>
    </div>

</template>
<script>
export default {
    name: 'LoginPage',
    components: {

    },
    data() {
        return {
            wordForm: {
                Word: '',
                Meaning: '',
                Example: '',
                Description: ''
            }
        };
    },
    methods: {
        async handleAddNewWord() {
            try {
                const response = await this.postRequest('Vocabularies', 'AddVocabulary', this.wordForm);
                this.notyf.apiResult(response);
                if (response.IsSuccess) {
                    document.location.href = "/Boxes";
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
};

</script>