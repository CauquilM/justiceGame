<template>
    <div class="description-display">
        <b-card :class="isDark ?'bg-dark text-light' : ''">
            <p class="card-title"><i class="ti ti-file-description"/>The case</p>
            <p>This a <b>{{ chosenCase.type }}</b> case</p>
            <p>The charge is <b @click="openPenalCodeModal">{{ chosenCase.charge }}</b></p>
            <!--            <p v-if="chosenCase.type === 'traffic infraction'">
                            The charge is <b @click="modifyCharge">{{ chosenCase.charge }}</b>
                        </p>
                        <p v-else>The charge is <b>{{ chosenCase.charge }}</b></p>-->
            <p>The reason of the case is <b>{{ chosenCase.description }}</b></p>
            <p>The suspect is {{ chosenCase.suspect.name }}, he is {{ chosenCase.suspect.age }} years old</p>
        </b-card>
        <ModifyChargeModal/>
        <PenalCodeModal :current-offense="chosenCase.charge" :offense-in-penal-code="chosenCase.penalCodeCharge"/>
    </div>
</template>
<script>
import {mapState} from "vuex";
import {eventBus} from "@/main";
import ModifyChargeModal from "@/components/CourtComponents/ModifyChargeModal.vue";
import PenalCodeModal from "@/components/CourtComponents/PenalCodeModal.vue";

export default {
    name: 'DescriptionComponent',
    components: {PenalCodeModal, ModifyChargeModal},
    computed: {
        ...mapState(["isDark", "chosenCase"])
    },
    methods: {
        openPenalCodeModal() {
            eventBus.$emit('openPenalCodeModal');
        },
        modifyCharge() {
            eventBus.$emit('openModifyChargeModal');
        }
    }
}
</script>