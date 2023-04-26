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
              caseObj["evidences"] = evidences.murder[Math.floor(Math.random() * descriptions.murder.length)].description;
              caseObj["prisonSentences"] = generateSentences(5, 20, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);

            } else if (caseObj.charge === "theft") {
              caseObj["description"] = descriptions.murder[Math.floor(Math.random() * descriptions.murder.length)].description;
              caseObj["evidences"] = evidences.theft[Math.floor(Math.random() * descriptions.theft.length)].description;
              caseObj["prisonSentences"] = generateSentences(1, 10, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 20000, true);
            } else if (caseObj.charge === "fraud") {
              /*caseObj["description"] = descriptions.murder[Math.floor(Math.random() * descriptions.length)].description;*/
              caseObj["prisonSentences"] = generateSentences(1, 10, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(5000, 100000, true);
            } else if (caseObj.charge === "assault") {
              /*caseObj["description"] = descriptions.murder[Math.floor(Math.random() * descriptions.length)].description;*/
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

      for (let i = 0; i < 2; i++) {
        let generatedCase = generateCase(caseTypes[Math.floor(Math.random() * caseTypes.length)]);
        console.log(generatedCase);
        this.addGeneratedCase(generatedCase);
      }

    }
  }
}
</script>