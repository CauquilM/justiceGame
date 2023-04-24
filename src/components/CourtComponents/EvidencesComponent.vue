<template>
  <div>
    <p v-for="evidence in chosenCase.evidences" :key="evidence.id"
       @click="displayCommentsOnEvidence(evidence.id)">
      {{ evidence.description }}
    </p>
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