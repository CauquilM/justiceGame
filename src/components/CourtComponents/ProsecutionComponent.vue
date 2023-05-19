<template>
    <div class="prosecution-table">
        <b-card :class="isDark ?'bg-dark text-light' : ''">
            <p class="card-title">
                <b-avatar :src="require('@/assets/characters-logo/juror_1.jpg')"/>
                Prosecution
            </p>
            <p v-if="prosecutionComment !== ''">
                {{ prosecutionComment }}
            </p>
            <div v-if="showAllSentences">
                <p v-if="chosenCase.type === 'traffic infraction'">
                    <span v-if="prosecutionSentences[0].fine !== 0">Your Honor, I would like to request a fine of {{
                        prosecutionSentences[0].fine
                        }}$ for the defendant's traffic infraction,
                    as they were driving above the speed limit and posing a danger to other drivers on the road.</span>
                    <span v-else>Your Honor, I don't request any fine.</span>
                </p>
                <p v-else-if="chosenCase.type === 'parole'">
                    <span v-if="prosecutionSentences[0].probation !== 0"><br/><br/>I would like to ask a probation period
                        of {{ prosecutionSentences[0].probation }} years.</span>
                    <span v-else><br/><br/>I request no probation time</span>
                </p>
                <p v-else>
                    Your Honor, considering the severity of the crime committed and the evidence presented,
                    <span v-if="prosecutionSentences[0].prison !== 0">I would like to ask for a prison sentence,
                        of {{ prosecutionSentences[0].prison }} years,</span>
                    <span v-else><br/><br/>I request no prison time</span>
                    <span v-if="prosecutionSentences[1].probation !== 0"><br/><br/>Followed by a probation period
                        of {{ prosecutionSentences[1].probation }} years.</span>
                    <span v-else><br/><br/>I request no probation time</span>
                    <span v-if="prosecutionSentences[2].fine !== 0"><br/><br/>Additionally, I would ask for a fine
                        of {{ prosecutionSentences[2].fine }}$ dollars to be imposed on the defendant.</span>
                    <span v-else><br/><br/>I don't request any fine</span>
                    <span><br/><br/>Thank you.</span>
                </p>
            </div>
        </b-card>
    </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: 'ProsecutionComponent',
    computed: {
        ...mapState(["prosecutionComment", "prosecutionSentences", "showAllSentences", "chosenCase", "isDark"])
    }
}
</script>