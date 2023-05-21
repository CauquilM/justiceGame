<template>
    <div id="app" :class="isDark ?'bg-dark text-light' : ''">
        <div class="dark-mode-button">
            <DarkModeSwitch/>
        </div>
        <router-view/>
        <OfficeModal/>
    </div>
</template>

<style>

</style>
<script setup>
import DarkModeSwitch from "@/components/CourtComponents/DarkModeSwitch.vue";
import OfficeModal from "@/components/OfficeModal.vue";
</script>
<script>
import {mapActions, mapState} from "vuex";
import evidences from "@/data_cases/evidences.json"
import descriptions from "@/data_cases/descriptions.json"
import crimesData from '@/data_cases/criminal_record/crimesData.json'
import infractionsData from '@/data_cases/criminal_record/infractionsData.json'
import witnessesData from '@/data_cases/witnessesData.json'
import {eventBus} from "@/main";

export default {
    name: 'App',

    data() {
        return {
            // Define case properties for each type
            caseProperties: {
                Criminal_first: ['criminalCharge_first'],
                /*Criminal_second: ['criminalCharge_second'],*/
                /*Felonies_first: ['felonies_first'],*/
                /*Felonies_second: ['felonies_second'],*/
                Parole: ['parole'],
                Road: ['roadCharge'],
                Prison: ['prisonCharge'],
                Traffic: ['trafficCharge']
            },

            // Define randomization parameters
            randomizationParams: {
                'type': "",
                'criminalCharge_first': ['murder', 'theft', 'fraud',
                    'assault', 'arson', 'armedRobbery'
                    /*
                    'cybercrime', 'identity theft', 'kidnapping', '1st Degree Murder', 'Attempted Murder'
                     'Arms Trafficking', 'Involuntarily Manslaughter', 'Attempted Murder of Police Officer'
                     'Attempted Murder 1st degree murder',
                    */
                ],
                /*'criminalCharge_second': [
                'Murder of Police Officer', 'Battery on Peace/Police Officer',
                     'Sexual Assault', 'Shoplifting w/violence', 'Pickpocketing w/violence', 'Armed Robbery',
                     'Grand Theft Auto', 'Robbery w/violence', 'hostage situation',
                ],*/
                /*'felonies_first': [
                    'fake 911 call', 'vandalism', 'bribery', 'suspicious Activity',
                    'shoplifting', 'trespassing', 'possesion of drugs', 'illegal Possession of Firearm'
                    , '"Possession of Burglary Tools', 'Possession of a Deadly Weapon',
                     'Possession of Firearm (Stolen)', 'Possession of a Stolen Vehicle',

                ],*/
                /*'felonies_second': [
                    'Drinking in public', Disturbing the Peace, Failure to Present Concealed Carry Permit,
                    'Hate Crime', 'Impersonating a Peace/Police Officer', 'Indecent Exposure',
                    'Participating in Gang', 'Pickpocketing', 'Brandishing of Firearm', 'Inciting Riot',
                    'Terrorist threat',

                ],*/
                'parole': [
                    'parole hearing' /*'Violation of probation', 'Violation of parole'*/
                ],
                'roadCharge': ['dui', 'recklessDriving',
                    'drivingNoLicense', 'hitAndRun',
                    /*'driving Wrong Way', 'evading Arrest', 'leaving the Scene of Accident',
                    failure to blood or breath sample, speeding*/
                ],
                'prisonCharge': ['fight', 'escape', 'assaultWithDeadlyWeapon',
                    'manslaughter', 'drugTrafficking', 'prisonHostage',
                ],
                'trafficCharge': ['traffic']
                /*'witnesses': ['eye witness', 'expert witness', 'character witness']*/
            },
            caseObj: {
                suspect: {
                    name: this.generateName(),
                    age: `${Math.floor(Math.random() * 41) + 20}`
                }
            }
        }
    },

    computed: {
        ...mapState(["isDark"])
    },
    created() {
        console.log("VERCEL" + ' ' + "pblv");
        console.time("Test");
        this.caseGeneration();
        console.timeEnd("Test");
        this.getHistoricalCases();
    },
    methods: {
        ...mapActions(["addGeneratedCase", "chooseProsecutionSentence", "getHistoricalCases"]),
        goToOffice() {
            eventBus.$emit('openOfficeModal');
        },
        generateName() {
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
        },

        generateSentences(min, max, fineVariant, text) {
            const result = [];
            const numbers = [];

            /*Prison senctences and probation sentences for
              any case except road infractions*/
            if (!fineVariant) {
                numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
                numbers.push(Math.floor(Math.random() * (max - numbers[0] - 2 + 1)) + min);
                numbers.push(Math.floor(Math.random() * (max - numbers[1] - 3 + 1)) + numbers[1] + 3);
            }
            /*** Road Infractions ***/
            else if (fineVariant && text === "traffic") {
                numbers.push(Math.floor(Math.random() * (1500 - 90)) + 90);
                numbers.push(Math.floor(Math.random() * (1500 - 90)) + 90);
                numbers.push(Math.floor(Math.random() * (1500 - 90)) + 90);
                /*All kind of cases fines except road infractions*/
            } else {
                numbers.push(Math.floor(Math.random() * 50000));
                numbers.push(Math.floor(Math.random() * 50000));
                numbers.push(Math.floor(Math.random() * 50000));
            }

            numbers.sort((a, b) => a - b);
            if (numbers[1] == numbers[0] || numbers[1] == numbers[2]) {
                numbers[1]--;
            }
            const prosecutorRandom = Math.floor(Math.random() * 3);
            let prosecutorChoice = [];

            if (!fineVariant && text === "prison") {
                const prosecutionNoSentence = Math.floor(Math.random() * 11);
                if (prosecutionNoSentence >= 2) {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({prison: prosecutorChoice});
                } else {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({prison: 0});
                }
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
                const prosecutionNoSentence = Math.floor(Math.random() * 11);
                if (prosecutionNoSentence >= 2) {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({probation: prosecutorChoice});
                } else {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({probation: 0});
                }
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
            } else if (!fineVariant && text === "traffic") {
                const prosecutionNoSentence = Math.floor(Math.random() * 11);
                if (prosecutionNoSentence >= 2) {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({fine: prosecutorChoice});
                } else {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({fine: 0});
                }
                prosecutorChoice = numbers[prosecutorRandom];
                result.push({
                    text: "Not available for this case",
                    value: "0",
                    disabled: true
                });
            } else {
                const prosecutionNoSentence = Math.floor(Math.random() * 11);
                if (prosecutionNoSentence >= 2) {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({fine: prosecutorChoice});
                } else {
                    prosecutorChoice = numbers[prosecutorRandom];
                    this.chooseProsecutionSentence({fine: 0});
                }
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
        },

        generateCriminalRecord(chancesToHaveARecord = 7) {
            const record = [];
            const randomChances = Math.floor(Math.random() * 11);
            if (randomChances >= chancesToHaveARecord) {
                const min = 1; // minimum number of crimes
                const max = Math.min(Math.floor(Math.random() * (crimesData.crimes.length - min)) + min, 5); // maximum number of crimes, up to the length of the crimes array minus the minimum or 10, whichever is smaller
                const numCrimes = Math.floor(Math.random() * (max - min + 1)) + min; // generate a random number of crimes between min and max
                for (let i = 0; i < numCrimes; i++) {
                    const crime = crimesData.crimes[Math.floor(Math.random() * crimesData.crimes.length)]; // randomly select a crime from the crimes array
                    record.push(crime);
                }
            }
            return record;
        },

        generateTrafficRecord() {
            const record = [];
            const randomChances = Math.floor(Math.random() * 11);
            if (randomChances >= 7) {
                const min = 1; // minimum number of crimes
                const max = Math.min(Math.floor(Math.random() * (infractionsData.infractions.length - min)) + min, 5); // maximum number of infractions, up to the length of the infractions array minus the minimum or 10, whichever is smaller
                const numCrimes = Math.floor(Math.random() * (max - min + 1)) + min; // generate a random number of infractions between min and max
                for (let i = 0; i < numCrimes; i++) {
                    const crime = infractionsData.infractions[Math.floor(Math.random() * infractionsData.infractions.length)]; // randomly select a crime from the crimes array
                    record.push(crime);
                }
            }
            return record;
        },

        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },

        generateCase(type) {
            this.caseProperties[type].forEach(prop => {
                if (this.randomizationParams[prop]) {
                    this.caseObj[prop] = this.randomizationParams[prop][Math.floor(Math.random() * this.randomizationParams[prop].length)];

                    /******* Criminal *******/
                    if (this.caseObj.criminalCharge_first === "murder") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["description"] = descriptions.murder[Math.floor(Math.random() * descriptions.murder.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.murder.slice(0, Math.floor(Math.random() * evidences.murder.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(5, 20, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        /*this.caseObj["witnesses"] = witnessesData.murder;*/
                    } else if (this.caseObj.criminalCharge_first === "theft") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["description"] = descriptions.theft[Math.floor(Math.random() * descriptions.theft.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.theft.slice(0, Math.floor(Math.random() * evidences.theft.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 10, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 20000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_first === "fraud") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["description"] = descriptions.fraud[Math.floor(Math.random() * descriptions.fraud.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.fraud.slice(0, Math.floor(Math.random() * evidences.fraud.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 10, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(5000, 100000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_first === "assault") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["description"] = descriptions.assault[Math.floor(Math.random() * descriptions.assault.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.assault.slice(0, Math.floor(Math.random() * evidences.assault.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_first === "arson") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["description"] = descriptions.arson[Math.floor(Math.random() * descriptions.arson.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.arson.slice(0, Math.floor(Math.random() * evidences.arson.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_first === "armedRobbery") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["description"] = descriptions.armedRobbery[Math.floor(Math.random() * descriptions.armedRobbery.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.armedRobbery.slice(0, Math.floor(Math.random() * evidences.armedRobbery.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    }
                    /******* Road *******/
                    else if (this.caseObj.roadCharge === "dui") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "driving under influence";
                        this.caseObj["description"] = descriptions.dui[Math.floor(Math.random() * descriptions.dui.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.dui.slice(0, Math.floor(Math.random() * evidences.dui.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "recklessDriving") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "reckless driving";
                        this.caseObj["description"] = descriptions.recklessDriving[Math.floor(Math.random() * descriptions.recklessDriving.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.recklessDriving.slice(0, Math.floor(Math.random() * evidences.recklessDriving.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "drivingNoLicense") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "driving w/o license";
                        this.caseObj["description"] = descriptions.drivingNoLicense[Math.floor(Math.random() * descriptions.drivingNoLicense.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.drivingNoLicense.slice(0, Math.floor(Math.random() * evidences.drivingNoLicense.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "hitAndRun") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "hit and run";
                        this.caseObj["description"] = descriptions.hitAndRun[Math.floor(Math.random() * descriptions.hitAndRun.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.hitAndRun.slice(0, Math.floor(Math.random() * evidences.hitAndRun.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 8, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    }
                    /******* Traffic *******/
                    else if (this.caseObj.trafficCharge === "traffic") {
                        let randomNum = Math.floor(Math.random() * descriptions.traffic.length);
                        this.caseObj["type"] = "traffic infraction";
                        this.caseObj["charge"] = "traffic";
                        this.caseObj["description"] = descriptions.traffic[randomNum].description;
                        this.caseObj["evidences"] = [evidences.traffic[randomNum]];
                        this.caseObj["fineSentences"] = this.generateSentences(90, 1500, true, "traffic");
                        this.caseObj["criminalRecord"] = this.generateTrafficRecord();
                    }
                    /******* Prison *******/
                    else if (this.caseObj.prisonCharge === "fight") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "fight";
                        this.caseObj["description"] = descriptions.fight[Math.floor(Math.random() * descriptions.fight.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.fight.slice(0, Math.floor(Math.random() * evidences.fight.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(1, 10, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "escape") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "escape";
                        this.caseObj["description"] = descriptions.escape[Math.floor(Math.random() * descriptions.escape.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.escape.slice(0, Math.floor(Math.random() * evidences.escape.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(3, 12, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "assaultWithDeadlyWeapon") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "assault with deadly weapon";
                        this.caseObj["description"] = descriptions.assaultWithDeadlyWeapon[Math.floor(Math.random() * descriptions.assaultWithDeadlyWeapon.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.assaultWithDeadlyWeapon.slice(0, Math.floor(Math.random() * evidences.assaultWithDeadlyWeapon.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(3, 12, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "manslaughter") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "manslaughter";
                        this.caseObj["description"] = descriptions.manslaughter[Math.floor(Math.random() * descriptions.manslaughter.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.manslaughter.slice(0, Math.floor(Math.random() * evidences.manslaughter.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(3, 12, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "drugTrafficking") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "drug trafficking";
                        this.caseObj["description"] = descriptions.drugTrafficking[Math.floor(Math.random() * descriptions.drugTrafficking.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.drugTrafficking.slice(0, Math.floor(Math.random() * evidences.drugTrafficking.length))).slice(0, 4);
                        this.caseObj["prisonSentences"] = this.generateSentences(3, 12, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(3000, 10000, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    }
                    /******* Parole *******/
                    else if (this.caseObj.parole === "parole hearing") {
                        this.caseObj["type"] = "parole";
                        this.caseObj["charge"] = "parole hearing";
                        this.caseObj["description"] = descriptions.parole[Math.floor(Math.random() * descriptions.parole.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evidences.parole.slice(0, Math.floor(Math.random() * evidences.parole.length))).slice(0, 3);
                        this.caseObj["probationSentences"] = this.generateSentences(1, 5, false, "probation");
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                    }

                } else {
                    this.caseObj[prop] = '';
                }
            });

            return this.caseObj;
        },

        caseGeneration() {
            // Define case types
            const caseTypes = ['Parole', 'Criminal_first', 'Road', 'Prison', 'Traffic',
                /*'Felony', 'Army', 'Immigration', 'Parole', 'Constitutional', "Historical"*/
            ];

            let generatedCase = this.generateCase(caseTypes[Math.floor(Math.random() * caseTypes.length)]);
            this.addGeneratedCase(generatedCase);
        }
    }
}
</script>

<!--
{
id: 0,
description: "The antique store owner discovered a valuable artifact missing from their display case."
},
Generate 30 descriptions for an assault case like in the examples, put them in objects not a function, start from ID (11)-->

<!--do 30 more continuing from ID (14)-->

<!--
{
id: 0,
description: "Two inmates were caught on camera fighting in the prison yard.",
prosecutionSentence: "We have clear video evidence that the defendant initiated the fight and caused injuries to the victim.",
defenseSentence: "My client acted in self-defense and only used necessary force to protect himself from the victim's aggression."
},
Generate 30 fraud evidences that make the defendant innocent / guilty like in the examples,
add a prosecution sentence and a defense sentence
put them in objects not a function, start from ID (0)
-->

<!--do 30 more continuing from ID (14)-->