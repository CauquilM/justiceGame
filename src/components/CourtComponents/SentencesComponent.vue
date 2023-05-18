<template>
  <div v-if="showAllSentences" class="sentences-card">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <div class="row">
        <div class="col-xl-4 col-lg-1 col-md-1"></div>
        <div class="col-xl-3 col-lg-11 col-md-11">
          <p class="card-title"><i class="ti ti-gavel"/>Sentences</p>
        </div>
        <div class="col-xl-5 col-lg-12 col-md-12">
          <b-form-checkbox class="sentences-switch" v-model="customSentences" switch size="lg">
            Custom sentences
          </b-form-checkbox>
        </div>
      </div>
      <div v-if="!customSentences" class="sentences-card-select-flex">
        <b-form-select v-if="chosenCase.type !== 'traffic infraction'" v-model="prisonSelected"
                       :options="chosenCase.prisonSentences"/>
        <b-form-select v-if="chosenCase.type !== 'traffic infraction'" v-model="probationSelected"
                       :options="chosenCase.probationSentences"/>
        <b-form-select v-model="fineSelected" :options="chosenCase.fineSentences"></b-form-select>
        <b-button variant="danger" @click="doSentencing"><i class="ti ti-gavel"/> Sentence</b-button>
      </div>
      <div v-if="customSentences" class="sentences-card-select-flex">
        <b-input-group prepend="Prison">
          <b-form-input v-model="prisonSelected"
            min="0" :max="maxPrison" type="number"/>
        </b-input-group>
        <b-input-group prepend="Probation">
          <b-form-input v-model="probationSelected"
            min="0" :max="maxProbation" type="number"/>
        </b-input-group>
        <b-input-group prepend="Fines $">
          <b-form-input v-model="fineSelected" type="number"
            min="0" :max="maxFine"/>
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
  </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {eventBus} from '../../main';

export default {
  name: 'SentenceComponent',
  data() {
    return {
      customSentences: false,
      maxPrison: 0,
      maxProbation: 0,
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
    ...mapActions(['doSentencing', 'modifyPrisonSelected',
      'modifyProbationSelected', 'modifyFineSelected', 'refreshPage']),
    updateSentences(){
      if(this.chosenCase.charge === 'murder'){
          this.maxPrison = 50;
          this.maxProbation = 10;
          this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'theft'){
        this.maxPrison = 10;
        this.maxProbation = 5;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'fraud'){
        this.maxPrison = 30;
        this.maxProbation = 10;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'assault'){
        this.maxPrison = 10;
        this.maxProbation = 7;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'arson'){
        this.maxPrison = 30;
        this.maxProbation = 10;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'dui'){
        this.maxPrison = 10;
        this.maxProbation = 5;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'recklessDriving'){
        this.maxPrison = 10;
        this.maxProbation = 5;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'drivingNoLicense'){
        this.maxPrison = 5;
        this.maxProbation = 5;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'hitAndRun'){
        this.maxPrison = 15;
        this.maxProbation = 10;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'traffic'){
        this.maxPrison = 2;
        this.maxProbation = 2;
        this.maxFine = 1500;
      }
      else if(this.chosenCase.charge === 'fight'){
        this.maxPrison = 7;
        this.maxProbation = 5;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'escape'){
        this.maxPrison = 12;
        this.maxProbation = 10;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'assaultWithDeadlyWeapon'){
        this.maxPrison = 15;
        this.maxProbation = 8;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'manslaughter'){
        this.maxPrison = 50;
        this.maxProbation = 10;
        this.maxFine = 50000;
      }
      else if(this.chosenCase.charge === 'drugTrafficking'){
        this.maxPrison = 20;
        this.maxProbation = 7;
        this.maxFine = 50000;
      }
    }
  }
}
</script>