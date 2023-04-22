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
    displaySentence(caseIndex, evidenceIndex) {
      this.defenseComment = this.cases[caseIndex].evidences[evidenceIndex].defenseSentence;
      this.prosecutionComment = this.cases[caseIndex].evidences[evidenceIndex].prosecutionSentence;
      console.log("SUSPECT: ", this.cases[caseIndex].prisonSentences)
    },
    playerDecision(decision) {
      if (decision === "guilty") {
        this.judgeComment = "The suspect is recognized guilty, let's proceed to the sentencing";
        this.$bvModal.show('guilty-modal')
      } else {
        this.judgeComment = "The suspect is innocent, bailiff, freed him, case dismissed"
        this.$bvModal.show('not-guilty-modal')
      }
    },
    doSentencing() {
      if (this.prisonSelected !== null && this.probationSelected !== null && this.fineSelected !== null) {
        const randomSentence = Math.floor(Math.random() * 3);
        if (this.prisonSelected === '0') {
          this.prisonSelected = "no time"

        }
        if (this.probationSelected === '0') {
          this.probationSelected = "no time"
        }
        if (this.fineSelected === '0') {
          this.fineSelected = "no "
        }
        if (randomSentence === 0) {
          this.finalComment = `The defendant has been recognized guilty of their crimes and
          then sentenced to ${this.prisonSelected} in prison, ${this.probationSelected}
          of probation, and a ${this.fineSelected} fine.`
        } else if (randomSentence === 1) {
          this.finalComment = `After a fair trial, the defendant has been sentenced
          to ${this.prisonSelected} in prison, ${this.probationSelected} of probation,
          and a ${this.fineSelected} fine as punishment for their actions.`
        } else {
          this.finalComment = `In a strict judgement, the defendant has been sentenced
          to ${this.prisonSelected} in prison, ${this.probationSelected} of probation,
          and a ${this.fineSelected} fine for their crimes.`
        }
        this.$bvModal.show("sentencing-success-modal")
      } else {
        this.$bvModal.show("sentencing-failed-modal");
      }
    },
    showSentences() {
      this.$bvModal.hide('guilty-modal');
      this.showAllSentences = true;
    },
    finishCase() {
      this.$bvModal.hide('sentencing-success-modal')
    }
  }
}
</script>