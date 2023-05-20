<template>
    <div class="judge-bench">
        <b-card :class="isDark ?'bg-dark text-light' : ''">
            <p class="card-title" @click="$router.push('/history')">
                <b-avatar :src="require('@/assets/characters-logo/judge.jpg')"/>
                Judge
            </p>
            <div class="mt-3">
                <div v-if="chosenCase.type === 'parole'" class="judge-buttons">
                    <b-button ref="guilty-btn" variant="danger" @click="playerDecision('guilty')">Refuse parole</b-button>
                    <b-button variant="success" @click="playerDecision('not guilty')">Accept parole</b-button>
                </div>
                <div v-else-if="!pleaDealExists && juryExists">
                    <b-button v-if="juryDecision === 'guilty'" class="jury-btn" ref="guilty-btn"
                              @click="playerDecision('guilty')">Jury decision
                    </b-button>
                    <b-button v-if="juryDecision === 'not guilty'" class="jury-btn"
                              @click="playerDecision('not guilty')">Jury decision
                    </b-button>
                </div>
                <div v-else class="judge-buttons">
                    <b-button ref="guilty-btn" variant="danger" @click="playerDecision('guilty')">Guilty</b-button>
                    <b-button variant="success" @click="playerDecision('not guilty')">Not guilty</b-button>
                </div>
                <PleaDealComponent v-if="chosenCase.type !== 'parole'"/>
            </div>
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
        </b-card>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {eventBus} from '../../main';
import PleaDealComponent from "@/components/CourtComponents/PleaDealComponent.vue";

export default {
    name: 'JudgeComponent',
    components: {PleaDealComponent},
    computed: {
        ...mapState(["judgeComment", "isDark", "pleaDealExists" ,"juryExists", "juryDecision", "chosenCase"])
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