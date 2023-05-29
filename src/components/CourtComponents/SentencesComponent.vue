<template>
    <div v-if="showAllSentences" class="sentences-card">
        <b-card :class="isDark ?'bg-dark text-light' : ''">
            <div class="row">
                <div class="col-xl-3 col-lg-1 col-md-1">
                </div>
                <div class="col-xl-5 col-lg-11 col-md-11">
                    <p class="card-title"><i class="ti ti-gavel"/>Sentences</p>
                </div>
                <div class="col-xl-4 col-lg-12 col-md-12">
                    <b-form-checkbox v-model="customSentences" class="sentences-switch" size="lg" switch>
                        Custom sentences
                    </b-form-checkbox>
                </div>
            </div>
            <div v-if="!customSentences" class="sentences-card-select-flex">
                <b-form-select v-if="chosenCase.type !== 'traffic infraction' && chosenCase.type !== 'parole'"
                               v-model="prisonSelected"
                               :options="chosenCase.prisonSentences"/>
                <b-form-select v-if="chosenCase.type !== 'traffic infraction'" v-model="probationSelected"
                               :options="chosenCase.probationSentences"/>
                <b-form-select v-if="chosenCase.type !== 'parole'" v-model="fineSelected"
                               :options="chosenCase.fineSentences"></b-form-select>
                <b-button variant="danger" @click="doSentencing"><i class="ti ti-gavel"/> Sentence</b-button>
            </div>
            <div v-if="customSentences" class="sentences-card-select-flex">
                <b-input-group :state="prisonIsValid ? null : false"
                               :aria-describedby="prisonIsValid ? null : 'prison-error'"
                               v-if="chosenCase.type !== 'parole'">
                    <b-input-group-prepend @click="changePrisonTime">
                        <span class="input-group-text">Prison</span>
                    </b-input-group-prepend>
                    <b-form-input v-model="prisonSelected"
                                  :placeholder="prisonSelected" min="0" type="number"/>
                </b-input-group>
                <small v-if="!prisonIsValid" id="prison-error" class="form-text text-danger">{{ errors.prisonSelected }}</small>

                <b-input-group :state="probationIsValid ? null : false"
                               :aria-describedby="probationIsValid ? null : 'probation-error'">
                    <b-input-group-prepend @click="changeProbationTime">
                        <span class="input-group-text">Probation</span>
                    </b-input-group-prepend>
                    <b-form-input v-model="probationSelected"
                                  :placeholder="probationSelected" min="0" type="number"/>
                </b-input-group>
                <small v-if="!probationIsValid" id="probation-error" class="form-text text-danger">{{ errors.probationSelected }}</small>

                <b-input-group :state="fineIsValid ? null : false"
                               :aria-describedby="fineIsValid ? null : 'fine-error'"
                               v-if="chosenCase.type !== 'parole'" prepend="Fines $">
                    <b-form-input v-model="fineSelected"
                                  min="0" type="number"/>
                </b-input-group>
                <small v-if="!fineIsValid" id="fine-error" class="form-text text-danger">{{ errors.fineSelected }}</small>

                <b-button :disabled="!customIsValid" variant="danger" @click="doSentencing({isPrisonYears, isProbationYears})">
                    <i class="ti ti-gavel"/> Sentence
                </b-button>
            </div>
            <b-modal ref="sentencing-success-modal" centered hide-footer
                     hide-header-close
                     no-close-on-backdrop
                     title="Message from the clerk">
                <p class="sentencing-modal-text">{{ finalComment }}</p>
                <b-button block class="sentencing-modal-button" variant="info"
                          @click="refreshPage"><i class="ti ti-prison"/> Bailiff, bring the defendant
                </b-button>
            </b-modal>
            <b-modal ref="sentencing-failed-modal" centered hide-footer
                     hide-header-close
                     no-close-on-backdrop
                     title="Message from the clerk">
                <p class="sentencing-modal-text">Judge ! You need to fill all sentencing choices</p>
                <b-button block class="sentencing-modal-button" variant="warning"
                          @click="$refs['sentencing-failed-modal'].hide()">My bad<i class="ti ti-brain"/></b-button>
            </b-modal>
        </b-card>
    </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {eventBus} from '../../main';
import offenses from '@/data_cases/penal_code/offenses.json'

export default {
    name: 'SentenceComponent',
    data() {
        return {
            customSentences: false,
            isPrisonYears: true,
            isProbationYears: true,
            errors: {},
            offenses: undefined
        }
    },
    watch: {
        prisonSelected() {
            this.errors.prisonSelected = this.prisonIsValid ? '' : 'Invalid prison time, watch penal code.';
        },
        probationSelected() {
            this.errors.probationSelected = this.probationIsValid ? '' : 'Invalid probation time, watch penal code.';
        },
        fineSelected() {
            this.errors.fineSelected = this.fineIsValid ? '' : 'Invalid fine amount, watch penal code.';
        }
    },
    computed: {
        ...mapState(["showAllSentences", "finalComment", "isDark", "chosenCase"]),
        ...mapGetters(["getPrisonSelected", 'getProbationSelected', 'getFineSelected']),
        prisonIsValid() {
            const value = parseInt(this.prisonSelected);
            if(this.offenses.prison_min == 99){
                return true;
            }
            if (this.isPrisonYears === true) {
                return value >= this.offenses.prison_min && value <= this.offenses.prison_max;
            }
            else {
                return value >= this.offenses.prison_months_min && value <= this.offenses.prison_months_max;
            }
        },
        probationIsValid() {
            const value = parseInt(this.probationSelected);
            if (this.isProbationYears === true) {
                return value >= this.offenses.probation_min && value <= this.offenses.probation_max;
            }
            else {
                return value >= this.offenses.probation_months_min && value <= this.offenses.probation_months_max;
            }
        },
        fineIsValid() {
            if(this.offenses.prison_min == 99){
                return true;
            }
            const value = parseInt(this.fineSelected);
            return value >= this.offenses.fine_min && value <= this.offenses.fine_max;
        },
        customIsValid(){
            console.log("custom: ", this.prisonIsValid && this.probationIsValid && this.fineIsValid);
            return this.prisonIsValid && this.probationIsValid && this.fineIsValid;
        },
        prisonSelected: {
            get() {
                return this.getPrisonSelected;
            },
            set(value) {
                return this.modifyPrisonSelected(value);
            }
        },
        probationSelected: {
            get() {
                return this.getProbationSelected;
            },
            set(value) {
                return this.modifyProbationSelected(value);
            }
        },
        fineSelected: {
            get() {
                return this.getFineSelected;
            },
            set(value) {
                return this.modifyFineSelected(value);
            }
        }
    },
    mounted() {
        eventBus.$on('openSuccessModal', () => {
            this.$refs["sentencing-success-modal"].show();
        });
        eventBus.$on('openSentencingFailModal', () => {
            this.$refs["sentencing-failed-modal"].show();
        });
        this.updateSentences();
        this.offenses = offenses[this.chosenCase.penalCodeCharge];
    },
    methods: {
        ...mapActions(['doSentencing', 'modifyPrisonSelected',
            'modifyProbationSelected', 'modifyFineSelected', 'refreshPage']),
        openPenalCodeModal() {
            eventBus.$emit('openPenalCodeModal');
        },
        changePrisonTime() {
            if (this.isPrisonYears === true) {
                this.prisonSelected = "months";
                this.isPrisonYears = false;
            } else {
                this.prisonSelected = "years";
                this.isPrisonYears = true;
            }
        },
        changeProbationTime() {
            if (this.isProbationYears === true) {
                this.probationSelected = "months";
                this.isProbationYears = false;
            } else {
                this.probationSelected = "years";
                this.isProbationYears = true;
            }
        },
        updateSentences() {
            if (this.chosenCase.charge === 'murder') {
                this.maxPrison = 50;
                this.maxProbation = 10;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'theft') {
                this.maxPrison = 10;
                this.maxProbation = 5;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'fraud') {
                this.maxPrison = 30;
                this.maxProbation = 10;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'assault') {
                this.maxPrison = 10;
                this.maxProbation = 7;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'arson') {
                this.maxPrison = 30;
                this.maxProbation = 10;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'dui') {
                this.maxPrison = 10;
                this.maxProbation = 5;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'recklessDriving') {
                this.maxPrison = 10;
                this.maxProbation = 5;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'drivingNoLicense') {
                this.maxPrison = 5;
                this.maxProbation = 5;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'hitAndRun') {
                this.maxPrison = 15;
                this.maxProbation = 10;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'traffic') {
                this.maxPrison = 2;
                this.maxProbation = 2;
                this.maxFine = 1500;
            } else if (this.chosenCase.charge === 'fight') {
                this.maxPrison = 7;
                this.maxProbation = 5;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'escape') {
                this.maxPrison = 12;
                this.maxProbation = 10;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'assaultWithDeadlyWeapon') {
                this.maxPrison = 15;
                this.maxProbation = 8;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'manslaughter') {
                this.maxPrison = 50;
                this.maxProbation = 10;
                this.maxFine = 50000;
            } else if (this.chosenCase.charge === 'drugTrafficking') {
                this.maxPrison = 20;
                this.maxProbation = 7;
                this.maxFine = 50000;
            }
        }
    }
}
</script>