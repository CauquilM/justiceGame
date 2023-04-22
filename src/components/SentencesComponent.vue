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
      <b-modal id="sentencing-success-modal" centered hide-footer
               no-close-on-backdrop
               hide-header-close
               title="Message from the clerk">
        <p class="sentencing-modal-text">{{ finalComment }}</p>
        <b-button block class="sentencing-modal-button" variant="warning"
                  @click="finishCase">My bad<i class="ti ti-brain"/></b-button>
      </b-modal>
      <b-modal id="sentencing-failed-modal" centered hide-footer
               no-close-on-backdrop
               hide-header-close
               title="Message from the clerk">
        <p class="sentencing-modal-text">Judge ! You need to fill all sentencing choices</p>
        <b-button block class="sentencing-modal-button" variant="warning"
                  @click="$bvModal.hide('sentencing-failed-modal')">My bad<i class="ti ti-brain"/></b-button>
      </b-modal>
    </b-card>
  </div>
</template>
<script>
  import {mapState} from "vuex";

  export default {
    name: 'SentenceComponent',
    computed: {
      ...mapState(["showAllSentences", "finalComment"])
    },
    props: {
      chosenCase: Object
    }
  }
</script>