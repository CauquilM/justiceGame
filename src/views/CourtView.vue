<template>
    <div class="game-container">
        <b-row align-h="around" align-v="center" class="game-container-first-row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-3">
                <JudgeComponent/>
            </div>
            <div class="col-lg-2">
                <div v-if="chosenCase.type !=='parole'">
                    <JuryComponent v-if="chosenCase.type !== 'traffic infraction' && !pleaDealExists"/>
                </div>
            </div>
        </b-row>

        <div class="others-container">

            <div class="switchable-components">
                <SentenceComponent/>

                <CourtBarComponent/>
                <CriminalRecord v-if="screenWidth > 540"/>
            </div>

            <div class="others-div">
                <DefenseComponent v-if="screenWidth > 540"/>

                <DescriptionComponent/>

                <DefenseComponent v-if="screenWidth < 540"/>

                <CriminalRecord v-if="screenWidth < 540"/>

                <AllProvesComponent/>

                <ProsecutionComponent/>
            </div>
        </div>
    </div>
</template>

<script>

import JudgeComponent from "@/components/CourtComponents/JudgeComponent.vue";
import SentenceComponent from "@/components/CourtComponents/SentencesComponent.vue";
import DefenseComponent from "@/components/CourtComponents/DefenseComponent.vue";
import DescriptionComponent from "@/components/CourtComponents/DescriptionComponent.vue";
import ProsecutionComponent from "@/components/CourtComponents/ProsecutionComponent.vue";
import {mapActions, mapState} from "vuex";
import AllProvesComponent from "@/components/CourtComponents/AllProvesComponent.vue";
import CourtBarComponent from "@/components/CourtComponents/CourtBarComponent.vue";
import CriminalRecord from "@/components/CourtComponents/CriminalRecord.vue";
import JuryComponent from "@/components/CourtComponents/JuryComponent.vue";

export default {
    name: 'HomeView',
    components: {
        JuryComponent,
        CriminalRecord,
        CourtBarComponent,
        AllProvesComponent,
        ProsecutionComponent, DescriptionComponent, DefenseComponent, SentenceComponent, JudgeComponent
    },
    data() {
        return {
            screenWidth: 0,
        }
    },
    created() {
        this.displayCase()
        console.log("proc: ", this.prosecutionSentences);
    },
    mounted() {
        this.updateScreenWidth();
        this.onScreenResize();
    },
    computed: {
        ...mapState(["chosenCase", 'prosecutionSentences', 'pleaDealExists'])
    },
    methods: {
        ...mapActions(["displayCase"]),
        onScreenResize() {
            window.addEventListener("resize", () => {
                this.updateScreenWidth();
            });
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
    }
}
</script>