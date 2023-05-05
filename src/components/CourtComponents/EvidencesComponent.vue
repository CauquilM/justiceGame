<template>
  <div>
    <div class="evidence-proof" v-if="chosenCase.evidences.length !== 0">
      <p v-for="evidence in chosenCase.evidences" :key="evidence.id"
         @click="displayCommentsOnEvidence(evidence.id)">
        {{ evidence.description }}
      </p>
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
  computed: {
    ...mapState(["isDark", "chosenCase"])
  },
  methods: {
    ...mapActions(["displayCommentsOnEvidence", "callWitness"])
  }
}
</script>