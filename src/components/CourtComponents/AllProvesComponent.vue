<template>
  <div class="evidence-display">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><i class="ti ti-folders"/>Proves</p>
      <div class="evidence-overflow">
        <EvidencesComponent/>
        <WitnessesComponent/>
      </div>
    </b-card>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import EvidencesComponent from "@/components/CourtComponents/EvidencesComponent.vue";
  import WitnessesComponent from "@/components/CourtComponents/WitnessesComponent.vue";

  export default {
    name: "AllProvesComponent",
    components: {WitnessesComponent, EvidencesComponent},
    computed: {
      ...mapState(["chosenCase", "isDark"])
    }
  }
</script>