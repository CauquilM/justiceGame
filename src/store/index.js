import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
            value: null,
            text: "Select a fine"
          },
          {
            value: "0",
            text: "No fine"
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
    showAllSentences: false,
    finalComment: ''
  },
  mutations: {
    SET_CASE_TO_JUDGE(state, payload){
      state.caseToJudge.push(payload)
    }
  },
  actions: {
    displayCase({state, commit}) {
      const caseIndex = Math.floor(Math.random() * state.cases.length);
      commit("SET_CASE_TO_JUDGE", state.cases[caseIndex]);
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
  },
})
