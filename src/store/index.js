import Vue from 'vue'
import Vuex from 'vuex'
import {eventBus} from '@/main';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cases: [
            // TEMPLATE, DO NOT ERASE
            /*{
                id: 0,
                type: "criminal",
                charge: "theft",
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
                witnesses: [
                    {
                        id: 1,
                        name: "Sarah Johnson",
                        age: 29,
                        job: "Art Historian",
                        presentation: "My name is Sarah Johnson, and I'm an art historian who specializes in the period of the stolen painting.",
                        testimony: [
                            {
                                question: "Is the stolen painting a well-known work of art?",
                                answers: [
                                    "Yes, it's considered to be one of the most important works of art from that period.",
                                    "No, it's a relatively unknown painting."
                                ]
                            },
                            {
                                question: "Can you estimate the value of the stolen painting?",
                                answers: [
                                    "It's difficult to put a precise value on a painting of this importance, but it could be worth millions of dollars.",
                                    "It's probably only worth a few thousand dollars."
                                ]
                            },
                            {
                                question: "Do you recognize the defendant as being a collector or dealer of art?",
                                answers: [
                                    "Yes, I've seen him at art auctions and exhibitions before.",
                                    "No, I don't recognize him from the art world."
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "David Moore",
                        age: 28,
                        job: "Security Guard",
                        testimony: [
                            {
                                question: "Were you working at the museum on the night of the theft?",
                                answers: [
                                    "Yes, I was on duty all night.",
                                    "No, I was off duty that night."
                                ]
                            },
                            {
                                question: "Did you see anyone suspicious in or around the museum on the night of the theft?",
                                answers: [
                                    "Yes, I saw someone matching the suspect's description near the exhibit hall.",
                                    "No, I didn't see anyone out of the ordinary that night."
                                ]
                            },
                            {
                                question: "Do you recognize the suspect in this case?",
                                answers: [
                                    "Yes, I'm almost positive that it was John Smith.",
                                    "No, I'm not sure. The lighting in the video footage was poor."
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "Tom Wilson",
                        age: 42,
                        job: "Art Dealer",
                        testimony: [
                            {
                                question: "Did you have any business dealings with John Smith?",
                                answers: [
                                    "Yes, I bought a painting from him a few months ago.",
                                    "No, I've never met the guy before."
                                ]
                            },
                            {
                                question: "Is it possible that John Smith had a motive for stealing the painting?",
                                answers: [
                                    "Yes, he could have been trying to recover a painting that he believed was stolen from him.",
                                    "No, I don't think he would risk his reputation for something like that."
                                ]
                            },
                            {
                                question: "What do you think of the evidence presented by the prosecution?",
                                answers: [
                                    "I think it's pretty damning. It's hard to argue with video footage and eyewitness testimony.",
                                    "I think there are too many holes in the prosecution's case to make a conviction."
                                ]
                            }
                        ]
                    },
                    {
                        id: 4,
                        name: "Lisa Hernandez",
                        age: 52,
                        job: "Art Historian",
                        testimony: [
                            {
                                question: "What can you tell us about the painting that was stolen?",
                                answers: [
                                    "It was a rare work by a famous artist, valued at over $1 million.",
                                    "I don't know much about it. I'm not really a specialist in that area."
                                ]
                            },
                            {
                                question: "What do you think of the security at the museum?",
                                answers: [
                                    "I think it's pretty tight. It's unlikely that someone could have just walked in and stolen a painting.",
                                    "I think there are some serious flaws in the security system. It's not hard for a determined thief to get in."
                                ]
                            },
                            {
                                question: "Do you have any information that could help us identify the thief?",
                                answers: [
                                    "No, I'm afraid not. I wish I could be more helpful.",
                                    "Yes, I saw a suspicious-looking man leaving the museum shortly after the theft occurred."
                                ]
                            }
                        ]
                    }
                ],
                /!* Punishments *!/
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
                /!* End of punishments *!/

                actualOutcome: "Guilty"
            },*/
        ],
        historicalCases: [],
        chosenCase: Object,
        prisonSelected: null,
        probationSelected: null,
        fineSelected: null,
        defenseComment: '',
        prosecutionComment: '',
        prosecutionSentences: [],
        judgeComment: '',
        showAllSentences: false,
        pleaDealExists: false,
        juryExists: false,
        juryDecision: '',
        showCourtBar: false,
        showCriminalRecord: false,
        witnessChose: Object,
        finalComment: '',
        isDark: true
    },

    getters: {
        getPrisonSelected: (state) => {
            return state.prisonSelected;
        },
        getProbationSelected: (state) => {
            return state.probationSelected;
        },
        getFineSelected: (state) => {
            return state.fineSelected;
        },
        getIsDark: (state) => {
            return state.isDark;
        }
    },

    mutations: {
        SET_CHOSEN_CASE(state, payload) {
            state.chosenCase = payload;
        },
        SET_HISTORICAL_CASES(state, payload) {
            state.historicalCases = payload;
        },
        SET_CASES(state, payload) {
            state.cases.push(payload)
        },
        SET_JUDGE_COMMENT(state, payload) {
            state.judgeComment = payload;
        },
        SET_PROSECUTION_COMMENT(state, payload) {
            state.prosecutionComment = payload;
        },
        SET_DEFENSE_COMMENT(state, payload) {
            state.defenseComment = payload;
        },
        SET_PROSECUTION_SENTENCES(state, payload) {
            state.prosecutionSentences.push(payload);
        },
        SET_SHOW_SENTENCES(state) {
            state.showAllSentences === true ? state.showAllSentences = false : state.showAllSentences = true;
        },
        SET_PLEA_DEAL(state) {
            state.pleaDealExists === true ? state.pleaDealExists = false : state.pleaDealExists = true;
        },
        SET_JURY_EXISTS(state) {
            state.juryExists === true ? state.juryExists = false : state.juryExists = true;
        },
        SET_JURY_DECISION(state, payload) {
            state.juryDecision = payload;
        },
        SET_WITNESS_CHOSE(state, payload) {
            state.witnessChose = payload;
        },
        SET_SHOW_COURT_BAR(state) {
            state.showCourtBar === true ? state.showCourtBar = false : state.showCourtBar = true;
        },
        SET_SHOW_CRIMINAL_RECORD(state) {
            state.showCriminalRecord === true ? state.showCriminalRecord = false : state.showCriminalRecord = true;
        },
        SET_PRISON_SELECTED(state, payload) {
            state.prisonSelected = payload;
        },
        SET_PROBATION_SELECTED(state, payload) {
            state.probationSelected = payload;
        },
        SET_FINE_SELECTED(state, payload) {
            state.fineSelected = payload;
        },
        SET_IS_DARK(state) {
            state.isDark === true ? state.isDark = false : state.isDark = true;
        }

    },
    actions: {
        displayCase({state, commit}) {
            let lastCase = null;
            let caseIndex = Math.floor(Math.random() * state.cases.length);
            if (lastCase === caseIndex) {
                caseIndex = Math.floor(Math.random() * state.cases.length);
            }
            lastCase = caseIndex;
            commit("SET_CHOSEN_CASE", state.cases[caseIndex]);
        },
        getHistoricalCases({commit}) {
            axios.get("https://spotless-ant-beret.cyclic.app/history")
                .then((res) => {
                    commit("SET_HISTORICAL_CASES", res.data);
                    console.log("case from bdd: ", res.data);
                })
                .catch((err) => {
                    console.log("axios fetch history cases: ", err);
                })
        },
        getAllJson() {
            axios.get("descriptions.json")
                .then((res) => {
                    console.log("data: ", res.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        chooseProsecutionSentence({commit}, sentences) {
            commit("SET_PROSECUTION_SENTENCES", sentences);
        },
        addGeneratedCase({state, commit}, cases) {
            commit("SET_CASES", cases);
            console.log("cases from store: ", state.cases)
        },
        playerDecision({dispatch, state, commit}, decision) {
            if (decision === "guilty") {
                if (state.chosenCase.type === 'parole') {
                    commit("SET_JUDGE_COMMENT", "The parole is refused to the defendant");
                    dispatch("openNotGuiltyModal");
                    console.time("test not guilty post axios");
                    axios.post("https://spotless-ant-beret.cyclic.app/history",
                        {
                            case_id: `#${Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000}`,
                            type: state.chosenCase.type,
                            charge: state.chosenCase.charge,
                            description: state.chosenCase.description,
                            suspect_name: state.chosenCase.suspect.name,
                            suspect_age: state.chosenCase.suspect.age,
                            criminalRecord: state.chosenCase.criminalRecord,
                            verdict: "Refused"
                        })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log("axios post history cases: ", err);
                        })
                    console.timeEnd("test not guilty post axios");
                } else {
                    commit("SET_JUDGE_COMMENT", "The suspect is recognized guilty, let's proceed to the sentencing");
                    dispatch("openGuiltyModal");
                }
            } else {
                if (state.chosenCase.type === 'parole') {
                    commit("SET_JUDGE_COMMENT", "The parole is accepted, you will now know the conditions");
                    dispatch("openGuiltyModal");
                } else {
                    commit("SET_JUDGE_COMMENT", "The suspect is innocent, bailiff, freed him, case dismissed");
                    dispatch("openNotGuiltyModal");
                    console.time("test not guilty post axios");
                    axios.post("https://spotless-ant-beret.cyclic.app/history",
                        {
                            case_id: `#${Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000}`,
                            type: state.chosenCase.type,
                            charge: state.chosenCase.charge,
                            description: state.chosenCase.description,
                            suspect_name: state.chosenCase.suspect.name,
                            suspect_age: state.chosenCase.suspect.age,
                            criminalRecord: state.chosenCase.criminalRecord,
                            verdict: "Not Guilty"
                        })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log("axios post history cases: ", err);
                        })
                    console.timeEnd("test not guilty post axios");
                }
            }
        },
        openGuiltyModal() {
            eventBus.$emit('openGuiltyModal');
        },
        openNotGuiltyModal() {
            eventBus.$emit('openNotGuiltyModal');
        },
        doSentencing({state}) {
            if (state.chosenCase.type === "parole") {
                if (state.probationSelected !== null) {
                    console.log("test: ", state.probationSelected);
                    if (state.probationSelected == 0) {
                        state.finalComment = `The court has decided regarding your criminal record and your behaviour 
                        in prison to freed you without conditions, stay safe.`
                    } else {
                        const randomSentence = Math.floor(Math.random() * 3);
                        if (randomSentence === 0) {
                            state.finalComment = `You will have to submit to ${state.probationSelected} years of parole, 
                            each week you will have to meet your parole officer, missing a meeting 
                            will lead you back to jail`
                        } else if (randomSentence === 1) {
                            state.finalComment = `The court has decided to give you a chance, you will be under parole 
                            for ${state.probationSelected} years, your future is in your hands.`
                        } else {
                            state.finalComment = `This court has decided to give you her clemency, 
                            you will have to serve ${state.probationSelected} of parole, enjoy the freedom, 
                            don't forget the cost of your actions.`
                        }
                    }
                    console.time("test guilty post axios");
                    axios.post("https://spotless-ant-beret.cyclic.app/history",
                        {
                            case_id: `#${Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000}`,
                            type: state.chosenCase.type,
                            charge: state.chosenCase.charge,
                            description: state.chosenCase.description,
                            suspect_name: state.chosenCase.suspect.name,
                            suspect_age: state.chosenCase.suspect.age,
                            criminalRecord: state.chosenCase.criminalRecord,
                            verdict: "Parole accepted",
                            prison: state.prisonSelected,
                            probation: state.probationSelected,
                            fine: state.fineSelected,
                        })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log("axios post history cases: ", err);
                        })
                    console.timeEnd("test guilty post axios");
                    eventBus.$emit('openSuccessModal');
                } else {
                    eventBus.$emit('openSentencingFailModal');
                }
            } else if (state.chosenCase.type !== "traffic infraction") {
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
                        state.finalComment = `The defendant has been recognized guilty and
                        then sentenced to ${state.prisonSelected} in prison, ${state.probationSelected}
                        of probation, and a ${state.fineSelected} fine.`
                    } else if (randomSentence === 1) {
                        state.finalComment = `After a fair trial, the defendant has been sentenced
                        to ${state.prisonSelected} in prison, ${state.probationSelected} of probation,
                        and a ${state.fineSelected} fine as punishment for his actions.`
                    } else {
                        state.finalComment = `In a strict judgement, the defendant has been sentenced
                        to ${state.prisonSelected} in prison, ${state.probationSelected} of probation,
                        and a ${state.fineSelected} fine for his crimes.`
                    }
                    eventBus.$emit('openSuccessModal');
                } else {
                    eventBus.$emit('openSentencingFailModal');
                }
            } else {
                if (state.fineSelected !== null) {
                    const randomSentence = Math.floor(Math.random() * 3);
                    if (state.prisonSelected === '0' || state.prisonSelected === null) {
                        state.prisonSelected = "no time"

                    }
                    if (state.probationSelected === '0' || state.probationSelected === null) {
                        state.probationSelected = "no time"
                    }
                    if (state.fineSelected === '0') {
                        state.fineSelected = "no "
                    }
                    if (randomSentence === 0) {
                        state.finalComment = `The defendant has been recognized guilty and
                        then sentenced to ${state.prisonSelected} in prison, ${state.probationSelected}
                        of probation, and a ${state.fineSelected} fine.`
                    } else if (randomSentence === 1) {
                        state.finalComment = `After a fair trial, the defendant has been sentenced
                        to ${state.prisonSelected} in prison, ${state.probationSelected} of probation,
                        and a ${state.fineSelected} fine as punishment for his actions.`
                    } else {
                        state.finalComment = `In a strict judgement, the defendant has been sentenced
                        to ${state.prisonSelected} in prison, ${state.probationSelected} of probation,
                        and a ${state.fineSelected} fine for his crimes.`
                    }
                    eventBus.$emit('openSuccessModal');
                } else {
                    eventBus.$emit('openSentencingFailModal');
                }
            }
            console.time("test guilty post axios");
            axios.post("https://spotless-ant-beret.cyclic.app/history",
                {
                    case_id: `#${Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000}`,
                    type: state.chosenCase.type,
                    charge: state.chosenCase.charge,
                    description: state.chosenCase.description,
                    suspect_name: state.chosenCase.suspect.name,
                    suspect_age: state.chosenCase.suspect.age,
                    criminalRecord: state.chosenCase.criminalRecord,
                    verdict: "Guilty",
                    prison: state.prisonSelected,
                    probation: state.probationSelected,
                    fine: state.fineSelected,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log("axios post history cases: ", err);
                })
            console.timeEnd("test guilty post axios");
        },
        togglePleaDeal({commit}) {
            commit("SET_PLEA_DEAL");
        },
        toggleJury({commit}) {
            commit("SET_JURY_EXISTS");
        },
        getJuryDecision({commit}, decision) {
            commit("SET_JURY_DECISION", decision);
        },
        displayCommentsOnEvidence({state, commit}, evidenceIndex) {
            commit("SET_PROSECUTION_COMMENT", state.chosenCase.evidences[evidenceIndex].prosecutionSentence);
            commit("SET_DEFENSE_COMMENT", state.chosenCase.evidences[evidenceIndex].defenseSentence);
        },
        callWitness({state, commit}, witness) {
            if (state.showAllSentences === true) {
                commit("SET_SHOW_SENTENCES");
            }
            if (state.showCriminalRecord === true) {
                commit("SET_SHOW_CRIMINAL_RECORD");
            }
            commit("SET_WITNESS_CHOSE", witness);
            console.log(witness)
            commit("SET_SHOW_COURT_BAR");
        },
        showSentences({state, commit}) {
            if (state.showCourtBar === true) {
                commit("SET_SHOW_COURT_BAR");
            }
            if (state.showCriminalRecord === true) {
                commit("SET_SHOW_CRIMINAL_RECORD");
            }
            commit("SET_PROSECUTION_COMMENT", '');
            commit("SET_DEFENSE_COMMENT", '');
            commit("SET_SHOW_SENTENCES");
            eventBus.$emit('closeGuiltyModal');
        },
        showCriminalRecord({state, commit}) {
            if (state.showAllSentences === true) {
                commit("SET_SHOW_SENTENCES");
            }
            if (state.showCourtBar === true) {
                commit("SET_SHOW_COURT_BAR");
            }
            commit("SET_SHOW_CRIMINAL_RECORD");
        },
        modifyPrisonSelected({commit}, prison) {
            commit("SET_PRISON_SELECTED", prison);
        },
        modifyProbationSelected({commit}, probation) {
            commit("SET_PROBATION_SELECTED", probation);
        },
        modifyFineSelected({commit}, fine) {
            commit("SET_FINE_SELECTED", fine);
        },
        modifyDarkMode({commit}) {
            commit("SET_IS_DARK");
        },
        refreshPage() {
            window.location.reload();
        },
    },
})
