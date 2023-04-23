<template>
  <div class="sentences-card" v-if="showAllSentences">
    <b-card>
      <p class="card-title"><i class="ti ti-gavel"/>Sentences</p>
      <div class="sentences-card-select-flex">
        <b-form-select v-model="prisonSelected" :options="chosenCase.prisonSentences"></b-form-select>
        <b-form-select v-model="probationSelected" :options="chosenCase.probationSentences"></b-form-select>
        <b-form-select v-model="fineSelected" :options="chosenCase.fineSentences"></b-form-select>
        <b-button variant="danger" @click="doSentencing"><i class="ti ti-gavel"/> Sentence</b-button>
      </div>
      <b-modal ref="sentencing-success-modal" centered hide-footer
               no-close-on-backdrop
               hide-header-close
               title="Message from the clerk">
        <p class="sentencing-modal-text">{{ finalComment }}</p>
        <b-button block class="sentencing-modal-button" variant="info"
                  @click="$refs['sentencing-success-modal'].hide()"><i class="ti ti-prison"/> Bailiff, bing the denfendant</b-button>
      </b-modal>
      <b-modal ref="sentencing-failed-modal" centered hide-footer
               no-close-on-backdrop
               hide-header-close
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
  import { eventBus } from '../main';
  export default {
    name: 'SentenceComponent',
    data(){
      return {
      }
    },
    computed: {
      ...mapState(["showAllSentences", "finalComment"]),
      ...mapGetters(["getPrisonSelected", 'getProbationSelected', 'getFineSelected']),
      prisonSelected: {
        get(){
          return this.getPrisonSelected;
        },
        set(value){
          return this.modifyPrisonSelected(value);
        }
      },
      probationSelected: {
        get(){
          return this.getProbationSelected;
        },
        set(value){
          return this.modifyProbationSelected(value);
        }
      },
      fineSelected: {
        get(){
          return this.getFineSelected;
        },
        set(value){
          return this.modifyFineSelected(value);
        }
      }
    },
    props: {
      chosenCase: Object
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
      ...mapActions(['doSentencing', 'modifyPrisonSelected', 'modifyProbationSelected', 'modifyFineSelected'])
    }
  }
</script>