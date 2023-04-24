<template>
  <div>
    <b-button v-if="showButton" block variant="warning">Plea deal</b-button>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "PleaDealComponent",
  data() {
    return {
      showButton: true,
      prisonSentence: "",
      probationSentence: "",
      fineSentence: ""
    }
  },
  created() {
    this.createPleaDeal();
  },
  computed: {
    ...mapState(["chosenCase"])
  },
  methods: {
    createPleaDeal() {
      if (this.randomNumber(3) === 2) {
        let randomPrison = this.randomNumber(6);
        let randomProbation = this.randomNumber(6);
        let randomFine = this.randomNumber(6);

        this.prisonSentence = this.chosenCase.prisonSentences[randomPrison].value;
        this.probationSentence = this.chosenCase.probationSentences[randomProbation].value;
        this.fineSentence = this.chosenCase.fineSentences[randomFine].value;
        console.log("Sentenced to: ",
            this.prisonSentence + " " + this.probationSentence + " " + this.fineSentence);

      } else {
        this.showButton = false;
      }
    },
    randomNumber(max, isSentence) {
      if (isSentence) {
        let result = Math.floor(Math.random() * max);
        return result === 0 ? result += 1 : result;
      } else {
        return Math.floor(Math.random() * max);
      }
    }
  }
}
</script>