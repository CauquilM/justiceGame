<template>
    <div class="cases-history-container">
        <b-row align-h="center" style="margin-top: 40%">
            <h3 class="mb-4">Type your Idea</h3>
            <div class="col-lg-4 col-md-6 col-sm-5 col-8">
                <b-form-textarea
                    id="textarea-no-resize"
                    placeholder="My idea is..."
                    rows="6"
                    no-resize
                    v-model="textIdea"
                ></b-form-textarea>
            </div>
        </b-row>
        <b-row align-h="center">
            <div class="col-lg-4 col-md-6 col-sm-5 col-8">
                <b-button block variant="primary" class="mt-2 block">Envoyer</b-button>
            </div>
        </b-row>
    </div>
</template>
<script>
export default {
    name: "IdeasView",
    data(){
        return{
            textIdea: ""
        }
    }
}
</script>