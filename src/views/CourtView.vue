<template>
  <div class="game-container">
    <JudgeComponent/>


    <div v-for="chosenCase in caseToJudge" :key="chosenCase.id" class="others-container">

      <SentenceComponent :chosenCase="chosenCase"/>

      <div class="others-div">
        <DefenseComponent/>

        <DescriptionComponent :chosenCase="chosenCase"/>

        <EvidencesComponent :chosenCase="chosenCase"/>

        <ProsecutionComponent/>
      </div>
    </div>
  </div>
</template>

<script>

import JudgeComponent from "@/components/JudgeComponent.vue";
import SentenceComponent from "@/components/SentencesComponent.vue";
import DefenseComponent from "@/components/DefenseComponent.vue";
import DescriptionComponent from "@/components/DescriptionComponent.vue";
import EvidencesComponent from "@/components/EvidencesComponent.vue";
import ProsecutionComponent from "@/components/ProsecutionComponent.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: 'HomeView',
  components: {
    ProsecutionComponent,
    EvidencesComponent, DescriptionComponent, DefenseComponent, SentenceComponent, JudgeComponent
  },
  created() {
    this.displayCase()
  },
  computed: {
    ...mapState(["caseToJudge"])
  },
  methods: {
    ...mapActions(["displayCase"]),
  }
}
</script>