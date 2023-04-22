<template>
  <div class="game-container">
    <div class="judge-bench">
      <b-card>
        <p class="card-title"><i class="ti ti-gavel"/>Judge</p>
        <div class="judge-buttons">
          <b-button variant="danger" @click="playerDecision('guilty')">Guilty</b-button>
          <b-button variant="success" @click="playerDecision('not guilty')">Not guilty</b-button>
        </div>
        <b-modal id="guilty-modal" centered hide-footer
                 hide-header-close
                 title="Message from the clerk">
          <p class="sentencing-modal-text">{{ judgeComment }}</p>
          <b-button block class="sentencing-modal-button" variant="info"
                    @click="$bvModal.hide('guilty-modal')">
            Let's do</b-button>
        </b-modal>
        <b-modal>
          <b-button block class="sentencing-modal-button" variant="info"
                    @click="$bvModal.hide('not-guilty-modal')">
            🕊️ Freed him, case dismissed</b-button>
        </b-modal>
      </b-card>
    </div>



    <div v-for="chosenCase in caseToJudge" :key="chosenCase.id" class="others-container">

      <div class="sentences-card" v-if="showSentences">
        <b-card>
          <p class="card-title"><i class="ti ti-gavel"/>Sentences</p>
          <div class="sentences-card-select-flex">
            <b-form-select v-model="prisonSelected" :options="chosenCase.prisonSentences"></b-form-select>
            <b-form-select v-model="probationSelected" :options="chosenCase.probationSentences"></b-form-select>
            <b-form-select v-model="fineSelected" :options="chosenCase.fineSentences"></b-form-select>
            <b-button variant="danger" @click="doSentencing"><i class="ti ti-gavel"/> Sentence</b-button>
          </div>
          <b-modal id="sentencing-success-modal" centered hide-footer
                   hide-header-close
                   title="Message from the clerk">
            <p class="sentencing-modal-text">{{ finalComment }}</p>
            <b-button block class="sentencing-modal-button" variant="warning"
                      @click="finishCase">My bad<i class="ti ti-brain"/></b-button>
          </b-modal>
          <b-modal id="sentencing-failed-modal" centered hide-footer
                   hide-header-close
                   title="Message from the clerk">
            <p class="sentencing-modal-text">Judge ! You need to fill all sentencing choices</p>
            <b-button block class="sentencing-modal-button" variant="warning"
                      @click="$bvModal.hide('sentencing-failed-modal')">My bad<i class="ti ti-brain"/></b-button>
          </b-modal>
        </b-card>
      </div>

      <div class="others-div">
        <div class="defense-table">
          <b-card>
            <p class="card-title"><i class="ti ti-user-heart"/>Defense</p>
            <p v-if="defenseComment !== ''">
              {{ defenseComment }}
            </p>
          </b-card>
        </div>

        <div class="description-display">
          <b-card>
            <p class="card-title"><i class="ti ti-file-description"/>The case</p>
            <p>This a <b>{{ chosenCase.type }}</b> case</p>
            <p>The reason of the case is <b>{{ chosenCase.description }}</b></p>
            <p>The suspect is {{ chosenCase.suspect.name }}, he is {{ chosenCase.suspect.age }} years old</p>
          </b-card>
        </div>

        <div class="evidence-display">
          <b-card>
            <p class="card-title"><i class="ti ti-folders"/>Evidences</p>
            <div class="evidence-overflow">
              <p v-for="evidence in chosenCase.evidences" :key="evidence.id"
                 @click="displaySentence(chosenCase.id, evidence.id)">
                {{ evidence.description }}
              </p>
            </div>
          </b-card>
        </div>

        <div class="prosecution-table">
          <b-card>
            <p class="card-title"><i class="ti ti-user-exclamation"/>Prosecution</p>
            <p v-if="prosecutionComment !== ''">
              {{ prosecutionComment }}
            </p>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      cases: [
        {
          id: 0,
          type: "Criminal",
          description: "Theft of a valuable painting",
          suspect: {
            name: "John Smith",
            age: 35
          },
          evidences: [
            {
              id: 0,
              description: "Surveillance footage shows John Smith entering the museum at the time of the theft",
              prosecutionSentence: "We have clear video evidence that places John Smith at the scene of the crime.",
              defenseSentence: "The video footage is grainy and inconclusive. It could have been anyone in the video."
            },
            {
              id: 1,
              description: "A witness saw John Smith near the museum shortly before the theft occurred",
              prosecutionSentence: "We have a reliable witness who saw John Smith near the museum at the time of the theft.",
              defenseSentence: "The witness is unreliable and their testimony cannot be trusted."
            },
            {
              id: 2,
              description: "John Smith was found in possession of a key that unlocks the display case where the painting was stolen from",
              prosecutionSentence: "We found a key in John Smith's possession that unlocks the display case where the painting was stolen from.",
              defenseSentence: "John Smith is an art collector and the key is from his private collection. It has nothing to do with the theft."
            }
          ],
          /* Punishments */
          prisonSentences: [
            {
              value: null,
              text: "Select a prison time"
            },
            {
              value: "0",
              text: "No prison time"
            },
            {
              value: "15 years",
              text: "15 years"
            },
            {
              value: "20 years",
              text: "20 years"
            },
            {
              value: "25 years",
              text: "25 years"
            }
          ],
          probationSentences: [
            {
              value: null,
              text: "Select a probation duration"
            },
            {
              value: "0",
              text: "No probation time"
            },
            {
              value: "5 years",
              text: "5 years"
            },
            {
              value: "3 years",
              text: "3 years"
            },
            {
              value: "2 years",
              text: "2 years."
            }
          ],
          fineSentences: [
            {
              value: "0",
              text: "No fine"
            },
            {
              value: null,
              text: "Select a fine"
            },
            {
              value: "$250,000",
              text: "$250,000."
            },
            {
              value: "$150,000",
              text: "$150,000"
            },
            {
              value: "$500,000",
              text: "$500,000"
            }
          ],
          /* End of punishments */

          actualOutcome: "Guilty"
        }
      ],
      caseToJudge: [],
      prisonSelected: null,
      probationSelected: null,
      fineSelected: null,
      defenseComment: '',
      prosecutionComment: '',
      judgeComment: '',
      showSentences: false,
      finalComment: ''
    }
  },
  created() {
    this.displayCase()
  },
  methods: {
    displayCase() {
      const caseIndex = Math.floor(Math.random() * this.cases.length);
      this.caseToJudge.push(this.cases[caseIndex]);
      console.log("Here : ", this.caseToJudge);
    },
    displaySentence(caseIndex, evidenceIndex) {
      this.defenseComment = this.cases[caseIndex].evidences[evidenceIndex].defenseSentence;
      this.prosecutionComment = this.cases[caseIndex].evidences[evidenceIndex].prosecutionSentence;
      console.log("SUSPECT: ", this.cases[caseIndex].prisonSentences)
    },
    playerDecision(decision) {
      if (decision === "guilty") {
        this.judgeComment = "The suspect is recognized guilty, let's proceed to the sentencing";
        this.$bvModal.show('guilty-modal')
        /*this.showSentences = true;*/
      } else {
        this.judgeComment = "The suspect is innocent, bailiff, freed him, case dismissed"
        this.$bvModal.show('guilty-modal')
      }
    },
    doSentencing() {
      if (this.prisonSelected !== null && this.probationSelected !== null && this.fineSelected !== null) {
        const randomSentence = Math.floor(Math.random() * 3);
        if(randomSentence === 0){
          this.finalComment = `The defendant has been recognized guilty of their crimes and
          then sentenced to ${this.prisonSelected} in prison, ${this.probationSelected}
          of probation, and a ${this.fineSelected} fine.`
        }
        else if (randomSentence === 1){
          this.finalComment = `After a fair trial, the defendant has been sentenced
          to ${this.prisonSelected} in prison, ${this.probationSelected} of probation,
          and a ${this.fineSelected} fine as punishment for their actions.`
        }
        else {
          this.finalComment = `In a strict judgement, the defendant has been sentenced
          to ${this.prisonSelected} in prison, ${this.probationSelected} of probation,
          and a ${this.fineSelected} fine for their crimes.`
        }
        this.$bvModal.show("sentencing-success-modal")
      } else {
        this.$bvModal.show("sentencing-failed-modal");
      }
    },
    finishCase(){
      this.$bvModal.hide('sentencing-success-modal')
    }
  }
}
</script>