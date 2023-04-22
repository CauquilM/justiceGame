<template>
  <div class="judge-bench">
    <b-card>
      <p class="card-title"><i class="ti ti-gavel"/>Judge</p>
      <div class="judge-buttons">
        <b-button variant="danger" @click="playerDecision('guilty')">Guilty</b-button>
        <b-button variant="success" @click="playerDecision('not guilty')">Not guilty</b-button>
      </div>
      <b-modal id="guilty-modal" centered hide-footer
               hide-header-close
               no-close-on-backdrop
               title="Message from the clerk">
        <p class="sentencing-modal-text">{{ judgeComment }}</p>
        <b-button block class="sentencing-modal-button" variant="info"
                  @click="showSentences">
          Let's do</b-button>
      </b-modal>
      <b-modal id="not-guilty-modal" centered hide-footer
               no-close-on-backdrop
               hide-header-close
               title="Message from the clerk">
        <b-button block class="sentencing-modal-button" variant="info"
                  @click="$bvModal.hide('not-guilty-modal')">
          🕊️ Freed him, case dismissed</b-button>
      </b-modal>
    </b-card>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

  export default {
    name: 'JudgeComponent',
    computed:{
      ...mapState(["judgeComment"])
    },
    methods: {
      ...mapActions(["playerDecision"])
    }
  }
</script>