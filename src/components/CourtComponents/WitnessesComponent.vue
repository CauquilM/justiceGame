<template>
  <div>
    <p v-for="witness in chosenCase.witnesses" :key="witness.index"
       @click="callWitness()">
      Witness #{{ witness.id }} : {{ witness.name }}
    </p>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

  export default {
    name: "WitnessesComponent",
    computed: {
      ...mapState(["chosenCase"])
    },
    methods: {
      ...mapActions(["callWitness"])
    }
  }
</script>