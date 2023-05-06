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
            min="0" max="30" type="number"/>
        </b-input-group>
        <b-input-group prepend="Probation">
          <b-form-input v-model="probationSelected"
            min="0" max="10" type="number"/>
        </b-input-group>
        <b-input-group prepend="Fines" append="$">
          <b-form-input v-model="fineSelected" type="number"
            min="0" max="5000"/>
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
      customSentences: false
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
  },
  methods: {
    ...mapActions(['doSentencing', 'modifyPrisonSelected',
      'modifyProbationSelected', 'modifyFineSelected', 'refreshPage'])
  }
}
</script>