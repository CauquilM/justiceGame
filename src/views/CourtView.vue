<template>
  <div class="game-container">
    <div class="judge-div">
      <div class="judge-bench">
        <p class="card-title"><i class="ti ti-gavel"/>Judge</p>
        <div class="judge-buttons">
          <button @click="playerDecision('guilty')">Guilty</button>
          <button @click="playerDecision('not guilty')">Not guilty</button>
        </div>
        <p v-if="judgeComment !== ''">{{ judgeComment }}</p>
      </div>
    </div>
    <div v-for="chosenCase in caseToJudge" :key="chosenCase.id" class="others-people-div">
      <div class="defense-table">
        <p class="card-title"><i class="ti ti-user-heart"/>Defense</p>
        <p v-if="defenseComment !== ''">
          {{ defenseComment }}
        </p>
      </div>

      <div class="description-display">
        <p class="card-title"><i class="ti ti-file-description"/>The case</p>
        <p>This a <b>{{ chosenCase.type }}</b> case</p>
        <p>The reason of the case is <b>{{ chosenCase.description }}</b></p>
        <p>The suspect is {{ chosenCase.suspect.name }}, he is {{ chosenCase.suspect.age }} years old</p>

      </div>

      <div class="evidence-display">
        <p class="card-title"><i class="ti ti-folders"/>Evidences</p>
        <div class="evidence-overflow">
          <p v-for="evidence in chosenCase.evidences" :key="evidence.id"
             @click="displaySentence(chosenCase.id, evidence.id)">
            {{ evidence.description }}
          </p>
        </div>
      </div>

      <div class="prosecution-table">
        <p class="card-title"><i class="ti ti-user-exclamation"/>Prosecution</p>
        <p v-if="prosecutionComment !== ''">
          {{ prosecutionComment }}
        </p>
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
          actualOutcome: "Guilty"
        }
      ],

      caseToJudge: [],
      defenseComment: '',
      prosecutionComment: '',
      judgeComment: ''
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
    },
    playerDecision(decision) {
      if (decision === "guilty") {
        this.judgeComment = "The suspect is recognized guilty, let's proceed to the sentencing";
      } else {
        this.judgeComment = "The suspect is innocent, bailiff, freed him, case dismissed"
      }
    }
  }
}
</script>
