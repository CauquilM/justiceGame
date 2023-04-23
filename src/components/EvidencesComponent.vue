<template>
  <div class="evidence-display">
    <b-card>
      <p class="card-title"><i class="ti ti-folders"/>Evidences</p>
      <div class="evidence-overflow">
        <p v-for="evidence in chosenCase.evidences" :key="evidence.id"
           @click="displayCommentsOnEvidence({caseIndex: chosenCase.id, evidenceIndex: evidence.id})">
          {{ evidence.description }}
        </p>
      </div>
    </b-card>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: 'EvidencesComponent',
  props: {
    chosenCase: Object
  },
  methods: {
    ...mapActions(["displayCommentsOnEvidence"])
  }
}
</script>