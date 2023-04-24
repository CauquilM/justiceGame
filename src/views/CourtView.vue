<template>
  <div class="game-container">
    <JudgeComponent/>


    <div class="others-container">

      <div class="switchable-components">
        <SentenceComponent/>

        <CourtBarComponent/>
      </div>

      <div class="others-div">
        <DefenseComponent/>

        <DescriptionComponent />

        <AllProvesComponent/>

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
import ProsecutionComponent from "@/components/CourtComponents/ProsecutionComponent.vue";
import {mapActions} from "vuex";
import AllProvesComponent from "@/components/CourtComponents/AllProvesComponent.vue";
import CourtBarComponent from "@/components/CourtComponents/CourtBarComponent.vue";

export default {
  name: 'HomeView',
  components: {
    CourtBarComponent,
    AllProvesComponent,
    ProsecutionComponent, DescriptionComponent, DefenseComponent, SentenceComponent, JudgeComponent
  },
  created() {
    this.displayCase()
  },
  methods: {
    ...mapActions(["displayCase"]),
  }
}
</script>