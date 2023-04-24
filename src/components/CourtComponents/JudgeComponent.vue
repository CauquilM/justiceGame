<template>
  <div class="judge-bench">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><i class="ti ti-gavel"/>Judge</p>
      <div class="judge-buttons">
        <b-button variant="danger" ref="guilty-btn" @click="playerDecision('guilty')">Guilty</b-button>
        <b-button variant="success" @click="playerDecision('not guilty')">Not guilty</b-button>
      </div>
      <b-modal ref="guilty-modal" centered hide-footer
               hide-header-close
               no-close-on-backdrop
               title="Message from the clerk">
        <p class="sentencing-modal-text">{{ judgeComment }}</p>
        <b-button block class="sentencing-modal-button" variant="info"
                  @click="showSentences">
          Let's do</b-button>
      </b-modal>
      <b-modal ref="not-guilty-modal" centered hide-footer
               no-close-on-backdrop
               hide-header-close
               title="Message from the clerk">
        <b-button block class="sentencing-modal-button" variant="info"
                  @click="refreshPage">
          🕊️ Freed him, case dismissed</b-button>
      </b-modal>
    </b-card>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import { eventBus } from '../../main';
  export default {
    name: 'JudgeComponent',
    computed:{
      ...mapState(["judgeComment", "isDark"])
    },
    mounted() {
      eventBus.$on('openGuiltyModal', () => {
        this.$refs["guilty-modal"].show();
      });
      eventBus.$on('closeGuiltyModal', () => {
        this.$refs["guilty-modal"].hide();
      });
      eventBus.$on('openNotGuiltyModal', () => {
        this.$refs["not-guilty-modal"].show();
      });
    },
    methods: {
      ...mapActions(["playerDecision", "showSentences", "refreshPage"]),
    }
  }
</script>