<template>
    <div v-if="showAllSentences" class="sentences-card">
        <b-card :class="isDark ?'bg-dark text-light' : ''">
            <div class="row">
                <div class="col-xl-3 col-lg-1 col-md-1">
                    <b-button variant="info" @click="openPenalCodeModal">?</b-button>
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
                <b-input-group v-if="chosenCase.type !== 'parole'">
                    <b-input-group-prepend @click="prependClicked('prison')">
                        <span class="input-group-text">Prison</span>
                    </b-input-group-prepend>
                    <b-form-input v-model="prisonSelected" :placeholder="prisonSelected"
                                  :max="maxPrison" min="0" type="number"/>
                </b-input-group>
                <b-input-group>
                    <b-input-group-prepend @click="prependClicked('probation')">
                        <span class="input-group-text">Probation</span>
                    </b-input-group-prepend>
                    <b-form-input v-model="probationSelected" :placeholder="probationSelected"
                                  :max="maxProbation" min="0" type="number"/>
                </b-input-group>
                <b-input-group v-if="chosenCase.type !== 'parole'" prepend="Fines $">
                    <b-form-input v-model="fineSelected" :max="maxFine"
                                  min="0" type="number"/>
                </b-input-group>
                <b-button variant="danger" @click="doSentencing"><i class="ti ti-gavel"/> Sentence</b-button>
            </div>
            <b-modal ref="sentencing-success-modal" centered hide-footer
                     hide-header-close
                     no-close-on-backdrop
                     title="Message from the clerk">
                <p class="sentencing-modal-text">{{ finalComment }}</p>
                <b-button block class="sentencing-modal-button" variant="info"
                          @click="refreshPage"><i class="ti ti-prison"/> Bailiff, bring the denfendant
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
        <PenalCodeModal :current-offense="chosenCase.charge" :offense-in-penal-code="chosenCase.penalCodeCharge" />
    </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {eventBus} from '../../main';
import PenalCodeModal from "@/components/CourtComponents/PenalCodeModal.vue";

export default {
    name: 'SentenceComponent',
    components: {PenalCodeModal},
    data() {
        return {
            customSentences: false,
            maxPrison: 0,
            isPrisonYears: true,
            maxProbation: 0,
            isProbationYears: false,
            maxFine: 0
        }
    },
    computed: {
        ...mapState(["showAllSentences", "finalComment", "isDark", "chosenCase"]),
        ...mapGetters(["getPrisonSelected", 'getProbationSelected', 'getFineSelected']),
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
    },
    methods: {
        ...mapActions([/*'doSentencing',*/ 'modifyPrisonSelected',
            'modifyProbationSelected', 'modifyFineSelected', 'refreshPage']),
        openPenalCodeModal() {
            eventBus.$emit('openPenalCodeModal');
        },
        prependClicked(sentence){
            console.log("clicked: ", this.isPrisonYears);
           if(sentence === 'prison'){
               if(this.isPrisonYears === true){
                   this.prisonSelected = "months";
                   this.isPrisonYears = false;
               }
               else{
                   this.prisonSelected = "years";
                   this.isPrisonYears = true;
               }
           } else{
               if(this.isProbationYears === true){
                   this.probationSelected = "months";
                   this.isProbationYears = false;
               }
               else{
                   this.probationSelected = "years";
                   this.isProbationYears = true;
               }
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