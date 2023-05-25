<template>
    <b-modal ref="penalcode-modal" centered hide-footer
             title="Message from the clerk">
        <p style="text-align: center">The sentence for {{ currentOffense }}</p>
        <div class="penal-code-modal-container">
            <div>
                <p><i class="ti ti-book-2"/> Minimum :</p>
                <p><i class="ti ti-prison"/>Imprisonment of {{ offenses[offenseInPenalCode].prison_min }} years </p>
                <p><i class="ti ti-accessible-off"/>Probation of {{ offenses[offenseInPenalCode].probation_min }} years </p>
                <p><i class="ti ti-currency-dollar"/>Fine of {{ offenses[offenseInPenalCode].fine_min }}$ </p>
            </div>
            <div>
                <p> <i class="ti ti-book-2"/>Maximum :</p>
                <p><i class="ti ti-prison"/>Imprisonment of {{ offenses[offenseInPenalCode].prison_max }} years </p>
                <p><i class="ti ti-accessible-off"/>Probation of {{ offenses[offenseInPenalCode].probation_max }} years </p>
                <p><i class="ti ti-currency-dollar"/>Fine of {{ offenses[offenseInPenalCode].fine_max }}$ </p>
            </div>
        </div>
    </b-modal>
</template>
<script>
import {eventBus} from "@/main";
import offenses from '@/data_cases/penal_code/offenses.json'

export default {
    name: "PenalCodeModal",
    data() {
        return {
            offenses: undefined
        }
    },
    props: {
        currentOffense: {
            type: String,
            required: true
        },
        offenseInPenalCode: {
            type: String,
            required: true
        }
    },
    created() {
        eventBus.$on('openPenalCodeModal', () => {
            this.$refs["penalcode-modal"].show();
        });
        eventBus.$on('closePenalCodeModal', () => {
            this.$refs["penalcode-modal"].hide();
        });
        this.offenses = offenses;
    },
    methods: {
        goToRoutes(route) {
            this.$router.push(route);
            eventBus.$emit('closeOfficeModal');
        }
    }
}
</script>