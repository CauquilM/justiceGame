<template>
  <div>
    <b-button v-b-modal.pleadDeal-modal v-if="showButton" block variant="warning">Plea deal</b-button>
    <b-modal id="pleadDeal-modal"
             centered hide-footer
             hide-header-close
             title="Message from the clerk">
      <p class="sentencing-modal-text">The prosecution and the defense agreed to a plea deal</p>
      <div v-if="chosenCase.type === 'traffic infraction'">
        <p v-if="fineSentence > 0">{{ fineSentence }}$ of fine</p>
        <p v-else>Released of all charges</p>
      </div>
      <div v-else>
        <p v-if="prisonSentence > 0">{{ prisonSentence }} years of prison</p>
        <p v-else>No prison time</p>
        <p v-if="probationSentence > 0">{{ probationSentence }} years of probation</p>
        <p v-else>No probation time</p>
        <p v-if="fineSentence > 0">{{ fineSentence }}$ of fine</p>
        <p v-else>No fine</p>
      </div>

      <b-button variant="danger"
                @click="$bvModal.hide('pleadDeal-modal')">🕊️ Refuse the plea deal
      </b-button>
      <b-button variant="success"
                @click="$bvModal.hide('pleadDeal-modal')"><i class="ti ti-prison"/> Accept the plea deal
      </b-button>
    </b-modal>
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
      let test = 2;
      if (test === 2) {
        if (this.chosenCase.type !== 'traffic infraction'){
          if(this.noSentence() >= 2){
            this.prisonSentence = this.randomNumber(15, 1, true);
          }
          else {
            this.prisonSentence = 0;
          }
          if(this.noSentence() >= 2){
            this.probationSentence = this.randomNumber(10, 1, true);
          }
          else {
            this.probationSentence = 0;
          }
          if(this.noSentence() >= 2){
            this.fineSentence = this.randomNumber(50000, 100, true);
          }
          else{
            this.fineSentence = 0;
          }
          console.log("Sentenced to: ",
              this.prisonSentence + " " + this.probationSentence + " " + this.fineSentence);
        }
        else{
          if(this.noSentence() >= 2){
            this.fineSentence = this.randomNumber(1500, 100, true);
          }
          else{
            this.fineSentence = 0;
          }
          console.log("Sentenced to: ", this.fineSentence);
        }

      } else {
        this.showButton = false;
      }
    },
    randomNumber(max, min, isSentence) {
      if (isSentence) {
        let result = Math.floor(Math.random() * (max - min + 1)) + min;
        return result === 0 ? result += 1 : result;
      } else {
        return Math.floor(Math.random() * max);
      }
    },
    noSentence(){
      let result = Math.floor(Math.random() * 11)
      console.log("res: ", result);
      return result;
    }
  }
}
</script>