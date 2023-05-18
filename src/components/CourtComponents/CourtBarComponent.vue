<template>
  <div v-if="showCourtBar" class="court-bar">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><i class="ti ti-folders"/>Court's Bar</p>
      <div>
        <p v-if="!hidePresentation">{{ witnessChose.presentation }}</p>
        <p v-else>{{ answer }}</p>

        <div v-for="t in witnessChose.testimony" :key="t.index" class="witness-questions-buttons">
          <b-button v-if="t.question" block variant="success" @click="setAnswer(t)">{{ t.question }}</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "CourtBarComponent",
  data(){
    return {
      hidePresentation: false,
      answer: "",
      randomNum: ""
    }
  },
  created() {
    this.randomNum = Math.floor(Math.random() * 2);
  },
  computed: {
    ...mapState(["isDark", "showCourtBar", "witnessChose"])
  },
  methods: {
    setAnswer(witness){
      console.log("witness: ", witness);
      this.hidePresentation = true;
      this.answer = witness.answers[this.randomNum];
      /*delete witness.question;*/
    }
  }
}
</script>