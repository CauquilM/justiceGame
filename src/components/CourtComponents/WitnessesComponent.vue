<template>
  <div>
    <p style="text-decoration: underline red" v-for="witness in chosenCase.witnesses" :key="witness.index"
       @click="callWitness(witness)">
      Witness #{{ witness.id }} : {{ witness.name }}
    </p>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
  export default {
    name: "WitnessesComponent",
    created() {
      console.log("here: ", this.chosenCase.witnesses);
    },
    computed: {
      ...mapState(["chosenCase"])
    },
    methods: {
      ...mapActions(["callWitness"])
    }
  }
</script>