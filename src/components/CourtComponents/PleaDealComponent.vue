<template>
  <div>
    <b-button v-b-modal.pleaDeal-modal v-if="showButton" block variant="warning">Plea deal</b-button>
    <b-modal id="pleaDeal-modal"
             centered hide-footer
             hide-header-close
             title="Message from the clerk">
      <p style="text-align: center">The prosecution and the defense agreed to a plea deal</p>
      <div style="text-align: center" v-if="chosenCase.type === 'traffic infraction'">
        <p v-if="fineSentence > 0">{{ fineSentence }}$ of fine</p>
        <p v-else>Released of all charges</p>
      </div>
      <div style="text-align: center" v-else>
        <p v-if="prisonSentence > 0">{{ prisonSentence }} years of prison</p>
        <p v-else>No prison time</p>
        <p v-if="probationSentence > 0">{{ probationSentence }} years of probation</p>
        <p v-else>No probation time</p>
        <p v-if="fineSentence > 0">{{ fineSentence }}$ of fine</p>
        <p v-else>No fine</p>
      </div>

      <div class="pleaDeal-buttons-container">
        <b-button class="pleaDeal-buttons" variant="danger"
                  @click="refusePleaDeal">🕊️ Refuse the plea deal
        </b-button>
        <b-button class="pleaDeal-buttons" variant="success"
                  @click="refreshPage"><i class="ti ti-prison"/> Accept the plea deal
        </b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

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
    ...mapActions(['refreshPage']),
    refusePleaDeal(){
      this.$bvModal.hide('pleaDeal-modal');
      this.showButton = false;
    },
    createPleaDeal() {
      if (this.randomNumber() >= 1) {
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
    randomNumber(max = 11, min, isSentence) {
      if (isSentence) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        return Math.floor(Math.random() * max);
      }
    },
    noSentence(){
      return Math.floor(Math.random() * 11);
    }
  }
}
</script>