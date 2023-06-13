<template>
    <div>
        <div v-if="evidences.length !== 0" class="evidence-proof">
            <div v-for="(evidence, index) in evidences" :key="evidence.id" class="evidence-div">
                <p @click="displayCommentsOnEvidence(index)">{{ evidence.description }}</p>
                <b-button size="sm" variant="warning" @click="deleteEvidence(index)">Refuse evidence <i
                        class="ti ti-arrow-up"/></b-button>
            </div>
        </div>
        <div v-else>
            <p>There's no evidence</p>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'EvidencesComponent',
    data(){
        return{
            evidences: []
        }
    },
    created() {
        this.evidences = this.chosenCase.evidences;
        console.log("e: ", this.evidences);
    },
    computed: {
        ...mapState(["isDark", "chosenCase"])
    },
    methods: {
        ...mapActions(["displayCommentsOnEvidence", "callWitness"]),
        deleteEvidence(index) {
            this.evidences.splice(index, 1);
        }
    }
}
</script>