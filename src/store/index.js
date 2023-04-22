import Vue from 'vue'
import Vuex from 'vuex'
import {eventBus} from '../main';

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
        prisonSelected: '0',
        probationSelected: null,
        fineSelected: null,
        defenseComment: '',
        prosecutionComment: '',
        judgeComment: '',
        showAllSentences: false,
        finalComment: ''
    },

    getters: {
        getPrisonSelected: (state) => {
            console.log(state.prisonSelected);
            return state.prisonSelected;
        },
        getProbationSelected: (state) => {
            return state.probationSelected;
        },
        getFineSelected: (state) => {
            return state.fineSelected;
        }
    },

    mutations: {
        SET_CASE_TO_JUDGE(state, payload) {
            state.caseToJudge.push(payload)
        },
        SET_JUDGE_COMMENT(state, payload) {
            state.judgeComment = payload;
        },
        SET_SHOW_SENTENCES(state) {
            state.showAllSentences === true ? state.showAllSentences = false : state.showAllSentences = true;
        },
        SET_PRISON_SELECTED(state, payload) {
            state.prisonSelected = payload;
        },
        SET_PROBATION_SELECTED(state, payload) {
            state.probationSelected = payload;
        },
        SET_FINE_SELECTED(state, payload) {
            state.fineSelected = payload;
        }

    },
    actions: {
        displayCase({state, commit}) {
            const caseIndex = Math.floor(Math.random() * state.cases.length);
            commit("SET_CASE_TO_JUDGE", state.cases[caseIndex]);
        },
        playerDecision({dispatch, commit}, decision) {
            if (decision === "guilty") {
                commit("SET_JUDGE_COMMENT", "The suspect is recognized guilty, let's proceed to the sentencing");
                dispatch("openGuiltyModal");
            } else {
                commit("SET_JUDGE_COMMENT", "The suspect is innocent, bailiff, freed him, case dismissed");
                dispatch("openNotGuiltyModal");
            }
        },
        openGuiltyModal() {
            eventBus.$emit('openGuiltyModal');
        },
        openNotGuiltyModal() {
            eventBus.$emit('openNotGuiltyModal');
        },
        doSentencing({state}) {
            if (state.prisonSelected !== null && state.probationSelected !== null && state.fineSelected !== null) {
                const randomSentence = Math.floor(Math.random() * 3);
                if (state.prisonSelected === '0') {
                    state.prisonSelected = "no time"

                }
                if (state.probationSelected === '0') {
                    state.probationSelected = "no time"
                }
                if (state.fineSelected === '0') {
                    state.fineSelected = "no "
                }
                if (randomSentence === 0) {
                    state.finalComment = `The defendant has been recognized guilty of their crimes and
          then sentenced to ${state.prisonSelected} in prison, ${state.probationSelected}
          of probation, and a ${state.fineSelected} fine.`
                } else if (randomSentence === 1) {
                    state.finalComment = `After a fair trial, the defendant has been sentenced
          to ${state.prisonSelected} in prison, ${state.probationSelected} of probation,
          and a ${state.fineSelected} fine as punishment for their actions.`
                } else {
                    state.finalComment = `In a strict judgement, the defendant has been sentenced
          to ${state.prisonSelected} in prison, ${state.probationSelected} of probation,
          and a ${state.fineSelected} fine for their crimes.`
                }
                eventBus.$emit('openSuccessModal');
            } else {
                eventBus.$emit('openSentencingFailModal');
            }
        },
        showSentences({commit}) {
            /*this.$bvModal.hide('guilty-modal');*/
            commit("SET_SHOW_SENTENCES");
            eventBus.$emit('closeGuiltyModal');
        },
        modifyPrisonSelected({commit}, prison) {
            console.log("coucou", prison);
            commit("SET_PRISON_SELECTED", prison);
        },
        modifyProbationSelected({commit}, probation) {
            commit("SET_PROBATION_SELECTED", probation);
        },
        modifyFineSelected({commit}, fine) {
            commit("SET_FINE_SELECTED", fine);
        }
    },
})
