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
            /*{
                id: 1,
                type: "Criminal",
                description: "Breaking and entering into a jewelry store",
                suspect: {
                    name: "Sarah Davis",
                    age: 28
                },
                evidences: [
                    {
                        id: 0,
                        description: "Surveillance footage shows a person with a similar build to Sarah Davis breaking into the store",
                        prosecutionSentence: "We have clear video evidence that shows Sarah Davis breaking into the store.",
                        defenseSentence: "The video footage is of poor quality and does not conclusively show my client breaking into the store."
                    },
                    {
                        id: 1,
                        description: "A witness saw another person fleeing the scene of the crime",
                        prosecutionSentence: "We have a witness who saw Sarah Davis leaving the store with stolen jewelry.",
                        defenseSentence: "The witness could not clearly identify the person they saw, and it could have been someone other than my client."
                    },
                    {
                        id: 2,
                        description: "No stolen items were found in Sarah Davis' possession at the time of her arrest",
                        prosecutionSentence: "The fact that Sarah Davis did not have any stolen items on her does not prove her innocence.",
                        defenseSentence: "The lack of any stolen items in my client's possession is evidence that she did not commit the crime."
                    }
                ],
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
                        value: "5 years",
                        text: "5 years"
                    },
                    {
                        value: "10 years",
                        text: "10 years"
                    },
                    {
                        value: "15 years",
                        text: "15 years"
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
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "$50,000",
                        text: "$50,000"
                    },
                    {
                        value: "$100,000",
                        text: "$100,000"
                    },
                    {
                        value: "$250,000",
                        text: "$250,000"
                    }
                ],
                actualOutcome: "Not guilty"
            },
            {
                id: 2,
                type: "Fraud",
                description: "Embezzlement of company funds",
                suspect: {
                    name: "John Smith",
                    age: 42
                },
                evidences: [
                    {
                        id: 0,
                        description: "Bank statements show large sums of money being transferred from the company's account to John Smith's personal account",
                        prosecutionSentence: "The bank statements provide clear evidence that John Smith embezzled company funds for his own personal use.",
                        defenseSentence: "My client was authorized to make transfers between the company and personal accounts, and these transfers were for legitimate business purposes."
                    },
                    {
                        id: 1,
                        description: "Several employees reported suspicious behavior from John Smith, including him leaving work early and having unexplained absences",
                        prosecutionSentence: "The employees' reports indicate that John Smith was attempting to hide his fraudulent activities.",
                        defenseSentence: "My client had personal reasons for leaving work early and had already reported these to his supervisor."
                    },
                    {
                        id: 2,
                        description: "An audit of the company's finances found discrepancies that pointed to embezzlement",
                        prosecutionSentence: "The audit clearly shows that John Smith manipulated the company's finances for his own personal gain.",
                        defenseSentence: "My client did not intentionally manipulate the finances and was not aware of any discrepancies until after the audit was conducted."
                    }
                ],
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
                        value: "3 years",
                        text: "3 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
                    },
                    {
                        value: "10 years",
                        text: "10 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$50,000",
                        text: "$50,000"
                    },
                    {
                        value: "$100,000",
                        text: "$100,000"
                    },
                    {
                        value: "$250,000",
                        text: "$250,000"
                    }
                ],
                actualOutcome: "Guilty"
            },
            {
                id: 3,
                type: "Assault",
                description: "Physical assault against a coworker",
                suspect: {
                    name: "Robert Johnson",
                    age: 35
                },
                evidences: [
                    {
                        id: 0,
                        description: "Security camera footage shows Robert Johnson attacking his coworker in the break room",
                        prosecutionSentence: "The video footage provides clear evidence of Robert Johnson's violent behavior towards his coworker.",
                        defenseSentence: "My client was acting in self-defense after being provoked and physically attacked by the victim first."
                    },
                    {
                        id: 1,
                        description: "Multiple witnesses saw the altercation and reported Robert Johnson as the aggressor",
                        prosecutionSentence: "The witnesses' testimonies provide further evidence that Robert Johnson initiated the physical assault.",
                        defenseSentence: "The witnesses' perception of the incident was influenced by the victim's aggressive behavior towards my client."
                    },
                    {
                        id: 2,
                        description: "Medical records show that the victim sustained injuries consistent with physical assault",
                        prosecutionSentence: "The victim's injuries indicate that Robert Johnson's attack was unprovoked and excessive.",
                        defenseSentence: "My client did not intend to cause serious harm and was only defending himself from the victim's initial attack."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    },
                    {
                        value: "$25,000",
                        text: "$25,000"
                    }
                ],
                actualOutcome: "Guilty"
            },
            {
                id: 4,
                type: "Theft",
                description: "Alleged theft of a valuable piece of jewelry",
                suspect: {
                    name: "Maria Rodriguez",
                    age: 28
                },
                evidences: [
                    {
                        id: 0,
                        description: "The victim reported the theft of a valuable piece of jewelry from their home, and Maria Rodriguez was identified as a possible suspect",
                        prosecutionSentence: "The victim's report and suspicion of Maria Rodriguez suggest that she may have been involved in the theft.",
                        defenseSentence: "My client was not present at the time of the alleged theft and has no knowledge or involvement in the matter."
                    },
                    {
                        id: 1,
                        description: "Maria Rodriguez has no prior criminal record or history of theft",
                        prosecutionSentence: "The lack of prior criminal record does not necessarily prove the defendant's innocence and may indicate that they simply had not been caught before.",
                        defenseSentence: "My client's clean record is evidence of their good character and lack of propensity to commit crimes like theft."
                    },
                    {
                        id: 2,
                        description: "A witness reported seeing someone matching Maria Rodriguez's description in the area around the time of the theft",
                        prosecutionSentence: "The witness's report provides circumstantial evidence that Maria Rodriguez may have been involved in the theft.",
                        defenseSentence: "The witness's report is unreliable and lacks any concrete evidence to implicate my client in the alleged theft."
                    },
                    {
                        id: 3,
                        description: "Maria Rodriguez's phone records and GPS data show that she was at a different location at the time of the theft",
                        prosecutionSentence: "The phone and GPS data may have been manipulated or inaccurate, and do not necessarily prove the defendant's innocence.",
                        defenseSentence: "The phone and GPS data clearly show that my client was not at the scene of the alleged theft and thus could not have been involved."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$2,000",
                        text: "$2,000"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: "Not Guilty"
            },
            {
                id: 5,
                type: "Forgery",
                description: "Alleged forgery of a signature on a legal document",
                suspect: {
                    name: "John Smith",
                    age: 42
                },
                evidences: [
                    {
                        id: 0,
                        description: "The signature on the legal document appears to be forged and does not match the alleged signer's usual signature",
                        prosecutionSentence: "The evidence suggests that John Smith may have forged the signature on the legal document.",
                        defenseSentence: "The signature may have been a genuine attempt by my client to replicate the alleged signer's signature, or may have been the result of an innocent mistake."
                    },
                    {
                        id: 1,
                        description: "John Smith has a history of working in a profession that requires signing legal documents",
                        prosecutionSentence: "John Smith's experience in signing legal documents may indicate that he had the necessary skills and knowledge to forge the signature in question.",
                        defenseSentence: "My client's experience in signing legal documents is evidence of their expertise in the field and does not necessarily prove that they committed forgery."
                    },
                    {
                        id: 2,
                        description: "A handwriting expert analyzed the signature and concluded that it was not a genuine signature",
                        prosecutionSentence: "The handwriting expert's analysis provides strong evidence that the signature was forged and that John Smith may have been responsible.",
                        defenseSentence: "The handwriting expert's analysis may have been inaccurate or inconclusive, and does not necessarily prove that my client committed forgery."
                    },
                    {
                        id: 3,
                        description: "John Smith was out of the country at the time the legal document was signed",
                        prosecutionSentence: "The fact that John Smith was out of the country at the time of the alleged forgery does not necessarily prove his innocence, as he may have had an accomplice.",
                        defenseSentence: "My client's absence from the country at the time of the alleged forgery is evidence of their inability to commit the crime and indicates their innocence."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$2,000",
                        text: "$2,000"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: "Not Guilty"
            },
            {
                id: 6,
                type: "Burglary",
                description: "A home was burglarized and several valuable items were stolen",
                suspect: {
                    name: "Alex Johnson",
                    age: 25
                },
                evidences: [
                    {
                        id: 0,
                        description: "The homeowner reported seeing someone matching the suspect's description near the house on the night of the burglary",
                        prosecutionSentence: "The eyewitness testimony places the suspect at the scene of the crime and suggests that they may have been responsible for the burglary.",
                        defenseSentence: "The eyewitness testimony is unreliable as it was dark and the homeowner did not get a clear view of the suspect. It is possible that someone else with a similar appearance was in the area at the time."
                    },
                    {
                        id: 1,
                        description: "A fingerprint found at the scene matches the suspect's fingerprint",
                        prosecutionSentence: "The fingerprint evidence provides strong proof that the suspect was at the scene of the burglary and may have been responsible for it.",
                        defenseSentence: "The presence of the fingerprint does not necessarily prove that the suspect committed the burglary. It is possible that the suspect's fingerprint was left there innocently, for example, if they had visited the home previously."
                    },
                    {
                        id: 2,
                        description: "The suspect's alibi for the night of the burglary was corroborated by several witnesses",
                        prosecutionSentence: "The suspect's alibi may have been fabricated and the witnesses may be lying to protect the suspect.",
                        defenseSentence: "The corroborated alibi provides strong evidence that the suspect was not at the scene of the crime and is therefore innocent of the burglary."
                    },
                    {
                        id: 3,
                        description: "No stolen items were found in the suspect's possession or in their residence",
                        prosecutionSentence: "The lack of stolen items found in the suspect's possession does not necessarily prove their innocence as they may have sold or disposed of the items.",
                        defenseSentence: "The absence of stolen items in the suspect's possession or residence provides strong evidence that they did not commit the burglary."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$2,000",
                        text: "$2,000"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: "Not Guilty"
            },
            {
                id: 7,
                type: "Assault",
                description: "A man was attacked in a parking lot and suffered serious injuries",
                suspect: {
                    name: "Emily Rodriguez",
                    age: 31
                },
                evidences: [
                    {
                        id: 0,
                        description: "The victim identified the suspect in a police lineup as the person who attacked him",
                        prosecutionSentence: "The victim's identification provides strong evidence that the suspect was the perpetrator of the assault.",
                        defenseSentence: "Eyewitness identification can be unreliable and subject to bias. It is possible that the victim misidentified the suspect due to factors such as stress or poor lighting."
                    },
                    {
                        id: 1,
                        description: "DNA evidence found under the victim's fingernails matches the suspect's DNA",
                        prosecutionSentence: "The DNA evidence provides strong proof that the suspect was in physical contact with the victim during the assault.",
                        defenseSentence: "The presence of the suspect's DNA under the victim's fingernails does not necessarily prove that the suspect committed the assault. It is possible that the DNA was transferred innocently, for example, through casual contact."
                    },
                    {
                        id: 2,
                        description: "Surveillance footage from the parking lot shows someone matching the suspect's description near the scene of the assault at the time it occurred",
                        prosecutionSentence: "The surveillance footage places the suspect at the scene of the assault and suggests that they may have been responsible for it.",
                        defenseSentence: "Surveillance footage can be subject to interpretation and may not provide conclusive proof of a suspect's involvement. It is possible that someone else with a similar appearance was in the area at the time."
                    },
                    {
                        id: 3,
                        description: "A witness saw the suspect arguing with the victim in the parking lot shortly before the assault occurred",
                        prosecutionSentence: "The witness testimony places the suspect at the scene of the assault and suggests that they may have had a motive for attacking the victim.",
                        defenseSentence: "The witness testimony is subject to interpretation and may not provide conclusive proof of the suspect's involvement. It is possible that the witness misinterpreted the situation or that someone else was involved in the assault."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
                    },
                    {
                        value: "7 years",
                        text: "7 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "$2,500",
                        text: "$2,500"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: "Guilty, sentenced to 3 years in prison and 2 years of probation, and fined $5,000."
            },
            {
                id: 8,
                type: "Assault",
                description: "A man was found with serious injuries following an altercation outside a nightclub",
                suspect: {
                    name: "Jack Wilson",
                    age: 29
                },
                evidences: [
                    {
                        id: 0,
                        description: "Several witnesses reported seeing the suspect arguing with the victim shortly before the assault took place",
                        prosecutionSentence: "The witness testimony places the suspect at the scene of the crime and suggests that they may have been responsible for the assault.",
                        defenseSentence: "The witness testimony is unreliable as it is based on the perception and memory of individuals who may have been under the influence of alcohol or drugs at the time."
                    },
                    {
                        id: 1,
                        description: "CCTV footage shows the suspect striking the victim with a bottle and then fleeing the scene",
                        prosecutionSentence: "The CCTV footage provides strong proof that the suspect was involved in the assault and may have caused the victim's injuries.",
                        defenseSentence: "The CCTV footage does not necessarily show the entire context of the altercation and may not accurately depict what happened. It is possible that the suspect acted in self-defense."
                    },
                    {
                        id: 2,
                        description: "The suspect has a prior criminal record for violent behavior",
                        prosecutionSentence: "The suspect's past behavior suggests a tendency towards violence and may support the argument that they were responsible for the assault.",
                        defenseSentence: "The suspect's past behavior does not necessarily prove that they were involved in this particular incident. It is possible that they have reformed and did not commit the assault."
                    },
                    {
                        id: 3,
                        description: "Forensic evidence collected at the scene matches the suspect's DNA",
                        prosecutionSentence: "The DNA evidence provides strong proof that the suspect was at the scene of the assault and may have been responsible for it.",
                        defenseSentence: "The presence of the suspect's DNA does not necessarily prove that they committed the assault. It is possible that their DNA was present at the scene innocently, for example, if they had been there previously."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$2,500",
                        text: "$2,500"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: null
            },
            {
                id: 9,
                type: "Robbery",
                description: "A convenience store was robbed at gunpoint",
                suspect: {
                    name: "Mark Davis",
                    age: 30
                },
                evidences: [
                    {
                        id: 0,
                        description: "Surveillance footage captured a man matching the suspect's description leaving the store shortly after the robbery",
                        prosecutionSentence: "The footage clearly shows the suspect leaving the store after the robbery and supports the claim that they were responsible for the crime.",
                        defenseSentence: "The footage does not clearly show the suspect's face, and it is possible that someone else with a similar appearance committed the crime."
                    },
                    {
                        id: 1,
                        description: "A gun matching the description of the one used in the robbery was found in the suspect's car",
                        prosecutionSentence: "The gun found in the suspect's car matches the description of the weapon used in the robbery and provides strong evidence that they were responsible for the crime.",
                        defenseSentence: "The presence of the gun in the suspect's car does not necessarily prove that they used it during the robbery. It is possible that someone else put it there."
                    },
                    {
                        id: 2,
                        description: "Eyewitnesses reported seeing a man matching the suspect's description fleeing the scene shortly after the robbery",
                        prosecutionSentence: "The eyewitness testimony places the suspect at the scene of the crime and suggests that they may have been responsible for the robbery.",
                        defenseSentence: "The eyewitness testimony is unreliable as it was dark and the witnesses may have been mistaken in identifying the suspect."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$1,000",
                        text: "$1,000"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: "Guilty"
            },
            {
                id: 10,
                type: "Spying",
                description: "A private investigator is suspected of spying on a client's ex-spouse for personal gain.",
                suspect: {
                    name: "John Smith",
                    age: 43
                },
                evidences: [
                    {
                        id: 0,
                        description: "The suspect was seen outside the ex-spouse's house on multiple occasions, sometimes using binoculars or a camera.",
                        prosecutionSentence: "The eyewitness testimony and video evidence places the suspect at the scene of the spying, and suggests that they were using equipment to surveil the ex-spouse.",
                        defenseSentence: "The suspect was hired by the client to investigate their ex-spouse. The use of binoculars and cameras is standard procedure for private investigators, and the suspect was not breaking any laws."
                    },
                    {
                        id: 1,
                        description: "The suspect was caught accessing the ex-spouse's computer and email accounts without permission.",
                        prosecutionSentence: "The computer and email account were clearly private, and the suspect had no right to access them. This evidence shows that the suspect was intentionally invading the ex-spouse's privacy for their own personal gain.",
                        defenseSentence: "The client had given the suspect permission to access the computer and email account as part of the investigation. The suspect had no intention of using the information for their own personal gain."
                    },
                    {
                        id: 2,
                        description: "The suspect was overheard talking to someone about using the information gathered from the investigation to blackmail the ex-spouse.",
                        prosecutionSentence: "This statement clearly shows that the suspect had illegal intentions in gathering the information, and planned to use it for personal gain.",
                        defenseSentence: "The statement was taken out of context. The suspect was discussing legal options with their client, not planning to blackmail anyone."
                    }
                ],
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "5 years",
                        text: "5 years"
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
                        value: "1 year",
                        text: "1 year"
                    },
                    {
                        value: "2 years",
                        text: "2 years"
                    },
                    {
                        value: "3 years",
                        text: "3 years"
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
                        value: "$2,000",
                        text: "$2,000"
                    },
                    {
                        value: "$5,000",
                        text: "$5,000"
                    },
                    {
                        value: "$10,000",
                        text: "$10,000"
                    }
                ],
                actualOutcome: "Guilty"
            }*/
        ],
        caseToJudge: [],
        prisonSelected: '0',
        probationSelected: null,
        fineSelected: null,
        defenseComment: '',
        prosecutionComment: '',
        judgeComment: '',
        showAllSentences: false,
        finalComment: '',
        isDark: true
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
        },
        getIsDark: (state) => {
            return state.isDark;
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
        },
        SET_IS_DARK(state) {
            state.isDark === true ? state.isDark = false : state.isDark = true;
        }

    },
    actions: {
        displayCase({state, commit}) {
            var lastCase = null;
            var caseIndex = Math.floor(Math.random() * state.cases.length);
            if (lastCase === caseIndex) {
                caseIndex = Math.floor(Math.random() * state.cases.length);
            }
            lastCase = caseIndex;
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
        displayCommentsOnEvidence({state}, {caseIndex, evidenceIndex}) {
            state.defenseComment = state.cases[caseIndex].evidences[evidenceIndex].defenseSentence;
            state.prosecutionComment = state.cases[caseIndex].evidences[evidenceIndex].prosecutionSentence;
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
        },
        modifyDarkMode({commit}) {
            commit("SET_IS_DARK");
        },
        refreshPage() {
            window.location.reload();
        }
    },
})
