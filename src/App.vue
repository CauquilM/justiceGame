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
        const firstName = [
          "Emma",
          "Noah",
          "Ava",
          "Liam",
          "Olivia",
          "William",
          "Sophia",
          "Mason",
          "Isabella",
          "James",
          "Mia",
          "Benjamin",
          "Charlotte",
          "Jacob",
          "Amelia",
          "Michael",
          "Harper",
          "Elijah",
          "Evelyn",
          "Ethan",
          "Abigail",
          "Alexander",
          "Emily",
          "Daniel",
          "Elizabeth",
          "Matthew",
          "Mila",
          "Aiden",
          "Ella",
          "Henry",
          "Avery",
          "Joseph",
          "Sofia",
          "Jackson",
          "Camila",
          "Samuel",
          "Scarlett",
          "Sebastian",
          "Victoria",
          "David",
          "Luna",
          "Carter",
          "Chloe",
          "Luke",
          "Penelope",
          "Owen",
          "Grace",
          "Wyatt",
          "Lily",
          "Nathan",
          "Hannah"
        ];


        const lastName = [
          "Lopez",
          "Adams",
          "Perry",
          "Henderson",
          "Foster",
          "Harrison",
          "Stewart",
          "Ramirez",
          "Graham",
          "Flores",
          "Ramos",
          "Wright",
          "Sullivan",
          "Parker",
          "Cox",
          "Murray",
          "Morales",
          "Bryant",
          "Hunt",
          "Rose",
          "Riley",
          "Gonzalez",
          "Jordan",
          "Bishop",
          "Wheeler",
          "Marshall",
          "Hayes",
          "Douglas",
          "Griffin",
          "Harper",
          "Lawson",
          "Barrett",
          "Hawkins",
          "Banks",
          "Franklin",
          "Moreno",
          "Hudson",
          "McGuire",
          "Gutierrez",
          "Clarke",
          "Vargas",
          "Baker",
          "Gibson",
          "Warren",
          "Austin",
          "Waters",
          "Stone",
          "Mcdonald",
          "Rocha",
          "Santos"];

        const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
        const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];

        return `${randomFirstName} ${randomLastName}`;
      }


      // Define case types
      const caseTypes = [/*'Criminal', 'Road', 'Prison', */'Traffic'];

      // Define case properties for each type
      const caseProperties = {
        Criminal: ['criminalCharge'],
        Road: ['roadCharge'],
        Prison: ['prisonCharge'],
        Traffic: ['trafficCharge']
      };


      // Define randomization parameters
      const randomizationParams = {
        'type': "",
        'criminalCharge': ['murder', 'theft', 'fraud', 'assault'],
        'roadCharge': ['dui', 'recklessDriving', 'drivingNoLicense'],
        'prisonCharge': ['fight'],
        'trafficCharge': ['traffic']
        /*'witnesses': ['eye witness', 'expert witness', 'character witness']*/
      };

      const descriptions = {
        /******* Criminal *******/
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
        ],

        /******* Road *******/
        dui: [
          {
            id: 0,
            description: "The defendant was pulled over for driving erratically and was found to have a blood alcohol level above the legal limit."
          },
          {
            id: 1,
            description: "A witness reported seeing the defendant swerving on the road and almost causing an accident."
          },
          {
            id: 2,
            description: "The defendant failed a sobriety test and was subsequently arrested for driving under the influence."
          },
          {
            id: 3,
            description: "The defendant had a strong smell of alcohol on their breath and slurred speech when speaking to the arresting officer."
          },
          {
            id: 4,
            description: "The defendant was caught on video running a red light and almost hitting another vehicle."
          },
          {
            id: 5,
            description: "The defendant's blood alcohol level was twice the legal limit at the time of the arrest."
          },
          {
            id: 6,
            description: "The defendant was found passed out behind the wheel of their car at a red light."
          },
          {
            id: 7,
            description: "The defendant had an open container of alcohol in the car at the time of the arrest."
          },
          {
            id: 8,
            description: "The defendant admitted to drinking multiple alcoholic beverages before getting behind the wheel of their car."
          },
          {
            id: 9,
            description: "The defendant was seen stumbling and having difficulty maintaining their balance before getting into the car."
          },
          {
            id: 10,
            description: "The defendant was driving on the wrong side of the road and almost caused a head-on collision."
          },
          {
            id: 11,
            description: "The defendant was seen driving at an excessive speed and almost lost control of their vehicle."
          },
          {
            id: 12,
            description: "The defendant had bloodshot and watery eyes at the time of the arrest."
          },
          {
            id: 13,
            description: "The defendant failed to stop at a stop sign and almost caused an accident with another vehicle."
          },
          {
            id: 14,
            description: "The defendant was driving on a suspended license at the time of the arrest."
          }
        ],
        recklessDriving: [
          {
            id: 0,
            description: "The defendant was driving at an excessive speed and failed to stop at a red light, causing a collision with another vehicle."
          },
          {
            id: 1,
            description: "The defendant was weaving in and out of traffic, driving erratically and causing other drivers to swerve to avoid a collision."
          },
          {
            id: 2,
            description: "The defendant was driving under the influence of drugs and/or alcohol, swerving across lanes and putting other drivers at risk."
          },
          {
            id: 3,
            description: "The defendant was driving aggressively, tailgating and cutting off other drivers, causing them to brake suddenly."
          },
          {
            id: 4,
            description: "The defendant was driving on the wrong side of the road, narrowly avoiding several head-on collisions."
          },
          {
            id: 5,
            description: "The defendant was driving distracted, texting on their phone and failing to notice stop signs and other vehicles."
          },
          {
            id: 6,
            description: "The defendant was racing another vehicle on a public road, endangering the lives of other drivers and pedestrians."
          },
          {
            id: 7,
            description: "The defendant was driving a vehicle that was not roadworthy, with bald tires and faulty brakes, putting themselves and others in danger."
          },
          {
            id: 8,
            description: "The defendant was driving a commercial vehicle without the proper license or training, causing them to lose control and crash."
          },
          {
            id: 9,
            description: "The defendant was driving in a construction zone at high speeds, ignoring warning signs and narrowly missing workers."
          },
          {
            id: 10,
            description: "The defendant was driving in a school zone at high speeds, failing to yield to pedestrians and nearly hitting several children."
          },
          {
            id: 11,
            description: "The defendant was driving a stolen vehicle, evading police and causing a high-speed chase that endangered other drivers."
          },
          {
            id: 12,
            description: "The defendant was driving a vehicle with heavily tinted windows, making it difficult for other drivers to see them and causing several near-misses."
          },
          {
            id: 13,
            description: "The defendant was driving while fatigued, swerving across lanes and nearly causing several accidents."
          },
          {
            id: 14,
            description: "The defendant was driving a motorcycle at high speeds, weaving in and out of traffic and putting themselves and other drivers at risk."
          }
        ],
        drivingNoLicense: [
          {
            id: 0,
            description: "Driver stopped for speeding found to be driving without a license"
          },
          {
            id: 1,
            description: "Police pull over driver who was driving without a valid license"
          },
          {
            id: 2,
            description: "Driver involved in an accident was found to be driving without a license"
          },
          {
            id: 3,
            description: "Police officer stopped driver who had a suspended license"
          },
          {
            id: 4,
            description: "Driver pulled over for making an illegal turn found to be driving without a license"
          },
          {
            id: 5,
            description: "Driver stopped for running a red light found to be driving without a license"
          },
          {
            id: 6,
            description: "Driver pulled over for not wearing seat belt found to be driving without a license"
          },
          {
            id: 7,
            description: "Driver found to be driving without a license after failing to produce one during a traffic stop"
          },
          {
            id: 8,
            description: "Police officer stopped driver who had an expired license"
          },
          {
            id: 9,
            description: "Driver pulled over for using a cellphone while driving found to be driving without a license"
          },
          {
            id: 10,
            description: "Driver involved in a hit-and-run was found to be driving without a license"
          },
          {
            id: 11,
            description: "Driver stopped for not having working taillights found to be driving without a license"
          },
          {
            id: 12,
            description: "Driver found to be driving without a license during a routine license check"
          },
          {
            id: 13,
            description: "Driver pulled over for not yielding to pedestrians found to be driving without a license"
          },
          {
            id: 14,
            description: "Police officer stopped driver who had a revoked license"
          }
        ],

        /******* Traffic *******/
        traffic: [
          {
            id: 0,
            description: "The defendant was caught on camera running a red light at a busy intersection.",
          },
          {
            id: 1,
            description: "The defendant was pulled over for driving at an excessive speed on the highway.",
          },
          {
            id: 2,
            description: "The defendant was observed by a police officer driving recklessly and swerving between lanes.",
          },
          {
            id: 3,
            description: "The defendant failed to yield to a pedestrian at a crosswalk and was issued a citation by a police officer.",
          },
          {
            id: 4,
            description: "The defendant was caught on camera illegally passing another vehicle on a double yellow line.",
          },
          {
            id: 5,
            description: "The defendant's vehicle was found to have faulty brakes after a routine inspection by a traffic officer.",
          },

          {
            id: 6,
            description: "The defendant was caught on camera driving on the wrong side of the road.",
          },

          {
            id: 7,
            description: "The defendant was pulled over for driving with an expired license.",
          },

          {
            id: 8,
            description: "The defendant was observed by a police officer texting while driving.",
          },

          {
            id: 9,
            description: "The defendant was caught on camera running a stop sign at an intersection.",
          },

          {
            id: 10,
            description: "The defendant was pulled over for driving with a broken taillight.",
          },
          {
            id: 11,
            description: "The defendant was pulled over for driving with expired license plates.",
          },
          {
            id: 12,
            description: "The defendant was observed by a police officer driving while using their cellphone.",
          },
          {
            id: 13,
            description: "The defendant failed to come to a complete stop at a railroad crossing while a train was passing.",
          },
          {
            id: 14,
            description: "The defendant was caught on camera driving in the carpool lane without a passenger.",
          },
          {
            id: 15,
            description: "The defendant was observed by a police officer driving with a broken taillight.",
          },
          {
            id: 16,
            description: "The defendant was caught on camera making an illegal U-turn on a busy street.",
          }
        ],

        /******* Prison *******/
        fight: [
          {
            id: 0,
            description: "Two inmates engaged in a violent altercation in the prison yard."
          },
          {
            id: 1,
            description: "A prison guard was injured while trying to break up a fight between two inmates."
          },
          {
            id: 2,
            description: "Multiple inmates were involved in a brawl in the cafeteria during mealtime."
          },
          {
            id: 3,
            description: "A fight broke out in the exercise yard and several inmates sustained injuries."
          },
          {
            id: 4,
            description: "Two inmates were caught on camera fighting in their cell."
          },
          {
            id: 5,
            description: "A group of inmates attacked a fellow prisoner in the shower area."
          },
          {
            id: 6,
            description: "An inmate was severely beaten by a gang in their cell block."
          },
          {
            id: 7,
            description: "A fight between two inmates in the prison library led to a lockdown of the facility."
          },
          {
            id: 8,
            description: "A riot broke out in the prison yard and multiple inmates were injured."
          },
          {
            id: 9,
            description: "An inmate was hospitalized after being assaulted by another prisoner in the mess hall."
          },
          {
            id: 10,
            description: "Several inmates were involved in a physical altercation in the prison chapel."
          },
          {
            id: 11,
            description: "A fight between rival gangs in the prison yard resulted in several injuries and property damage."
          },
          {
            id: 12,
            description: "A prison guard was attacked by multiple inmates during a routine cell search."
          },
          {
            id: 13,
            description: "An inmate was killed in a fight with another prisoner in their cell."
          },
          {
            id: 14,
            description: "A gang of inmates staged a violent takeover of a cell block, injuring several prisoners and guards."
          }
        ]
      };

      const evidences = {
        /******* Criminal *******/
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
        ],

        /******* Road *******/
        dui: [
          {
            id: 0,
            description: "The defendant had a blood alcohol content (BAC) level of 0.15%, which is almost twice the legal limit.",
            prosecutionSentence: "The defendant was clearly under the influence of alcohol while driving, as evidenced by their high BAC level.",
            defenseSentence: "The BAC test may have been faulty or contaminated, leading to inaccurate results."
          },
          {
            id: 1,
            description: "The defendant was swerving on the road and almost hit several other cars.",
            prosecutionSentence: "Eyewitnesses reported seeing the defendant driving erratically and endangering other drivers on the road.",
            defenseSentence: "The defendant may have been swerving to avoid an obstacle on the road or to adjust their GPS."
          },
          {
            id: 2,
            description: "The defendant failed the field sobriety test, which includes tasks like walking in a straight line and standing on one leg.",
            prosecutionSentence: "The defendant's failure to complete the field sobriety test indicates that they were impaired and unable to perform basic physical tasks.",
            defenseSentence: "The field sobriety test may not be a reliable indicator of impairment, as it can be affected by external factors like weather conditions."
          },
          {
            id: 3,
            description: "The defendant had an open container of alcohol in their car.",
            prosecutionSentence: "The presence of an open container of alcohol in the defendant's car indicates that they were drinking while driving.",
            defenseSentence: "The defendant may have forgotten to dispose of the container from a previous occasion when they were not driving."
          },
          {
            id: 4,
            description: "The defendant smelled strongly of alcohol and had bloodshot eyes.",
            prosecutionSentence: "The defendant's physical appearance indicates that they were under the influence of alcohol while driving.",
            defenseSentence: "The defendant may have been experiencing symptoms of a medical condition, leading to their physical appearance."
          },
          {
            id: 5,
            description: "The defendant was slurring their words and had difficulty speaking.",
            prosecutionSentence: "The defendant's speech impairment suggests that they were impaired and unable to speak clearly.",
            defenseSentence: "The defendant may have a speech impediment or be experiencing a medical condition that affects their speech."
          },
          {
            id: 6,
            description: "The defendant had a history of DUI convictions and had their license suspended multiple times.",
            prosecutionSentence: "The defendant's history of DUI convictions indicates a pattern of reckless behavior and disregard for the law.",
            defenseSentence: "The defendant's past convictions should not be taken into account for the current case, as it is not relevant to the present offense."
          },
          {
            id: 7,
            description: "The defendant was driving on the wrong side of the road and almost collided with oncoming traffic.",
            prosecutionSentence: "The defendant's reckless driving behavior could have resulted in a serious accident and put other drivers at risk.",
            defenseSentence: "The defendant may have been confused by the road signage or had a medical emergency while driving."
          },
          {
            id: 8,
            description: "The defendant refused to take a breathalyzer or BAC test, which is an automatic license suspension in this state.",
            prosecutionSentence: "The defendant's refusal to take the test is a clear indication of guilt and attempts to conceal their impairment.",
            defenseSentence: "The defendant may have refused the test due to a misunderstanding or concerns about its accuracy."
          },
          {
            id: 9,
            description: "The defendant was pulled over and failed a field sobriety test.",
            prosecutionSentence: "The arresting officer observed slurred speech, the smell of alcohol on the defendant's breath, and erratic driving behavior prior to the stop.",
            defenseSentence: "The defendant had consumed alcohol earlier, but was not over the legal limit while driving. The arresting officer did not follow proper procedures during the field sobriety test."
          },
          {
            id: 10,
            description: "The defendant's blood alcohol content was measured at .09%, just over the legal limit.",
            prosecutionSentence: "The BAC test results indicate that the defendant was driving while intoxicated.",
            defenseSentence: "The BAC test results may not be accurate due to the equipment used or the timing of the test. The defendant was not exhibiting signs of impairment at the time of the stop."
          },
          {
            id: 11,
            description: "The defendant caused a car accident while driving under the influence.",
            prosecutionSentence: "Eyewitnesses saw the defendant driving erratically and crossing the center line prior to the accident. The defendant's BAC was measured at .10% after the crash.",
            defenseSentence: "The defendant was not under the influence at the time of the accident. The eyewitness accounts may be unreliable and the BAC test results may have been affected by other factors."
          },
          {
            id: 12,
            description: "The defendant refused to take a BAC test at the scene of the arrest.",
            prosecutionSentence: "Refusing to take a BAC test is a violation of the law and implies that the defendant was aware of being under the influence.",
            defenseSentence: "The defendant had a right to refuse the BAC test and did not want to provide potentially inaccurate results. The refusal alone does not prove guilt."
          },
          {
            id: 13,
            description: "The defendant was found sleeping in their car with the engine running and the headlights on.",
            prosecutionSentence: "The defendant was in control of a vehicle while under the influence of alcohol, as evidenced by the smell of alcohol on their breath and slurred speech.",
            defenseSentence: "The defendant was not driving at the time of the stop and was only sleeping in the car. The car was parked legally and the defendant was not in violation of any laws."
          },
          {
            id: 14,
            description: "The defendant was involved in a hit-and-run accident and later found to be driving under the influence.",
            prosecutionSentence: "The defendant fled the scene of the accident and was later found to be intoxicated. This behavior indicates guilt and a disregard for the law.",
            defenseSentence: "The defendant was not aware of the accident and did not flee intentionally. The intoxication did not cause the accident and may have occurred after the collision."
          }

        ],
        recklessDriving: [
          {
            id: 0,
            description: "The defendant was observed driving at an excessive speed, swerving in and out of traffic lanes and running a red light",
            prosecutionSentence: "We have video evidence of the defendant's reckless driving behavior captured by the traffic cameras and witnessed by multiple officers.",
            defenseSentence: "My client admits to driving fast but denies driving recklessly. The video footage could be misleading due to camera angles and other factors."
          },
          {
            id: 1,
            description: "The defendant caused a multiple-car collision on the highway while driving under the influence of drugs",
            prosecutionSentence: "We have a toxicology report indicating that the defendant had drugs in their system at the time of the accident. Eyewitnesses also saw the defendant driving erratically before the collision.",
            defenseSentence: "My client denies driving under the influence and claims that the accident was caused by the other driver's negligence. We have evidence to support our argument."
          },
          {
            id: 2,
            description: "The defendant was speeding on a residential street and hit a pedestrian who was crossing the road",
            prosecutionSentence: "We have witnesses who saw the defendant speeding and hitting the pedestrian. The defendant also failed a sobriety test administered by the police.",
            defenseSentence: "My client admits to hitting the pedestrian but denies speeding. The sobriety test results could be inaccurate due to other factors, and we have evidence to support our argument."
          },
          {
            id: 3,
            description: "The defendant was racing with another vehicle on the highway and caused a single-car accident",
            prosecutionSentence: "We have video evidence showing the defendant's car racing with another vehicle before the accident. The defendant's car was also found to have modifications that are illegal on public roads.",
            defenseSentence: "My client denies racing and claims that the accident was caused by a mechanical failure in the car. We have evidence to support our argument."
          },
          {
            id: 4,
            description: "The defendant was driving at high speed on a wet road and lost control of the vehicle, causing a collision",
            prosecutionSentence: "We have eyewitnesses who saw the defendant driving at an excessive speed and losing control of the vehicle. The police report also indicates that the road was wet at the time of the accident.",
            defenseSentence: "My client admits to losing control of the vehicle but denies driving at high speed. The road conditions were not favorable, and we have evidence to support our argument."
          },
          {
            id: 5,
            description: "The defendant was driving under the influence of alcohol and collided with a parked car",
            prosecutionSentence: "We have a breathalyzer test result indicating that the defendant had a blood alcohol content (BAC) level above the legal limit at the time of the accident. The defendant also admitted to drinking before driving.",
            defenseSentence: "My client admits to drinking before driving but denies driving under the influence. The breathalyzer test results could be inaccurate due to other factors, and we have evidence to support our argument."
          },
          {
            id: 6,
            description: "The defendant was driving a stolen vehicle and caused a hit-and-run accident",
            prosecutionSentence: "We have surveillance footage showing the defendant stealing the vehicle. We also have eyewitnesses who saw the defendant driving the stolen vehicle and fleeing the scene of the accident.",
            defenseSentence: "My client denies stealing the vehicle and claims that they found it abandoned. The eyewitnesses could be mistaken, and we have evidence to support our argument."
          },
          {
            id: 7,
            description: "The defendant was driving at an excessive speed on a residential street.",
            prosecutionSentence: "We have witness statements that the defendant was driving recklessly, swerving between lanes and almost hitting pedestrians.",
            defenseSentence: "My client was driving within the speed limit and was not swerving. The witnesses may have mistaken my client's car for another car that was driving recklessly."
          },
          {
            id: 8,
            description: "The defendant ran a red light and caused a collision with another vehicle.",
            prosecutionSentence: "We have CCTV footage that clearly shows the defendant running the red light and colliding with another vehicle.",
            defenseSentence: "My client did not see the red light and did not intentionally run it. The collision may have been caused by the other vehicle's driver also driving recklessly."
          },
          {
            id: 9,
            description: "The defendant was driving under the influence of drugs and caused a collision.",
            prosecutionSentence: "We have a blood test that shows the presence of drugs in the defendant's system at the time of the collision.",
            defenseSentence: "My client was not under the influence of drugs and the blood test may have been contaminated or inaccurate."
          },
          {
            id: 10,
            description: "The defendant was racing another vehicle on a public road and caused a collision.",
            prosecutionSentence: "We have witness statements and CCTV footage that show the defendant racing another vehicle and causing the collision.",
            defenseSentence: "My client was not racing and was driving at a safe speed. The other vehicle may have been driving recklessly and caused the collision."
          },
          {
            id: 11,
            description: "The defendant was driving a stolen vehicle and caused a collision.",
            prosecutionSentence: "We have evidence that the vehicle was stolen and the defendant did not have permission to drive it. The collision was a result of the defendant's reckless driving.",
            defenseSentence: "My client did not know the vehicle was stolen and was not driving recklessly. The collision may have been caused by the other driver's actions."
          },
          {
            id: 12,
            description: "The defendant was driving while distracted and caused a collision.",
            prosecutionSentence: "We have witness statements that the defendant was using their phone while driving and caused the collision.",
            defenseSentence: "My client was not using their phone while driving and was not distracted. The collision may have been caused by the other driver's actions."
          },
          {
            id: 13,
            description: "The defendant was driving in the wrong lane and caused a head-on collision with another vehicle.",
            prosecutionSentence: "We have CCTV footage that shows the defendant driving in the wrong lane and causing the collision.",
            defenseSentence: "My client was not driving in the wrong lane and did not cause the collision. The other driver may have been driving recklessly."
          },
          {
            id: 14,
            description: "The defendant was driving at night without headlights and caused a collision with another vehicle.",
            prosecutionSentence: "We have witness statements that the defendant was driving without headlights and caused the collision.",
            defenseSentence: "My client had their headlights on and was not driving recklessly. The collision may have been caused by the other driver's actions."
          }
        ],
        drivingNoLicense: [
          {
            id: 0,
            description: "The defendant was driving a vehicle without a valid driver's license.",
            prosecutionSentence: "We have clear evidence that the defendant was driving a vehicle without a valid driver's license.",
            defenseSentence: "There may have been an issue with my client's license, but they were not aware of it and did not intentionally drive without a license."
          },
          {
            id: 1,
            description: "The defendant was pulled over for a traffic violation and was found to have no driver's license.",
            prosecutionSentence: "We have clear evidence that the defendant was pulled over for a traffic violation and was found to have no driver's license.",
            defenseSentence: "While my client may not have had their driver's license on them at the time of the traffic stop, they do have a valid license and were not intentionally driving without one."
          },
          {
            id: 2,
            description: "The defendant had their driver's license suspended or revoked at the time they were pulled over.",
            prosecutionSentence: "We have clear evidence that the defendant had their driver's license suspended or revoked at the time they were pulled over.",
            defenseSentence: "While my client's license may have been suspended or revoked, they were not aware of it and did not intentionally drive without a license."
          },
          {
            id: 3,
            description: "The defendant had previously been convicted of driving without a license.",
            prosecutionSentence: "We have clear evidence that the defendant had previously been convicted of driving without a license.",
            defenseSentence: "While my client may have a prior conviction for driving without a license, they had since obtained a valid license and were not intentionally driving without one at the time of the alleged offense."
          },
          {
            id: 4,
            description: "The defendant was driving a commercial vehicle without the proper license or certification.",
            prosecutionSentence: "We have clear evidence that the defendant was driving a commercial vehicle without the proper license or certification.",
            defenseSentence: "My client may not have had the proper license or certification at the time of the alleged offense, but they were not aware of this and did not intentionally drive without the proper license or certification."
          },
          {
            id: 5,
            description: "The defendant was involved in an accident while driving without a license.",
            prosecutionSentence: "We have clear evidence that the defendant was involved in an accident while driving without a license.",
            defenseSentence: "While my client may not have had a valid license at the time of the accident, they were not at fault for the accident and did not intentionally drive without a license."
          },
          {
            id: 6,
            description: "The defendant was caught driving without a license during a routine traffic stop.",
            prosecutionSentence: "We have clear evidence that the defendant was caught driving without a license during a routine traffic stop.",
            defenseSentence: "While my client may not have had their license on them at the time of the traffic stop, they do have a valid license and were not intentionally driving without one."
          },
          {
            id: 7,
            description: "The defendant had never obtained a driver's license.",
            prosecutionSentence: "We have clear evidence that the defendant had never obtained a driver's license.",
            defenseSentence: "While my client may not have had a driver's license at the time of the alleged offense, they were not aware that they needed one and did not intentionally drive without a license."
          },
          {
            id: 8,
            description: "The defendant was pulled over for a routine traffic stop and was unable to provide a valid driver's license to the officer.",
            prosecutionSentence: "We have evidence that the defendant has never held a valid driver's license and was aware of this fact when they got behind the wheel.",
            defenseSentence: "My client was not aware that their license had been revoked and believed it was still valid at the time of the traffic stop."
          },
          {
            id: 9,
            description: "The defendant was involved in a hit-and-run accident and fled the scene before the police arrived.",
            prosecutionSentence: "We have evidence that the defendant was driving without a valid license at the time of the hit-and-run and knowingly left the scene of the accident.",
            defenseSentence: "My client did not realize they had hit another vehicle and left the scene out of panic. They were unaware their license was invalid."
          },
          {
            id: 10,
            description: "The defendant was caught driving a company vehicle without a valid driver's license.",
            prosecutionSentence: "We have evidence that the defendant was aware they did not have a valid license, yet still chose to operate a company vehicle, putting both themselves and others at risk.",
            defenseSentence: "My client was not aware that their license had been revoked and believed they were authorized to operate the company vehicle."
          },
          {
            id: 11,
            description: "The defendant was stopped at a DUI checkpoint and was unable to provide a valid driver's license to the officer.",
            prosecutionSentence: "We have evidence that the defendant did not have a valid driver's license at the time of the DUI checkpoint and knowingly drove under the influence.",
            defenseSentence: "My client was not aware that their license had been revoked and believed it was still valid at the time of the DUI checkpoint."
          },
          {
            id: 12,
            description: "The defendant was involved in a car accident and was unable to provide a valid driver's license to the responding officer.",
            prosecutionSentence: "We have evidence that the defendant was driving without a valid license and was at fault for the accident. They attempted to flee the scene but were apprehended shortly after.",
            defenseSentence: "My client was not aware that their license had been revoked and attempted to flee the scene out of fear."
          },
          {
            id: 13,
            description: "The defendant was pulled over for speeding and was unable to provide a valid driver's license to the officer.",
            prosecutionSentence: "We have evidence that the defendant was driving without a valid license and knowingly broke the law by exceeding the speed limit.",
            defenseSentence: "My client was not aware that their license had been revoked and did not realize they were speeding at the time of the traffic stop."
          },
          {
            id: 14,
            description: "The defendant was caught driving a rental car without a valid driver's license.",
            prosecutionSentence: "We have evidence that the defendant was aware they did not have a valid license, yet still chose to operate a rental car, putting both themselves and others at risk.",
            defenseSentence: "My client was not aware that their license had been revoked and believed they were authorized to operate the rental car."
          }
        ],

        /******* Traffic *******/
        traffic: [
          {
            id: 0,
            description: "The defendant was caught on camera running a red light at a busy intersection.",
            prosecutionSentence: "The footage from the camera shows the defendant's vehicle clearly entering the intersection after the light had turned red, putting other drivers and pedestrians in danger.",
            defenseSentence: "I apologize for my mistake, but I was rushing to get to the hospital as my wife had just gone into labor. I realize the danger I put others in and I assure the court that it won't happen again."
          },
          {
            id: 0,
            description: "The defendant was pulled over for driving at an excessive speed on the highway.",
            prosecutionSentence: "The radar gun recorded the defendant's vehicle traveling at a speed of 90 miles per hour, which is well above the posted speed limit of 65 miles per hour.",
            defenseSentence: "I was in a rush to get to an important meeting and lost track of my speed. I know that doesn't excuse my behavior and I promise to be more careful in the future."
          },
          {
            id: 0,
            description: "The defendant was observed by a police officer driving recklessly and swerving between lanes.",
            prosecutionSentence: "The police officer's dash cam footage clearly shows the defendant's vehicle swerving between lanes without signaling, which is a clear violation of traffic laws.",
            defenseSentence: "I admit that I was changing the radio station while driving and that caused me to momentarily lose control of my vehicle. I'm sorry for my mistake and I promise to be more focused on the road."
          },
          {
            id: 0,
            description: "The defendant failed to yield to a pedestrian at a crosswalk and was issued a citation by a police officer.",
            prosecutionSentence: "The police officer witnessed the defendant's vehicle failing to yield to a pedestrian who was legally crossing the street at a marked crosswalk, which is a clear violation of traffic laws.",
            defenseSentence: "I didn't see the pedestrian as they were partially obstructed by a parked car. But that doesn't excuse my behavior and I take full responsibility for my mistake."
          },
          {
            id: 0,
            description: "The defendant was caught on camera illegally passing another vehicle on a double yellow line.",
            prosecutionSentence: "The camera footage shows the defendant's vehicle passing another vehicle on a double yellow line, which is a clear violation of traffic laws.",
            defenseSentence: "I was in a hurry to get to my son's game and didn't realize that I was crossing the double yellow line. I'm sorry for my mistake and I promise to be more mindful of traffic laws in the future."
          },
          {
            id: 0,
            description: "The defendant's vehicle was found to have faulty brakes after a routine inspection by a traffic officer.",
            prosecutionSentence: "The inspection report clearly indicates that the defendant's vehicle had faulty brakes, which poses a serious danger to other drivers and pedestrians on the road.",
            defenseSentence: "I had no idea that the brakes were faulty. I had the car serviced recently and assumed that everything was in order. I request a chance to fix the issue and provide proof of repair to the court."
          },

          {
            id: 0,
            description: "The defendant was caught on camera driving on the wrong side of the road.",
            prosecutionSentence: "The video evidence clearly shows that the defendant was driving on the wrong side of the road, which is a serious traffic violation that endangers other drivers and pedestrians.",
            defenseSentence: "I admit that I made a mistake and drove on the wrong side of the road, but it was a momentary lapse of judgement. I request a warning instead of a fine as this is my first offense."
          },

          {
            id: 0,
            description: "The defendant was pulled over for driving with an expired license.",
            prosecutionSentence: "The officer who pulled over the defendant confirmed that the license was expired, which is a clear violation of traffic laws.",
            defenseSentence: "I had no idea that my license had expired. I had renewed it online but must have missed the notification that it was ready for pickup. I request a chance to renew my license and provide proof of renewal to the court."
          },

          {
            id: 0,
            description: "The defendant was observed by a police officer texting while driving.",
            prosecutionSentence: "The officer's testimony and dashcam footage clearly show that the defendant was distracted by their phone while driving, which is a serious traffic violation that can cause accidents.",
            defenseSentence: "I admit that I was using my phone while driving, but it was an emergency and I had to respond to a family member's message. I understand the danger it poses and promise not to do it again. I request a warning instead of a fine."
          },

          {
            id: 0,
            description: "The defendant was caught on camera running a stop sign at an intersection.",
            prosecutionSentence: "The video footage clearly shows that the defendant failed to stop at the stop sign, which is a serious traffic violation that endangers other drivers and pedestrians.",
            defenseSentence: "I admit that I did not stop at the stop sign, but I did slow down and looked both ways before proceeding. I request a warning instead of a fine."
          },

          {
            id: 0,
            description: "The defendant was pulled over for driving with a broken taillight.",
            prosecutionSentence: "The officer who pulled over the defendant confirmed that the taillight was broken, which is a clear violation of traffic laws.",
            defenseSentence: "I had no idea that the taillight was broken. I must have missed it during my regular checks. I request a chance to fix the taillight and provide proof of repair to the court."
          },
          {
            id: 0,
            description: "The defendant was pulled over for driving with expired license plates.",
            prosecutionSentence: "The police officer observed that the defendant's license plates had expired, which is a violation of traffic laws.",
            defenseSentence: "I was unaware that my license plates had expired. I recently moved and didn't receive a renewal notice from the DMV. I have since renewed them."
          },
          {
            id: 0,
            description: "The defendant was observed by a police officer driving while using their cellphone.",
            prosecutionSentence: "The police officer witnessed the defendant using their cellphone while driving, which is a violation of traffic laws.",
            defenseSentence: "I was using my cellphone as a GPS device and had it mounted on the dashboard. I wasn't texting or making a call. I understand that it's still a violation and I won't do it again."
          },
          {
            id: 0,
            description: "The defendant failed to come to a complete stop at a railroad crossing while a train was passing.",
            prosecutionSentence: "Several eyewitnesses, including the train conductor and passengers, saw the defendant's vehicle fail to come to a complete stop at the railroad crossing while the train was passing, which is a serious violation of traffic laws.",
            defenseSentence: "I'm sorry for my mistake. I didn't see the stop sign at the railroad crossing and didn't realize the train was passing. It was an honest mistake and I promise to be more vigilant in the future."
          },
          {
            id: 0,
            description: "The defendant was caught on camera driving in the carpool lane without a passenger.",
            prosecutionSentence: "The camera footage clearly shows the defendant driving in the carpool lane without a passenger, which is a violation of traffic laws.",
            defenseSentence: "I'm sorry for my mistake. I was in a hurry and didn't realize that I couldn't drive in the carpool lane alone. I promise to pay more attention to traffic signs in the future."
          },
          {
            id: 0,
            description: "The defendant was observed by a police officer driving with a broken taillight.",
            prosecutionSentence: "The police officer observed that the defendant's taillight was broken, which is a violation of traffic laws.",
            defenseSentence: "I wasn't aware that my taillight was broken. I apologize for the oversight and have since had it repaired."
          },
          {
            id: 0,
            description: "The defendant was caught on camera making an illegal U-turn on a busy street.",
            prosecutionSentence: "The camera footage clearly shows the defendant making an illegal U-turn on a busy street, which is a violation of traffic laws and poses a safety hazard to other drivers.",
            defenseSentence: "I'm sorry for my mistake. I was lost and trying to find my way back to the highway. I didn't realize that U-turns weren't allowed on that street."
          }
        ],
        /******* Prison *******/
        fight: [
          {
            id: 0,
            description: "Two inmates were caught on camera fighting in the prison yard.",
            prosecutionSentence: "We have clear video evidence that the defendant initiated the fight and caused injuries to the victim.",
            defenseSentence: "My client acted in self-defense and only used necessary force to protect himself from the victim's aggression."
          },

          {
            id: 1,
            description: "The prison guards found two inmates with injuries after a fight occurred in their cell.",
            prosecutionSentence: "We have medical records that show the victim suffered severe injuries caused by the defendant's assault.",
            defenseSentence: "My client did not start the fight and only defended himself against the victim's violent behavior."
          },

          {
            id: 2,
            description: "Eyewitnesses saw the defendant and the victim arguing before a fight broke out in the cafeteria.",
            prosecutionSentence: "Multiple eyewitnesses confirmed that the defendant instigated the fight and caused harm to the victim.",
            defenseSentence: "My client was provoked by the victim and only acted in self-defense to protect himself."
          },

          {
            id: 3,
            description: "The victim suffered a broken nose and other injuries after being attacked by the defendant in their cell.",
            prosecutionSentence: "We have medical records that show the victim's injuries were caused by the defendant's violent assault.",
            defenseSentence: "My client was not the instigator of the fight and only used necessary force to defend himself from the victim's attack."
          },

          {
            id: 4,
            description: "Security footage shows the defendant assaulting the victim with a makeshift weapon during a prison riot.",
            prosecutionSentence: "We have clear video evidence that the defendant attacked the victim with a weapon, causing severe injuries.",
            defenseSentence: "My client was acting in self-defense during a chaotic and dangerous prison riot."
          },

          {
            id: 5,
            description: "The victim suffered a concussion and other injuries after being beaten by the defendant and several other inmates.",
            prosecutionSentence: "Eyewitnesses and medical records confirm that the defendant and other inmates initiated the assault and caused harm to the victim.",
            defenseSentence: "My client did not start the fight and only acted in self-defense against the victim and other inmates who were attacking him."
          },

          {
            id: 6,
            description: "The defendant and victim were found in a fight by the prison guards, who had to use force to break it up.",
            prosecutionSentence: "The guards' testimony and the victim's injuries confirm that the defendant was the aggressor and caused harm to the victim.",
            defenseSentence: "My client was defending himself from the victim's aggressive behavior and did not start the fight."
          },

          {
            id: 7,
            description: "The victim suffered a broken jaw and other injuries after being assaulted by the defendant in the prison yard.",
            prosecutionSentence: "Medical records and eyewitness accounts confirm that the defendant initiated the assault and caused harm to the victim.",
            defenseSentence: "My client acted in self-defense after the victim threatened him and made physical contact."
          },

          {
            id: 8,
            description: "Prison guards found the defendant and victim with injuries after a fight broke out in the shower area.",
            prosecutionSentence: "Medical records and eyewitness accounts confirm that the defendant instigated the fight and caused harm to the victim.",
            defenseSentence: "My client only used necessary force to defend himself from the victim's attack."
          },
          {
            id: 9,
            description: "Inmate A suffered multiple bruises and fractures after a physical altercation with Inmate B",
            prosecutionSentence: "We have video evidence showing Inmate B initiating the fight and causing harm to Inmate A. This is a clear violation of prison regulations.",
            defenseSentence: "Inmate B was acting in self-defense as Inmate A had threatened and physically assaulted him first. Our client should not be held responsible for defending himself."
          },

          {
            id: 10,
            description: "Two inmates got into a heated argument during meal time and started throwing punches at each other",
            prosecutionSentence: "Eyewitness accounts and surveillance footage confirm that both inmates were equally involved in the fight and caused harm to each other. This is a clear violation of prison regulations.",
            defenseSentence: "Our client was provoked and acted in self-defense. The other inmate started the altercation and our client only acted to protect himself."
          },

          {
            id: 11,
            description: "A group of inmates started a riot and caused extensive damage to the prison facilities",
            prosecutionSentence: "We have clear evidence showing that the defendant was part of the group that started the riot and caused damage to the prison facilities. This is a serious offense and cannot be taken lightly.",
            defenseSentence: "Our client was not involved in the riot and was merely caught in the crossfire. There is no evidence showing that our client actively participated in the violence."
          },

          {
            id: 12,
            description: "Inmate A suffered a broken nose and several lacerations after being attacked by Inmate B with a homemade weapon",
            prosecutionSentence: "We have video evidence showing Inmate B attacking Inmate A with a weapon and causing serious harm. This is a clear violation of prison regulations and must be punished accordingly.",
            defenseSentence: "Our client acted in self-defense as Inmate A had threatened him and he felt that his life was in danger. Inmate A was the aggressor in this situation and our client had no choice but to defend himself."
          },

          {
            id: 13,
            description: "Two inmates got into a physical altercation in the yard, causing a disturbance among other inmates",
            prosecutionSentence: "Eyewitness accounts and surveillance footage confirm that both inmates were equally involved in the fight and caused a disturbance among other inmates. This is a clear violation of prison regulations.",
            defenseSentence: "Our client was provoked and acted in self-defense. The other inmate started the altercation and our client only acted to protect himself. The disturbance among other inmates was caused by their own reaction to the fight, and not our client's actions."
          },

          {
            id: 14,
            description: "Inmate A suffered a broken arm after being pushed down a flight of stairs by Inmate B",
            prosecutionSentence: "We have video evidence showing Inmate B pushing Inmate A down the stairs and causing serious harm. This is a clear violation of prison regulations and must be punished accordingly.",
            defenseSentence: "Our client did not intend to cause harm and merely pushed Inmate A in self-defense. Inmate A was the aggressor in this situation and our client had no choice but to defend himself."
          }
        ]
      }

      function generateSentences(min, max, fineVariant, text) {
        const result = [];

        const numbers = [];

        if (!fineVariant) {
          for (let j = 0; j < 3; j++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
            if (numbers[j] === numbers[j - 1]) {
              numbers[j] += 5;
            }
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
            value: "0"
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
            text: "No probation time",
            value: "0"
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

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
            /******* Criminal *******/
            if (caseObj.criminalCharge === "murder") {
              caseObj["charge"] = caseObj.criminalCharge;
              caseObj["description"] = descriptions.murder[Math.floor(Math.random() * descriptions.murder.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.murder.slice(0, Math.floor(Math.random() * evidences.murder.length)));
              caseObj["prisonSentences"] = generateSentences(5, 20, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);

            } else if (caseObj.criminalCharge === "theft") {
              caseObj["charge"] = caseObj.criminalCharge;
              caseObj["description"] = descriptions.theft[Math.floor(Math.random() * descriptions.theft.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.theft.slice(0, Math.floor(Math.random() * evidences.theft.length)));
              caseObj["prisonSentences"] = generateSentences(1, 10, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 20000, true);
            } else if (caseObj.criminalCharge === "fraud") {
              caseObj["charge"] = caseObj.criminalCharge;
              caseObj["description"] = descriptions.fraud[Math.floor(Math.random() * descriptions.fraud.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.fraud.slice(0, Math.floor(Math.random() * evidences.fraud.length)));
              caseObj["prisonSentences"] = generateSentences(1, 10, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(5000, 100000, true);
            } else if (caseObj.criminalCharge === "assault") {
              caseObj["charge"] = caseObj.criminalCharge;
              caseObj["description"] = descriptions.assault[Math.floor(Math.random() * descriptions.assault.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.assault.slice(0, Math.floor(Math.random() * evidences.assault.length)));
              caseObj["prisonSentences"] = generateSentences(1, 8, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);
            }
            /******* Road *******/
            else if (caseObj.roadCharge === "dui") {
              caseObj["charge"] = "driving under influence";
              caseObj["description"] = descriptions.dui[Math.floor(Math.random() * descriptions.dui.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.dui.slice(0, Math.floor(Math.random() * evidences.dui.length)));
              caseObj["prisonSentences"] = generateSentences(1, 8, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);
            } else if (caseObj.roadCharge === "recklessDriving") {
              caseObj["charge"] = "reckless driving";
              caseObj["description"] = descriptions.recklessDriving[Math.floor(Math.random() * descriptions.recklessDriving.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.recklessDriving.slice(0, Math.floor(Math.random() * evidences.recklessDriving.length)));
              caseObj["prisonSentences"] = generateSentences(1, 8, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);
            } else if (caseObj.roadCharge === "drivingNoLicense") {
              caseObj["charge"] = "driving w//o license";
              caseObj["description"] = descriptions.drivingNoLicense[Math.floor(Math.random() * descriptions.drivingNoLicense.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.drivingNoLicense.slice(0, Math.floor(Math.random() * evidences.drivingNoLicense.length)));
              caseObj["prisonSentences"] = generateSentences(1, 8, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(3000, 10000, true);
            }
            /******* Traffic *******/
            else if (caseObj.trafficCharge === "traffic") {
              let randomNum = Math.floor(Math.random() * descriptions.traffic.length);
              caseObj["charge"] = "traffic";
              caseObj["description"] = descriptions.traffic[randomNum].description;
              caseObj["evidences"] = [evidences.traffic[randomNum]];
              caseObj["prisonSentences"] = generateSentences(0, 0, false, "prison");
              caseObj["probationSentences"] = generateSentences(1, 5, false, "probation");
              caseObj["fineSentences"] = generateSentences(90, 1500, true);
            }
            /******* Prison *******/
            else if (caseObj.prisonCharge === "fight") {
              caseObj["charge"] = "fight";
              caseObj["description"] = descriptions.fight[Math.floor(Math.random() * descriptions.fight.length)].description;
              caseObj["evidences"] = shuffleArray(evidences.fight.slice(0, Math.floor(Math.random() * evidences.fight.length)));
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

      for (let i = 0; i < 1; i++) {
        let generatedCase = generateCase(caseTypes[Math.floor(Math.random() * caseTypes.length)]);
        this.addGeneratedCase(generatedCase);
      }

    }
  }
}
</script>