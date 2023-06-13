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

/************** Crimes **************/
import murder_d from '@/data_cases/descriptions/crimes/murder.json'
import murder_e from '@/data_cases/evidences/crimes/murder.json'
import arson_d from '@/data_cases/descriptions/crimes/arson.json'
import arson_e from '@/data_cases/evidences/crimes/arson.json'
import assault_d from '@/data_cases/descriptions/crimes/assault.json'
import assault_e from '@/data_cases/evidences/crimes/assault.json'
import fraud_d from '@/data_cases/descriptions/crimes/fraud.json'
import fraud_e from '@/data_cases/evidences/crimes/fraud.json'
import theft_d from '@/data_cases/descriptions/crimes/theft.json'
import theft_e from '@/data_cases/evidences/crimes/theft.json'
import armedRobbery_d from '@/data_cases/descriptions/crimes/armedRobbery.json'
import armedRobbery_e from '@/data_cases/evidences/crimes/armedRobbery.json'
import terrorist_d from '@/data_cases/descriptions/crimes/terrorist.json'
import terrorist_e from '@/data_cases/evidences/crimes/terrorist.json'
/************** Felonies **************/
import drinkingInPublic_d from '@/data_cases/descriptions/felonies/drinkingInPublic.json'
import drinkingInPublic_e from '@/data_cases/evidences/felonies/drinkingInPublic.json'
import fake911Call_d from '@/data_cases/descriptions/felonies/fake911Call.json'
import fake911Call_e from '@/data_cases/evidences/felonies/fake911Call.json'
import impersonatingPolice_d from '@/data_cases/descriptions/felonies/impersonatingPolice.json'
import impersonatingPolice_e from '@/data_cases/evidences/felonies/impersonatingPolice.json'
import pickpocketing_d from '@/data_cases/descriptions/felonies/pickpocketing.json'
import pickpocketing_e from '@/data_cases/evidences/felonies/pickpocketing.json'
import shoplifting_d from '@/data_cases/descriptions/felonies/shoplifting.json'
import shoplifting_e from '@/data_cases/evidences/felonies/shoplifting.json'
import trespassing_d from '@/data_cases/descriptions/felonies/trespassing.json'
import trespassing_e from '@/data_cases/evidences/felonies/trespassing.json'
import vandalism_d from '@/data_cases/descriptions/felonies/vandalism.json'
import vandalism_e from '@/data_cases/evidences/felonies/vandalism.json'

/************** Parole **************/
import parole_d from '@/data_cases/descriptions/parole/parole.json'
import parole_e from '@/data_cases/evidences/parole/parole.json'

/************** Prison **************/
import assaultWithDeadlyWeapon_d from '@/data_cases/descriptions/prison/assaultWithDeadlyWeapon.json'
import assaultWithDeadlyWeapon_e from '@/data_cases/evidences/prison/assaultWithDeadlyWeapon.json'
import drugTrafficking_d from '@/data_cases/descriptions/prison/drugTrafficking.json'
import drugTrafficking_e from '@/data_cases/evidences/prison/drugTrafficking.json'
import escape_d from '@/data_cases/descriptions/prison/escape.json'
import escape_e from '@/data_cases/evidences/prison/escape.json'
import fight_d from '@/data_cases/descriptions/prison/fight.json'
import fight_e from '@/data_cases/evidences/prison/fight.json'
import manslaughter_d from '@/data_cases/descriptions/prison/manslaughter.json'
import manslaughter_e from '@/data_cases/evidences/prison/manslaughter.json'
import prisonHostage_d from '@/data_cases/descriptions/prison/prisonHostage.json'
import prisonHostage_e from '@/data_cases/evidences/prison/prisonHostage.json'

/************** Road **************/
import drivingNoLicense_d from '@/data_cases/descriptions/road/drivingNoLicense.json'
import drivingNoLicense_e from '@/data_cases/evidences/road/drivingNoLicense.json'
import dui_d from '@/data_cases/descriptions/road/dui.json'
import dui_e from '@/data_cases/evidences/road/dui.json'
import evadingArrest_d from '@/data_cases/descriptions/road/evadingArrest.json'
import evadingArrest_e from '@/data_cases/evidences/road/evadingArrest.json'
import hitAndRun_d from '@/data_cases/descriptions/road/hitAndRun.json'
import hitAndRun_e from '@/data_cases/evidences/road/hitAndRun.json'
import recklessDriving_d from '@/data_cases/descriptions/road/recklessDriving.json'
import recklessDriving_e from '@/data_cases/evidences/road/recklessDriving.json'

/************** Traffic **************/
import traffic_e from '@/data_cases/evidences/traffic/traffic.json'


/************** Immigration **************/
import deportation_d from '@/data_cases/descriptions/immigration/deportation.json'
import deportation_e from '@/data_cases/evidences/immigration/deportation.json'

/************** Others **************/
import crimesData from '@/data_cases/criminal_record/crimesData.json'
import infractionsData from '@/data_cases/criminal_record/infractionsData.json'
import suspect_names_data from '@/data_cases/suspect_names.json'
import witnessesData from '@/data_cases/witnesses.json'
import offenses from '@/data_cases/penal_code/offenses.json'
import {eventBus} from "@/main";


export default {
    name: 'App',

    data() {
        return {
            // Define case properties for each type
            caseProperties: {
                Student: ['studentCharge'],
                Police: ['policeCharge'],
                Criminal_first: ['criminalCharge_first'],
                Criminal_second: ['criminalCharge_second'],
                Felonies_first: ['feloniesCharge_first'],
                Felonies_second: ['feloniesCharge_second'],
                Parole: ['parole'],
                Road: ['roadCharge'],
                Prison: ['prisonCharge'],
                Traffic: ['trafficCharge'],
                Immigration: ['immigrationCharge']
            },

            // Define randomization parameters
            randomizationParams: {
                'type': "",
                studentCharge: [
                    /*
                    'Excessive Use of Emoji in Academic Papers',
                    'Inappropriate Use of Campus Mascot Costume',
                    'Unsanctioned Food Fight in the Cafeteria',
                    'Excessive Consumption of Ramen Noodles',
                    'Conspiracy to Break into the Library After Hours for Late-Night Storytime'
                    'Violation of the "No Socks with Sandals" Dress Code Policy',
                    'Stealing another student's pen', 'Breach in university database to modify notes',
                    'Mischievous Pranks Leading to Temporary Closure of a Building or Facility',
                    */
                ],
                'policeCharge': [
                    /*'Excessive Use of Force', 'False Arrest', 'bribery', 'perjury', 'evidence tampering',
                    'corruption', 'Civil Rights Violations', 'Murder'*/
                ],
                'criminalCharge_first': ['murder', 'theft', 'fraud',
                    'assault'
                    /*
                    'cybercrime', 'identity theft', 'kidnapping', '1st Degree Murder', 'Attempted Murder'
                     'Arms Trafficking', 'Involuntarily Manslaughter', 'Attempted Murder of Police Officer'
                     'Attempted Murder 1st degree murder', 'Murder of Police Officer', 'Battery on Peace/Police Officer',
                     'Sexual Assault', 'Shoplifting w/violence', 'Pickpocketing w/violence',
                     'Grand Theft Auto', 'Robbery w/violence', 'hostage situation'
                    */
                ],
                'criminalCharge_second': [
                    'arson', 'armedRobbery', 'terrorist'
                ],
                'feloniesCharge_first': [
                    'trespassing', 'impersonatingPolice', 'pickpocketing', 'fake911Call',
                    /*'bribery', 'suspicious Activity',
                     'trespassing', 'possesion of drugs', 'illegal Possession of Firearm'
                    , 'Possession of Burglary Tools', 'Possession of a Deadly Weapon',
                     'Possession of Firearm (Stolen)', 'Possession of a Stolen Vehicle'
                     Disturbing the Peace, Failure to Present Concealed Carry Permit,
                    'Hate Crime', 'Indecent Exposure',
                    'Participating in Gang', 'Brandishing of Firearm', 'Inciting Riot',
                     */

                ],
                'feloniesCharge_second': [
                    'vandalism', 'shoplifting', 'drinkingInPublic'
                ],
                'parole': [
                    'parole hearing' /*'Violation of probation', 'Violation of parole'*/
                ],
                'roadCharge': ['dui', 'recklessDriving',
                    'drivingNoLicense', 'hitAndRun', 'evadingArrest'
                    /*'driving Wrong Way',
                    failure to blood or breath sample, speeding*/
                ],
                'prisonCharge': ['fight', 'escape', 'assaultWithDeadlyWeapon',
                    'manslaughter', 'drugTrafficking', 'prisonHostage',
                ],
                'trafficCharge': ['traffic'],
                'immigrationCharge': ['deportation']
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
        console.log("VERCEL" + ' ' + "Rudy");
        console.time("Test case generation");
        this.caseGeneration();
        console.timeEnd("Test case generation");
        this.getHistoricalCases();
    },
    methods: {
        ...mapActions(["addGeneratedCase", "chooseProsecutionSentence", "getHistoricalCases"]),
        goToOffice() {
            eventBus.$emit('openOfficeModal');
        },
        generateName() {
            const randomFirstName = suspect_names_data.firstName[Math.floor(Math.random() * suspect_names_data.firstName.length)];
            const randomLastName = suspect_names_data.lastName[Math.floor(Math.random() * suspect_names_data.lastName.length)];

            return `${randomFirstName} ${randomLastName}`;
        },

        generateSentences(min, max, fineVariant, text, offense) {
            const result = [];
            const numbers = [];

            /*Prison senctences and probation sentences for
              any case except road infractions*/
            if (!fineVariant) {
                numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
                numbers.push(Math.floor(Math.random() * (max - numbers[0] - 2 + 1)) + min);
                numbers.push(Math.floor(Math.random() * (max - numbers[1] - 3 + 1)) + numbers[1] + 3);
            } else {
                numbers.push(Math.floor(Math.random() * max));
                numbers.push(Math.floor(Math.random() * max));
                numbers.push(Math.floor(Math.random() * max));
            }

            console.log(`numbers ${text} => `, numbers);
            if(numbers[0] == 0){
                numbers[0]++;
            }
            if(numbers[1] == 1){
                numbers[1]++;
            }
            if(numbers[2] == 2){
                numbers[2]++;
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
                    value: `${numbers[0]}`
                });
                result.push({
                    text: `${numbers[1]} years`,
                    value: `${numbers[1]}`
                });
                result.push({
                    text: `${numbers[2]} years`,
                    value: `${numbers[2]}`
                });
                if (typeof offense != "undefined" && offense.life_sentence) {
                    result.push({
                        text: `Life sentence`,
                        value: `life_prison`
                    });
                }
                if(typeof offense != "undefined" && offense.death_sentence){
                    result.push({
                        text: `Death Penalty`,
                        value: `death_prison`
                    });
                }
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
                    value: `${numbers[0]}`
                });
                result.push({
                    text: `${numbers[1]} years`,
                    value: `${numbers[1]}`
                });
                result.push({
                    text: `${numbers[2]} years`,
                    value: `${numbers[2]}`
                });
                if (typeof offense != "undefined" && offense.life_probation) {
                    result.push({
                        text: `Life probation`,
                        value: `life_probation`
                    });
                }
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
                    value: `${numbers[0]}`
                });
                result.push({
                    text: `${numbers[1]}$`,
                    value: `${numbers[1]}`
                });
                result.push({
                    text: `${numbers[2]}$`,
                    value: `${numbers[2]}`
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
                        this.caseObj["penalCodeCharge"] = "murder";
                        this.caseObj["description"] = murder_d[Math.floor(Math.random() * murder_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(murder_e.slice(0, Math.floor(Math.random() * murder_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.murder.prison_min, offenses.murder.prison_max, false, "prison", offenses.murder);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.murder.probation_min, offenses.murder.probation_max, false, "probation", offenses.murder);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.murder.fine_min, offenses.murder.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        /*this.caseObj["witnesses"] = witnessesData.murder;*/
                    } else if (this.caseObj.criminalCharge_first === "theft") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["penalCodeCharge"] = "theft";
                        this.caseObj["description"] = theft_d[Math.floor(Math.random() * theft_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(theft_e.slice(0, Math.floor(Math.random() * theft_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.theft.prison_min, offenses.theft.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.theft.probation_min, offenses.theft.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.theft.fine_min, offenses.theft.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_first === "fraud") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["penalCodeCharge"] = "fraud";
                        this.caseObj["description"] = fraud_d[Math.floor(Math.random() * fraud_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(fraud_e.slice(0, Math.floor(Math.random() * fraud_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.fraud.prison_min, offenses.fraud.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.fraud.probation_min, offenses.fraud.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.fraud.fine_min, offenses.fraud.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_first === "assault") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_first;
                        this.caseObj["penalCodeCharge"] = "assault";
                        this.caseObj["description"] = assault_d[Math.floor(Math.random() * assault_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(assault_e.slice(0, Math.floor(Math.random() * assault_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.assault.prison_min, offenses.assault.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.assault.probation_min, offenses.assault.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.assault.fine_min, offenses.assault.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_second === "arson") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = this.caseObj.criminalCharge_second;
                        this.caseObj["penalCodeCharge"] = "arson";
                        this.caseObj["description"] = arson_d[Math.floor(Math.random() * arson_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(arson_e.slice(0, Math.floor(Math.random() * arson_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.arson.prison_min, offenses.arson.prison_max, false, "prison", offenses.arson);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.arson.probation_min, offenses.arson.probation_max, false, "probation", offenses.arson);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.arson.fine_min, offenses.arson.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_second === "armedRobbery") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = "armed robbery";
                        this.caseObj["penalCodeCharge"] = "armedRobbery";
                        this.caseObj["description"] = armedRobbery_d[Math.floor(Math.random() * armedRobbery_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(armedRobbery_e.slice(0, Math.floor(Math.random() * armedRobbery_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.armedRobbery.prison_min, offenses.armedRobbery.prison_max, false, "prison", offenses.armedRobbery);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.armedRobbery.probation_min, offenses.armedRobbery.probation_max, false, "probation", offenses.armedRobbery);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.armedRobbery.fine_min, offenses.armedRobbery.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.criminalCharge_second === "terrorist") {
                        this.caseObj["type"] = "criminal";
                        this.caseObj["charge"] = "terrorist case";
                        this.caseObj["penalCodeCharge"] = "terrorist";
                        this.caseObj["description"] = terrorist_d[Math.floor(Math.random() * terrorist_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(terrorist_e.slice(0, Math.floor(Math.random() * terrorist_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.terrorist.prison_min, offenses.terrorist.prison_max, false, "prison", offenses.terrorist);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.terrorist.probation_min, offenses.terrorist.probation_max, false, "probation", offenses.terrorist);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.terrorist.fine_min, offenses.terrorist.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    }

                    /******* Felonies *******/
                    else if (this.caseObj.feloniesCharge_first === "trespassing") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "trespassing";
                        this.caseObj["penalCodeCharge"] = "trespassing";
                        this.caseObj["description"] = trespassing_d[Math.floor(Math.random() * trespassing_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(trespassing_e.slice(0, Math.floor(Math.random() * trespassing_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.trespassing.prison_min, offenses.trespassing.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.trespassing.probation_min, offenses.trespassing.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.trespassing.fine_min, offenses.trespassing.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.feloniesCharge_first === "impersonatingPolice") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "impersonating a police officer";
                        this.caseObj["penalCodeCharge"] = "impersonatingPolice";
                        this.caseObj["description"] = impersonatingPolice_d[Math.floor(Math.random() * impersonatingPolice_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(impersonatingPolice_e.slice(0, Math.floor(Math.random() * impersonatingPolice_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.impersonatingPolice.prison_min, offenses.impersonatingPolice.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.impersonatingPolice.probation_min, offenses.impersonatingPolice.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.impersonatingPolice.fine_min, offenses.impersonatingPolice.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.feloniesCharge_first === "pickpocketing") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "pickpocketing";
                        this.caseObj["penalCodeCharge"] = "pickpocketing";
                        this.caseObj["description"] = pickpocketing_d[Math.floor(Math.random() * pickpocketing_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(pickpocketing_e.slice(0, Math.floor(Math.random() * pickpocketing_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.pickpocketing.prison_min, offenses.pickpocketing.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.pickpocketing.probation_min, offenses.pickpocketing.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.pickpocketing.fine_min, offenses.pickpocketing.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.feloniesCharge_first === "fake911Call") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "fake 911 call";
                        this.caseObj["penalCodeCharge"] = "fake911Call";
                        this.caseObj["description"] = fake911Call_d[Math.floor(Math.random() * fake911Call_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(fake911Call_e.slice(0, Math.floor(Math.random() * fake911Call_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.fake911Call.prison_min, offenses.fake911Call.prison_max, false, "prison", offenses.fake911Call);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.fake911Call.probation_min, offenses.fake911Call.probation_max, false, "probation", offenses.fake911Call);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.fake911Call.fine_min, offenses.fake911Call.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.feloniesCharge_second === "vandalism") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "vandalism";
                        this.caseObj["penalCodeCharge"] = "vandalism";
                        this.caseObj["description"] = vandalism_d[Math.floor(Math.random() * vandalism_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(vandalism_e.slice(0, Math.floor(Math.random() * vandalism_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.vandalism.prison_min, offenses.vandalism.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.vandalism.probation_min, offenses.vandalism.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.vandalism.fine_min, offenses.vandalism.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.feloniesCharge_second === "shoplifting") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "shoplifting";
                        this.caseObj["penalCodeCharge"] = "shoplifting";
                        this.caseObj["description"] = shoplifting_d[Math.floor(Math.random() * shoplifting_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(shoplifting_e.slice(0, Math.floor(Math.random() * shoplifting_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.shoplifting.prison_min, offenses.shoplifting.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.shoplifting.probation_min, offenses.shoplifting.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.shoplifting.fine_min, offenses.shoplifting.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    } else if (this.caseObj.feloniesCharge_second === "drinkingInPublic") {
                        this.caseObj["type"] = "felony";
                        this.caseObj["charge"] = "drinking in public";
                        this.caseObj["penalCodeCharge"] = "drinkingInPublic";
                        this.caseObj["description"] = drinkingInPublic_d[Math.floor(Math.random() * drinkingInPublic_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(drinkingInPublic_e.slice(0, Math.floor(Math.random() * drinkingInPublic_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.drinkingInPublic.prison_min, offenses.drinkingInPublic.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.drinkingInPublic.probation_min, offenses.drinkingInPublic.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.drinkingInPublic.fine_min, offenses.drinkingInPublic.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                    }
                    /******* Road *******/
                    else if (this.caseObj.roadCharge === "dui") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "driving under influence";
                        this.caseObj["penalCodeCharge"] = "dui";
                        this.caseObj["description"] = dui_d[Math.floor(Math.random() * dui_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(dui_e.slice(0, Math.floor(Math.random() * dui_e.length))).slice(0, 3);
                        this.caseObj["drivingLicensePoints"] = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.dui.prison_min, offenses.dui.prison_max, false, "prison", offenses.dui);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.dui.probation_min, offenses.dui.probation_max, false, "probation", offenses.dui);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.dui.fine_min, offenses.dui.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "recklessDriving") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "reckless driving";
                        this.caseObj["penalCodeCharge"] = "recklessDriving";
                        this.caseObj["description"] = recklessDriving_d[Math.floor(Math.random() * recklessDriving_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(recklessDriving_e.slice(0, Math.floor(Math.random() * recklessDriving_e.length))).slice(0, 3);
                        this.caseObj["drivingLicensePoints"] = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.recklessDriving.prison_min, offenses.recklessDriving.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.recklessDriving.probation_min, offenses.recklessDriving.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.recklessDriving.fine_min, offenses.recklessDriving.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "drivingNoLicense") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "driving w/o license";
                        this.caseObj["penalCodeCharge"] = "drivingNoLicense";
                        this.caseObj["description"] = drivingNoLicense_d[Math.floor(Math.random() * drivingNoLicense_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(drivingNoLicense_e.slice(0, Math.floor(Math.random() * drivingNoLicense_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.drivingNoLicense.prison_min, offenses.drivingNoLicense.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.drivingNoLicense.probation_min, offenses.drivingNoLicense.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.drivingNoLicense.fine_min, offenses.drivingNoLicense.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "hitAndRun") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "hit and run";
                        this.caseObj["penalCodeCharge"] = "hitAndRun";
                        this.caseObj["description"] = hitAndRun_d[Math.floor(Math.random() * hitAndRun_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(hitAndRun_e.slice(0, Math.floor(Math.random() * hitAndRun_e.length))).slice(0, 3);
                        this.caseObj["drivingLicensePoints"] = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.hitAndRun.prison_min, offenses.hitAndRun.prison_max, false, "prison", offenses.hitAndRun);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.hitAndRun.probation_min, offenses.hitAndRun.probation_max, false, "probation", offenses.hitAndRun);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.hitAndRun.fine_min, offenses.hitAndRun.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.roadCharge === "evadingArrest") {
                        this.caseObj["type"] = "traffic crime";
                        this.caseObj["charge"] = "evading Arrest";
                        this.caseObj["penalCodeCharge"] = "evadingArrest";
                        this.caseObj["description"] = evadingArrest_d[Math.floor(Math.random() * evadingArrest_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(evadingArrest_e.slice(0, Math.floor(Math.random() * evadingArrest_e.length))).slice(0, 3);
                        this.caseObj["drivingLicensePoints"] = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.evadingArrest.prison_min, offenses.evadingArrest.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.evadingArrest.probation_min, offenses.evadingArrest.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.evadingArrest.fine_min, offenses.evadingArrest.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord();
                        this.caseObj["witnesses"] = witnessesData.murder;
                    }
                    /******* Traffic *******/
                    else if (this.caseObj.trafficCharge === "traffic") {
                        let randomNum = Math.floor(Math.random() * traffic_e.length);
                        this.caseObj["type"] = "traffic infraction";
                        this.caseObj["charge"] = "traffic";
                        this.caseObj["penalCodeCharge"] = "traffic";
                        this.caseObj["description"] = traffic_e[randomNum].description;
                        this.caseObj["evidences"] = [traffic_e[randomNum]];
                        this.caseObj["drivingLicensePoints"] = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                        this.caseObj["fineSentences"] = this.generateSentences(90, 1500, true, "traffic");
                        this.caseObj["criminalRecord"] = this.generateTrafficRecord();
                    }
                    /******* Prison *******/
                    else if (this.caseObj.prisonCharge === "fight") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "fight";
                        this.caseObj["penalCodeCharge"] = "fight";
                        this.caseObj["description"] = fight_d[Math.floor(Math.random() * fight_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(fight_e.slice(0, Math.floor(Math.random() * fight_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.fight.prison_min, offenses.fight.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.fight.probation_min, offenses.fight.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.fight.fine_min, offenses.fight.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "escape") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "escape";
                        this.caseObj["penalCodeCharge"] = "escape";
                        this.caseObj["description"] = escape_d[Math.floor(Math.random() * escape_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(escape_e.slice(0, Math.floor(Math.random() * escape_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.escape.prison_min, offenses.escape.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.escape.probation_min, offenses.escape.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.escape.fine_min, offenses.escape.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "assaultWithDeadlyWeapon") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "assault with deadly weapon";
                        this.caseObj["penalCodeCharge"] = "assaultWithDeadlyWeapon";
                        this.caseObj["description"] = assaultWithDeadlyWeapon_d[Math.floor(Math.random() * assaultWithDeadlyWeapon_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(assaultWithDeadlyWeapon_e.slice(0, Math.floor(Math.random() * assaultWithDeadlyWeapon_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.assaultWithDeadlyWeapon.prison_min, offenses.assaultWithDeadlyWeapon.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.assaultWithDeadlyWeapon.probation_min, offenses.assaultWithDeadlyWeapon.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.assaultWithDeadlyWeapon.fine_min, offenses.assaultWithDeadlyWeapon.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "manslaughter") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "manslaughter";
                        this.caseObj["penalCodeCharge"] = "manslaughter";
                        this.caseObj["description"] = manslaughter_d[Math.floor(Math.random() * manslaughter_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(manslaughter_e.slice(0, Math.floor(Math.random() * manslaughter_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.manslaughter.prison_min, offenses.manslaughter.prison_max, false, "prison", offenses.manslaughter);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.manslaughter.probation_min, offenses.manslaughter.probation_max, false, "probation", offenses.manslaughter);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.manslaughter.fine_min, offenses.manslaughter.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "drugTrafficking") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "drug trafficking";
                        this.caseObj["penalCodeCharge"] = "drugTrafficking";
                        this.caseObj["description"] = drugTrafficking_d[Math.floor(Math.random() * drugTrafficking_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(drugTrafficking_e.slice(0, Math.floor(Math.random() * drugTrafficking_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.drugTrafficking.prison_min, offenses.drugTrafficking.prison_max, false, "prison", offenses.drugTrafficking);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.drugTrafficking.probation_min, offenses.drugTrafficking.probation_max, false, "probation", offenses.drugTrafficking);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.drugTrafficking.fine_min, offenses.drugTrafficking.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    } else if (this.caseObj.prisonCharge === "prisonHostage") {
                        this.caseObj["type"] = "prison case";
                        this.caseObj["charge"] = "prison hostage";
                        this.caseObj["penalCodeCharge"] = "prisonHostage";
                        this.caseObj["description"] = prisonHostage_d[Math.floor(Math.random() * prisonHostage_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(prisonHostage_e.slice(0, Math.floor(Math.random() * prisonHostage_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.prisonHostage.prison_min, offenses.prisonHostage.prison_max, false, "prison", offenses.prisonHostage);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.prisonHostage.probation_min, offenses.prisonHostage.probation_max, false, "probation", offenses.prisonHostage);
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.prisonHostage.fine_min, offenses.prisonHostage.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    }
                    /******* Parole *******/
                    else if (this.caseObj.parole === "parole hearing") {
                        this.caseObj["type"] = "parole";
                        this.caseObj["charge"] = "parole";
                        this.caseObj["penalCodeCharge"] = "parole";
                        this.caseObj["description"] = parole_d[Math.floor(Math.random() * parole_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(parole_e.slice(0, Math.floor(Math.random() * parole_e.length))).slice(0, 3);
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.parole.probation_min, offenses.parole.probation_max, false, "probation");
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                    }
                    /******* Immigration *******/
                    else if (this.caseObj.immigrationCharge === "deportation") {
                        this.caseObj["type"] = "immigration";
                        this.caseObj["charge"] = "deportation";
                        this.caseObj["penalCodeCharge"] = "deportation";
                        this.caseObj["description"] = deportation_d[Math.floor(Math.random() * deportation_d.length)].description;
                        this.caseObj["evidences"] = this.shuffleArray(deportation_e.slice(0, Math.floor(Math.random() * deportation_e.length))).slice(0, 3);
                        this.caseObj["prisonSentences"] = this.generateSentences(offenses.deportation.prison_min, offenses.deportation.prison_max, false, "prison");
                        this.caseObj["probationSentences"] = this.generateSentences(offenses.deportation.probation_min, offenses.deportation.probation_max, false, "probation");
                        this.caseObj["fineSentences"] = this.generateSentences(offenses.deportation.fine_min, offenses.deportation.fine_max, true);
                        this.caseObj["criminalRecord"] = this.generateCriminalRecord(0);
                        this.caseObj["witnesses"] = witnessesData.murder;
                    }

                } else {
                    this.caseObj[prop] = '';
                }
            });

            return this.caseObj;
        },

        caseGeneration() {
            // Define case types
            const caseTypes = [
                'Road', 'Traffic', 'Parole', 'Felonies_first', 'Criminal_first', 'Prison',
                'Felonies_second', 'Criminal_second', /* 'Immigration', 'Student'
                'Police' ,'Army', 'Constitutional', 'Historical' */
            ];

            /*const random = Math.floor(Math.random() * 101);
            const type = "";
            if(random >= 0 && random <= 10){
                type = "Road";
            }
            if(random >= 0 && random <= 10){
                type = "Road";
            }*/

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
Generate 30 descriptions for an assault case like in the examples, put them in objects not a function, start from ID (0)-->

<!--do 30 more continuing from ID (0)-->

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

<!--do 30 more continuing from ID (0)-->