<template>
  <div class="evidence-display">
    <b-card>
      <p class="card-title"><i class="ti ti-folders"/>Evidences</p>
      <div class="evidence-overflow">
        <p v-for="evidence in chosenCase.evidences" :key="evidence.id"
           @click="displaySentence(chosenCase.id, evidence.id)">
          {{ evidence.description }}
        </p>
      </div>
    </b-card>
  </div>
</template>
<script>
  export default {
    name: 'EvidencesComponent',
    props: {
      chosenCase: Object
    }
  }
</script>