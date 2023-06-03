<template>
  <div>
      <b-modal ref="guilty-modal" centered hide-footer
               hide-header-close
               no-close-on-backdrop
               title="Message from the clerk">
          <p class="sentencing-modal-text">{{ judgeComment }}</p>
          <b-button v-if="chosenCase.type === 'parole'" block class="sentencing-modal-button" variant="info"
                    @click="showSentences">
              Let's do
          </b-button>
          <b-button v-else block class="sentencing-modal-button" variant="info"
                    @click="showSentences">
              Let's do
          </b-button>
      </b-modal>
      <b-modal ref="not-guilty-modal" centered hide-footer
               hide-header-close
               no-close-on-backdrop
               title="Message from the clerk">
          <p class="sentencing-modal-text">{{ judgeComment }}</p>
          <b-button v-if="chosenCase.type === 'parole'" block class="sentencing-modal-button" variant="info"
                    @click="refreshPage">
              Case closed
          </b-button>
          <b-button v-else block class="sentencing-modal-button" variant="info"
                    @click="refreshPage">
              🕊️ Freed him, case dismissed
          </b-button>
      </b-modal>
  </div>
</template>
<script>
  import {eventBus} from "@/main";
  import {mapActions, mapState} from "vuex";

  export default {
      name: 'JudgeModals',
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
      computed: {
          ...mapState(["judgeComment", "chosenCase"])
      },
      methods: {
          ...mapActions(["playerDecision", "showSentences", "refreshPage"]),
          goToOffice() {
              eventBus.$emit('openOfficeModal');
          }
      }
  }
</script>