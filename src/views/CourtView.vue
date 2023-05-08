<template>
  <div class="game-container">
    <JudgeComponent/>


    <div class="others-container">

      <div class="switchable-components">
        <SentenceComponent/>

        <CourtBarComponent/>
        <CriminalRecord v-if="screenWidth > 540"/>
      </div>

      <div class="others-div">
        <DefenseComponent/>

        <DescriptionComponent />

        <CriminalRecord v-if="screenWidth < 540"/>

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
import CriminalRecord from "@/components/CourtComponents/CriminalRecord.vue";

export default {
  name: 'HomeView',
  components: {
    CriminalRecord,
    CourtBarComponent,
    AllProvesComponent,
    ProsecutionComponent, DescriptionComponent, DefenseComponent, SentenceComponent, JudgeComponent
  },
  data(){
    return {
      screenWidth: 0,
    }
  },
  created() {
    this.displayCase()
  },
  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },
  methods: {
    ...mapActions(["displayCase"]),
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  }
}
</script>