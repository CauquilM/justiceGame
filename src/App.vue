<template>
  <div id="app" :class="isDark ?'bg-dark text-light' : ''">
    <div class="dark-mode-flex">
      <DarkModeSwitch/>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>
<script setup>
import DarkModeSwitch from "@/components/CourtComponents/DarkModeSwitch.vue";
</script>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapState(["isDark"])
  },
  created() {
    console.time("Test");
    this.caseGeneration();
    console.timeEnd("Test");
  },
  methods: {
    ...mapActions(["addGeneratedCase"]),

    caseGeneration() {

      // Create suspect name
      function generateName() {
        const firstName = ["Emma", "Olivia", "Ava", "Isabella",
          "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn"];

        const lastName = ["Smith", "Johnson", "Williams", "Jones",
          "Brown", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

        const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
        const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];

        return `${randomFirstName} ${randomLastName}`;
      }


      // Define case types
      const caseTypes = ['Criminal'
        /* , 'Road'
         , 'Prison'*/
      ];

      // Define case properties for each type
      const caseProperties = {
        Criminal: ['charge'],
        /*Road: ['charge'],
        Prison: ['charge']*/
      };


      // Define randomization parameters
      const randomizationParams = {
        'type': "",
        'charge': ['murder', 'theft', 'fraud', 'assault']
        /*'witnesses': ['eye witness', 'expert witness', 'character witness']*/
      };

      const descriptions = {
        murder: [
          {
            id: 0,
            description: "A victim was found dead on 4th street"
          },
          {
            id: 1,
            description: "The victim's cause of death was determined to be a gunshot wound"
          },
          {
            id: 2,
            description: "The victim was last seen at a nearby bar with an unknown person"
          },
          {
            id: 3,
            description: "The suspect's DNA was found at the crime scene"
          },
          {
            id: 4,
            description: "The suspect's alibi has been confirmed by multiple witnesses"
          },
          {
            id: 5,
            description: "The victim and the suspect had a history of conflict"
          },
          {
            id: 6,
            description: "The victim's cellphone records show a text message exchange with the suspect on the night of the murder"
          },
          {
            id: 7,
            description: "The victim's blood was found on the suspect's clothing"
          },
          {
            id: 8,
            description: "A neighbor reported hearing gunshots around the time of the murder"
          },
          {
            id: 9,
            description: "The suspect was arrested and charged with first-degree murder"
          }
        ],

        theft: [
          {
            id: 0,
            description: "The antique store owner discovered a valuable artifact missing from their display case."
          },
          {
            id: 1,
            description: "A customer reported their wallet stolen from their bag while shopping at a mall."
          },
          {
            id: 2,
            description: "The electronics store reported a theft of several high-value laptops from the display shelf."
          },
          {
            id: 3,
            description: "A customer reported a purse stolen from their unlocked car while parked outside a grocery store."
          },
          {
            id: 4,
            description: "The victim's phone was stolen while they were at a busy downtown park."
          },
          {
            id: 5,
            description: "The school's computer lab reported missing equipment and upon review of the security footage, saw an unknown individual leaving with the items."
          },
          {
            id: 6,
            description: "The construction site reported several power tools stolen over the weekend."
          },
          {
            id: 7,
            description: "The store owner discovered a rack of clothing missing from their boutique store."
          },
          {
            id: 8,
            description: "A delivery truck was hijacked while making a stop, resulting in the theft of several packages."
          },
          {
            id: 9,
            description: "A customer reported their bike stolen from the bike rack outside the gym."
          }, {
            id: 10,
            description: "The homeowner returned from vacation to find that their safe had been stolen, containing jewelry and important documents."
          },
          {
            id: 11,
            description: "The store manager noticed a shortage of cash in the register and upon review of the surveillance footage, saw an employee pocketing the money."
          },
          {
            id: 12,
            description: "The victim's car was broken into and several items were stolen, including a laptop and a phone."
          },
          {
            id: 13,
            description: "A customer reported their wallet missing after leaving it on the counter at the convenience store."
          },
          {
            id: 14,
            description: "The security cameras captured footage of the suspect stealing a watch from the jewelry store."
          },
        ],

        fraud: [
          {
            id: 1,
            description: "A fraudulent email was sent to customers asking them to update their account information, resulting in several cases of identity theft."
          },

          {
            id: 2,
            description: "A financial advisor was found to have embezzled money from several clients over a period of several years."
          },

          {
            id: 3,
            description: "A company's accounting department was discovered to have falsified financial records to inflate profits and deceive investors."
          },

          {
            id: 4,
            description: "A group of individuals were caught operating a fraudulent investment scheme that resulted in millions of dollars in losses for unsuspecting investors."
          },

          {
            id: 5,
            description: "A fake charity organization was set up to scam people out of money by promising to donate to a worthy cause."
          },

          {
            id: 6,
            description: "An individual used another person's identity to apply for loans and credit cards, resulting in significant financial damage to the victim."
          },

          {
            id: 7,
            description: "An insurance company was found to have routinely denied valid claims and misled customers about their coverage."
          },

          {
            id: 8,
            description: "A computer hacker gained unauthorized access to a company's financial records and used the information for fraudulent purposes."
          },

          {
            id: 9,
            description: "An individual was caught selling counterfeit goods online, resulting in significant financial losses for consumers and legitimate businesses."
          },

          {
            id: 10,
            description: "A company's executives were discovered to have engaged in insider trading, using confidential information to make illegal profits."
          },

          {
            id: 11,
            description: "A financial institution was caught engaging in predatory lending practices that targeted vulnerable individuals and led to financial ruin."
          },

          {
            id: 12,
            description: "A group of individuals were caught running a Ponzi scheme, where early investors were paid with the money of new investors until the entire scheme collapsed."
          },

          {
            id: 13,
            description: "An employee was caught stealing company funds by falsifying expense reports and diverting money to their personal accounts."
          },

          {
            id: 14,
            description: "A company's marketing department was discovered to have made false claims about the benefits of their products, resulting in consumer harm and regulatory fines."
          },

          {
            id: 15,
            description: "An individual was caught using a fake identity to obtain a job, leading to financial losses for the employer and damage to their reputation."
          }
        ],

        assault: [
          {
            id: 0,
            description: "The victim reported being physically attacked by the suspect"
          },
          {
            id: 1,
            description: "Multiple witnesses saw the suspect hitting the victim"
          },
          {
            id: 2,
            description: "The victim has visible injuries consistent with being assaulted"
          },
          {
            id: 3,
            description: "Security footage shows the suspect striking the victim"
          },
          {
            id: 4,
            description: "The suspect was found with the victim's belongings and had blood on their clothing"
          },
          {
            id: 5,
            description: "The victim's medical records indicate injuries consistent with being assaulted"
          },
          {
            id: 6,
            description: "The suspect has a history of violent behavior and was previously convicted of assault"
          },
          {
            id: 7,
            description: "A bystander intervened to stop the assault and called the police"
          },
          {
            id: 8,
            description: "The victim identified the suspect as their attacker in a police lineup"
          },
          {
            id: 9,
            description: "The suspect was overheard threatening to harm the victim prior to the assault"
          },
          {
            id: 10,
            description: "The suspect was caught on camera following the victim prior to the assault"
          },
          {
            id: 11,
            description: "The victim's statement is consistent with the evidence at the scene"
          },
          {
            id: 12,
            description: "A neighbor heard screams and called the police, arriving in time to see the suspect fleeing the scene"
          },
          {
            id: 13,
            description: "The suspect was found with a weapon that matches the one used in the assault"
          },
          {
            id: 14,
            description: "The suspect has a history of animosity towards the victim and had motive to commit the assault"
          }
        ]
      };

      const evidences = {
        murder: [
          {
            id: 0,
            description: "A witness saw the suspect near the scene of the crime at the time of the murder",
            prosecutionSentence: "We have a witness who saw the suspect near the scene of the crime at the time of the murder. The witness is credible and has no reason to lie.",
            defenseSentence: "Eyewitness testimony is notoriously unreliable. Our memories can be easily influenced and we can make mistakes. There is no way to know for sure if my client was actually there."
          },
          {
            id: 2,
            description: "The murder weapon was found in the suspect's possession",
            prosecutionSentence: "The murder weapon was found in the suspect's possession. There is no doubt that they used it to commit the murder.",
            defenseSentence: "The murder weapon could have been planted on my client. We need to investigate how it got there and who put it there."
          },
          {
            id: 3,
            description: "Footprints at the crime scene match the suspect's shoes",
            prosecutionSentence: "The footprints we found at the crime scene match the suspect's shoes. This is strong evidence that they were there at the time of the murder.",
            defenseSentence: "Footprints can be easily faked or mistaken. There is no way to prove that my client was the one who made those footprints."
          },
          {
            id: 4,
            description: "The suspect's alibi does not hold up under scrutiny",
            prosecutionSentence: "The suspect's alibi does not hold up under scrutiny. We have evidence that contradicts their story and places them at the scene of the crime.",
            defenseSentence: "My client's alibi may be flawed, but that does not mean they committed the murder. We need to consider other possibilities and look for more evidence."
          },
          {
            id: 5,
            description: "DNA found at the crime scene matches the defendant's DNA profile",
            prosecutionSentence: "The DNA evidence clearly links the defendant to the crime scene.",
            defenseSentence: "The DNA evidence could have been contaminated or misinterpreted."
          },
          {
            id: 6,
            description: "Fingerprints found on the murder weapon match the defendant's fingerprints",
            prosecutionSentence: "The fingerprint evidence conclusively proves that the defendant handled the murder weapon.",
            defenseSentence: "The defendant's fingerprints may have been left on the weapon innocently, without any involvement in the crime."
          },
          {
            id: 7,
            description: "Witnesses saw the defendant arguing with the victim before the murder",
            prosecutionSentence: "Eyewitness testimony places the defendant at the scene of the crime and indicates motive.",
            defenseSentence: "Eyewitness testimony can be unreliable and subject to bias or error."
          },
          {
            id: 8,
            description: "Evidence of prior violent behavior by the defendant towards the victim",
            prosecutionSentence: "The defendant's history of violence towards the victim shows a clear motive for the murder.",
            defenseSentence: "The defendant's prior behavior may not be relevant to the current charges and could be misinterpreted."
          },
          {
            id: 9,
            description: "The defendant's alibi has been proven to be false",
            prosecutionSentence: "The defendant lied about their whereabouts at the time of the murder, indicating guilt.",
            defenseSentence: "The defendant may have simply been mistaken about their location and had no involvement in the crime."
          }
        ],

        theft: [
          {
            id: 0,
            description: "Surveillance footage shows the suspect taking the victim's purse",
            prosecutionSentence: "We have clear video evidence that shows the suspect taking the victim's purse. There is no doubt about his identity.",
            defenseSentence: "The video footage is inconclusive and doesn't clearly show my client taking the purse. It could be someone who looks like him."
          },

          {
            id: 1,
            description: "Fingerprints from the crime scene match the suspect",
            prosecutionSentence: "The fingerprints we found at the crime scene match the suspect's. This is a strong indication of his guilt.",
            defenseSentence: "My client's fingerprints were found at the scene because he was there earlier in the day. It doesn't prove that he committed the theft."
          },

          {
            id: 2,
            description: "The suspect was caught with stolen goods in his possession",
            prosecutionSentence: "The police caught the suspect with stolen goods in his possession. This is clear evidence that he committed the theft.",
            defenseSentence: "My client was in the wrong place at the wrong time. He was given the stolen goods by someone else and didn't know they were stolen."
          },

          {
            id: 3,
            description: "A witness saw the suspect leaving the scene of the crime with the stolen goods",
            prosecutionSentence: "We have a credible witness who saw the suspect leaving the scene of the crime with the stolen goods. There is no doubt about his guilt.",
            defenseSentence: "Eyewitness testimony is notoriously unreliable. Our memories can be easily influenced and we can make mistakes. There is no way to know for sure if my client was actually there."
          },

          {
            id: 4,
            description: "The suspect's DNA was found on the stolen goods",
            prosecutionSentence: "The DNA we found on the stolen goods matches the suspect's. This is clear evidence that he committed the theft.",
            defenseSentence: "My client's DNA could have been transferred to the stolen goods innocently. It doesn't prove that he committed the theft."
          },
          {
            id: 6,
            description: "The suspect's fingerprints were found on the stolen item",
            prosecutionSentence: "Forensic analysis found the suspect's fingerprints on the stolen item, providing irrefutable evidence of their involvement in the crime.",
            defenseSentence: "The presence of my client's fingerprints on the stolen item does not prove their guilt. They may have handled the item innocently before it was stolen."
          },

          {
            id: 7,
            description: "Surveillance footage shows the suspect entering and leaving the building at the time of the theft",
            prosecutionSentence: "We have clear video evidence that places the suspect at the scene of the crime. They are seen entering and leaving the building at the time of the theft.",
            defenseSentence: "The video footage is grainy and inconclusive. It could have been anyone in the video. We cannot say for certain that it was my client."
          },

          {
            id: 8,
            description: "A witness saw the suspect trying to sell the stolen item at a pawn shop",
            prosecutionSentence: "A witness saw the suspect trying to sell the stolen item at a pawn shop. This is clear evidence of their guilt.",
            defenseSentence: "The witness may have been mistaken or could have been lying. We cannot rely solely on their testimony to prove my client's guilt."
          },

          {
            id: 9,
            description: "The suspect's DNA was found on a piece of clothing left at the crime scene",
            prosecutionSentence: "DNA analysis found the suspect's DNA on a piece of clothing left at the crime scene, providing strong evidence of their involvement in the crime.",
            defenseSentence: "The presence of my client's DNA does not prove their guilt. They may have innocently left the clothing there at an earlier time."
          },

          {
            id: 10,
            description: "A security camera captured the suspect breaking a window to gain entry to the building",
            prosecutionSentence: "We have clear video evidence that shows the suspect breaking a window to gain entry to the building. This is clear evidence of their guilt.",
            defenseSentence: "The video footage is inconclusive and may not show my client breaking the window. It could have been anyone in the video."
          },
          {
            id: 11,
            description: "Fingerprints matching the suspect were found at the scene of the crime",
            prosecutionSentence: "Forensic analysis of the fingerprints found at the scene of the crime conclusively match those of the suspect.",
            defenseSentence: "The presence of fingerprints alone does not prove that my client committed the crime. It is possible that the fingerprints were left there innocently, or that someone else planted them."
          },
          {
            id: 12,
            description: "Security camera footage shows the suspect entering and leaving the building at the time of the theft",
            prosecutionSentence: "We have clear video evidence that shows the suspect entering and leaving the building at the time of the theft.",
            defenseSentence: "The video footage is inconclusive and could have been tampered with. It does not definitively prove that my client committed the theft."
          },
          {
            id: 13,
            description: "Stolen items were found in the suspect's possession at the time of arrest",
            prosecutionSentence: "When the suspect was arrested, stolen items were found in their possession, providing strong evidence of their guilt.",
            defenseSentence: "The presence of stolen items alone does not prove that my client was the one who stole them. It is possible that someone else gave them to my client, or that they were unknowingly in possession of stolen goods."
          },
          {
            id: 14,
            description: "A witness saw the suspect fleeing the scene of the crime with a bag of stolen items",
            prosecutionSentence: "A witness saw the suspect fleeing the scene of the crime with a bag of stolen items, providing clear evidence of their guilt.",
            defenseSentence: "Eyewitness testimony is not always reliable, and memories can be easily influenced. It is possible that the witness misidentified my client, or that they are lying for some other reason."
          },
          {
            id: 15,
            description: "The suspect's DNA was found on the stolen items",
            prosecutionSentence: "DNA analysis conclusively proves that the suspect's DNA was found on the stolen items, providing strong evidence of their guilt.",
            defenseSentence: "The presence of my client's DNA on the stolen items does not definitively prove that they committed the theft. It is possible that the DNA was transferred there innocently, or that someone else planted it."
          }
        ],

        fraud: [
          {
            id: 0,
            description: "The defendant deposited multiple checks from the company into their personal account",
            prosecutionSentence: "We have bank records that show the defendant deposited multiple company checks into their personal account. This is a clear case of embezzlement.",
            defenseSentence: "The defendant was authorized to make deposits for the company and may have accidentally deposited some checks into the wrong account."
          },

          {
            id: 1,
            description: "A witness saw the defendant falsifying documents to inflate profits",
            prosecutionSentence: "We have a credible witness who saw the defendant falsifying documents to make it appear as though the company had higher profits than it actually did. This is fraud.",
            defenseSentence: "The witness is mistaken or lying. The defendant would never engage in such illegal behavior."
          },

          {
            id: 2,
            description: "The defendant created fake invoices for nonexistent services",
            prosecutionSentence: "We have evidence of fake invoices created by the defendant for services that were never provided. This is clear evidence of fraud.",
            defenseSentence: "The invoices were a mistake and the defendant did not intend to deceive anyone."
          },

          {
            id: 3,
            description: "The defendant used a stolen identity to apply for credit cards",
            prosecutionSentence: "We have evidence that the defendant used a stolen identity to apply for credit cards and make fraudulent purchases. This is identity theft and fraud.",
            defenseSentence: "The defendant's identity was stolen by someone else who then committed the fraud."
          },

          {
            id: 4,
            description: "The defendant altered financial records to hide losses",
            prosecutionSentence: "We have evidence that the defendant altered financial records to hide losses and make it appear as though the company was profitable. This is financial fraud.",
            defenseSentence: "The alterations were made to correct errors in the original records, not to deceive anyone."
          },

          {
            id: 5,
            description: "The defendant created fake customer reviews to boost sales",
            prosecutionSentence: "We have evidence that the defendant created fake customer reviews to deceive potential buyers and boost sales. This is false advertising and fraud.",
            defenseSentence: "The reviews were written by real customers who were happy with the defendant's products or services."
          },

          {
            id: 6,
            description: "The defendant made false claims about the effectiveness of a product",
            prosecutionSentence: "We have evidence that the defendant made false claims about the effectiveness of a product to deceive consumers and increase sales. This is false advertising and fraud.",
            defenseSentence: "The claims were based on legitimate scientific studies and the defendant believed them to be true."
          },

          {
            id: 7,
            description: "The defendant created fake insurance claims to collect payouts",
            prosecutionSentence: "We have evidence that the defendant created fake insurance claims to collect payouts for losses that did not occur. This is insurance fraud.",
            defenseSentence: "The claims were legitimate and the losses did occur, but the defendant may have made mistakes in filing the claims."
          },

          {
            id: 8,
            description: "The defendant lied about their income on loan applications",
            prosecutionSentence: "We have evidence that the defendant lied about their income on loan applications to obtain loans they were not qualified for. This is loan fraud.",
            defenseSentence: "The defendant may have made errors in reporting their income, but did not intend to deceive the lender."
          }],

        assault: [
          {
            id: 0,
            description: "The victim sustained severe injuries consistent with an assault",
            prosecutionSentence: "The victim's injuries are consistent with an assault, and the defendant was seen in the vicinity at the time of the attack.",
            defenseSentence: "The victim's injuries could have been sustained in a variety of ways, and there is no conclusive evidence linking my client to the assault."
          },

          {
            id: 1,
            description: "Several witnesses saw the defendant strike the victim",
            prosecutionSentence: "Multiple witnesses saw the defendant hit the victim, and their testimonies are consistent with each other.",
            defenseSentence: "Eyewitness testimony can be unreliable and subject to error. It is possible that the witnesses misinterpreted what they saw or were influenced by outside factors."
          },

          {
            id: 2,
            description: "The victim's DNA was found under the defendant's fingernails",
            prosecutionSentence: "DNA evidence indicates that the defendant was in physical contact with the victim around the time of the assault.",
            defenseSentence: "The DNA evidence does not conclusively prove that my client was the perpetrator of the assault. It is possible that the DNA was transferred innocently or through indirect contact."
          },

          {
            id: 3,
            description: "The defendant was caught on video assaulting the victim",
            prosecutionSentence: "Video evidence clearly shows the defendant physically attacking the victim.",
            defenseSentence: "The video footage may be misleading or taken out of context. It does not necessarily provide the full picture of what happened."
          },

          {
            id: 4,
            description: "The victim had defensive wounds on their arms and hands",
            prosecutionSentence: "The presence of defensive wounds on the victim's arms and hands suggests that they were actively trying to fend off an attack.",
            defenseSentence: "The defensive wounds could have been caused by a variety of circumstances and do not necessarily prove that my client was the aggressor in the situation."
          },

          {
            id: 5,
            description: "The victim's medical records indicate that they suffered a concussion and fractured jaw as a result of the assault",
            prosecutionSentence: "The victim's medical records provide strong evidence that they were physically assaulted and suffered serious injuries as a result.",
            defenseSentence: "The victim's injuries could have been caused by a variety of circumstances, and there is no conclusive evidence linking my client to the assault."
          },

          {
            id: 6,
            description: "A witness saw the defendant threaten the victim with violence prior to the assault",
            prosecutionSentence: "The witness's testimony indicates that the defendant had a clear motive to assault the victim and acted on that motive.",
            defenseSentence: "The witness's testimony may be unreliable and subject to error. It is possible that they misinterpreted what they saw or were influenced by outside factors."
          },
          {
            id: 7,
            description: "The defendant's fingerprints were found on the victim's clothing",
            prosecutionSentence: "The presence of the defendant's fingerprints on the victim's clothing strongly suggests that they were in close physical contact at the time of the assault.",
            defenseSentence: "The defendant's fingerprints may have been innocently transferred to the victim's clothing and do not necessarily prove that they were responsible for the assault."
          },
          {
            id: 8,
            description: "The victim suffered a broken nose and fractured jaw in the assault",
            prosecutionSentence: "The victim's injuries are consistent with a brutal assault, and we have witness testimony placing the defendant at the scene of the crime.",
            defenseSentence: "The victim's injuries could have been sustained in other ways, and there is no conclusive evidence linking my client to the assault."
          },

          {
            id: 9,
            description: "The victim was found unconscious and badly beaten in an alleyway",
            prosecutionSentence: "The victim's injuries are consistent with a violent assault, and we have witness testimony placing the defendant at the scene of the crime.",
            defenseSentence: "There is no conclusive evidence linking my client to the assault, and it is possible that the victim was attacked by someone else."
          },

          {
            id: 10,
            description: "The victim was punched in the face and suffered a black eye in the assault",
            prosecutionSentence: "The victim's injuries are consistent with a physical assault, and we have witness testimony placing the defendant at the scene of the crime.",
            defenseSentence: "My client did not assault the victim, and there is no conclusive evidence proving otherwise."
          },

          {
            id: 11,
            description: "The victim was beaten with a baseball bat in the assault",
            prosecutionSentence: "The victim's injuries are consistent with a vicious assault, and we have DNA evidence linking the defendant to the crime.",
            defenseSentence: "My client did not assault the victim, and the DNA evidence could have been planted or contaminated."
          }
        ]
      }

      function generateSentences(min, max, fineVariant, text) {
        const result = [];

        const numbers = [];

        if (!fineVariant) {
          for (let j = 0; j < 3; j++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
          }
        } else {
          for (let j = 0; j < 3; j++) {
            numbers.push(Math.floor(Math.random() * 50000));
          }
        }

        numbers.sort((a, b) => a - b);

        if (!fineVariant && text === "prison") {
          result.push({
            text: "Select a prison time",
            value: null
          });
          result.push({
            text: "No prison time",
            value: `${numbers[1]} years`
          });
          result.push({
            text: `${numbers[0]} years`,
            value: `${numbers[0]} years`
          });
          result.push({
            text: `${numbers[1]} years`,
            value: `${numbers[1]} years`
          });
          result.push({
            text: `${numbers[2]} years`,
            value: `${numbers[2]} years`
          });
        } else if (!fineVariant && text === "probation") {
          result.push({
            text: "Select a probation duration",
            value: null
          });
          result.push({
            text: `${numbers[1]} years`,
            value: `${numbers[1]} years`
          });
          result.push({
            text: "No probation time",
            value: "0"
          });
          result.push({
            text: `${numbers[1]} years`,
            value: `${numbers[1]} years`
          });
          result.push({
            text: `${numbers[2]} years`,
            value: `${numbers[2]} years`
          });
        } else {
          result.push({
            text: "Select a fine",
            value: null
          });
          result.push({
            text: "No fine",
            value: "0"
          });
          result.push({
            text: `${numbers[0]}$`,
            value: `${numbers[0]}$`
          });
          result.push({
            text: `${numbers[1]}$`,
            value: `${numbers[1]}$`
          });
          result.push({
            text: `${numbers[2]}$`,
            value: `${numbers[2]}$`
          });
        }

        return result;
      }


      // Define logic for generating cases
      function generateCase(type) {
        const caseObj = {
          'type': type,
          suspect: {
            name: generateName(),
            age: `${Math.floor(Math.random() * 41) + 20}`

          }
        };

        caseProperties[type].forEach(prop => {
          if (randomizationParams[prop]) {
            caseObj[prop] = randomizationParams[prop][Math.floor(Math.random() * randomizationParams[prop].length)];
            if (caseObj.charge === "murder") {
              caseObj["description"] = descriptions.murder[Math.floor(Math.random() * descriptions.murder.length)].description;
              caseObj["evidences"] = evidences.murder.slice(0, Math.floor(Math.random() * evidences.murder.length));
              caseObj["prisonSentences"] = generateSentences(5, 20, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);

            } else if (caseObj.charge === "theft") {
              caseObj["description"] = descriptions.theft[Math.floor(Math.random() * descriptions.theft.length)].description;
              caseObj["evidences"] = evidences.theft.slice(0, Math.floor(Math.random() * evidences.theft.length));
              caseObj["prisonSentences"] = generateSentences(1, 10, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 20000, true);
            } else if (caseObj.charge === "fraud") {
              caseObj["description"] = descriptions.fraud[Math.floor(Math.random() * descriptions.fraud.length)].description;
              caseObj["evidences"] = evidences.fraud.slice(0, Math.floor(Math.random() * evidences.fraud.length));
              caseObj["prisonSentences"] = generateSentences(1, 10, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(5000, 100000, true);
            } else if (caseObj.charge === "assault") {
              caseObj["description"] = descriptions.assault[Math.floor(Math.random() * descriptions.assault.length)].description;
              caseObj["evidences"] = evidences.assault.slice(0, Math.floor(Math.random() * evidences.assault.length));
              caseObj["prisonSentences"] = generateSentences(1, 8, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);
            }
          } else {
            caseObj[prop] = '';
          }
        });

        return caseObj;
      }

      for (let i = 0; i < 5; i++) {
        let generatedCase = generateCase(caseTypes[Math.floor(Math.random() * caseTypes.length)]);
        console.log(generatedCase);
        this.addGeneratedCase(generatedCase);
      }

    }
  }
}
</script>