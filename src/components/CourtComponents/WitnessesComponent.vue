<template>
  <p v-for="witness in chosenCase.witnesses" :key="witness.id"
     @click="callWitness({caseIndex: chosenCase.id, evidenceIndex: witness.id})">
    Witness #{{ witness.id }} : {{ witness.name }}
  </p>
</template>
<script>
  export default {
    name: 'WitnessesComponent',
    props: {

    }
  }
</script>