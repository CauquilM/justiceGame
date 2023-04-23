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

import JudgeComponent from "@/components/CourtComponents/JudgeComponent.vue";
import SentenceComponent from "@/components/CourtComponents/SentencesComponent.vue";
import DefenseComponent from "@/components/CourtComponents/DefenseComponent.vue";
import DescriptionComponent from "@/components/CourtComponents/DescriptionComponent.vue";
import EvidencesComponent from "@/components/CourtComponents/EvidencesComponent.vue";
import ProsecutionComponent from "@/components/CourtComponents/ProsecutionComponent.vue";
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