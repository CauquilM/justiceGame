<template>
    <div class="judge-bench">
        <b-card :class="isDark ?'bg-dark text-light' : ''">
            <p class="card-title" @click="goToOffice">
                <b-avatar :src="require('@/assets/characters-logo/judge.jpg')"/><span>Judge</span>
            </p>
            <div class="mt-3">
                <div v-if="!pleaDealExists && chosenCase.type === 'parole'" class="judge-buttons">
                    <b-button ref="guilty-btn" variant="danger" @click="playerDecision('guilty')">Refuse parole
                    </b-button>
                    <b-button variant="success" @click="playerDecision('not guilty')">Accept parole</b-button>
                </div>
                <div v-else-if="!pleaDealExists && juryExists">
                    <b-button v-if="juryDecision === 'guilty'" ref="guilty-btn" class="jury-btn"
                              @click="playerDecision('guilty')">Jury decision
                    </b-button>
                    <b-button v-if="juryDecision === 'not guilty'" class="jury-btn"
                              @click="playerDecision('not guilty')">Jury decision
                    </b-button>
                </div>
                <PleaDealComponent class="mt-2" v-else-if="chosenCase.type !== 'parole'"/>
                <div v-if="!pleaDealExists && !juryExists && chosenCase.type === 'immigration'" class="judge-buttons">
                    <b-button ref="guilty-btn" variant="danger" @click="playerDecision('guilty')">Deport</b-button>
                    <b-button variant="success" @click="playerDecision('not guilty')">Grant Legal Status</b-button>
                </div>
                <div v-else-if="!pleaDealExists && !juryExists && chosenCase.type !== 'parole'" class="judge-buttons">
                    <b-button ref="guilty-btn" variant="danger" @click="playerDecision('guilty')">Guilty</b-button>
                    <b-button variant="success" @click="playerDecision('not guilty')">Not guilty</b-button>
                </div>
            </div>
        </b-card>
        <JudgeModals/>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {eventBus} from '../../main';
import PleaDealComponent from "@/components/CourtComponents/PleaDealComponent.vue";
import JudgeModals from "@/components/CourtComponents/JudgeModals.vue";

export default {
    name: 'JudgeComponent',
    components: {JudgeModals, PleaDealComponent},
    computed: {
        ...mapState(["isDark", "pleaDealExists", "juryExists", "juryDecision", "chosenCase"])
    },
    methods: {
        ...mapActions(["playerDecision", "refreshPage"]),
        goToOffice() {
            eventBus.$emit('openOfficeModal');
        }
    }
}
</script>