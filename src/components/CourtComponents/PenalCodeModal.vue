<template>
    <b-modal ref="penalcode-modal" centered hide-footer
             title="Message from the clerk">
        <b-form-checkbox style="margin: 0 0 10px 75%" v-model="showYearsSentences" switch>
            {{showYearsSentences ? 'Years' : 'Months'}}
        </b-form-checkbox>
        <p style="text-align: center">The sentence for {{ currentOffense }}</p>
        <div v-if="showYearsSentences" class="penal-code-modal-container">
            <div>
                <p><i class="ti ti-book-2"/> Minimum :</p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-prison"/>Imprisonment of {{ offenses[offenseInPenalCode].prison_min }} years </p>
                <p><i class="ti ti-accessible-off"/>Probation of {{ offenses[offenseInPenalCode].probation_min }} years </p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-currency-dollar"/>Fine of {{ offenses[offenseInPenalCode].fine_min }}$ </p>
            </div>
            <div>
                <p> <i class="ti ti-book-2"/>Maximum :</p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-prison"/>Imprisonment of {{ offenses[offenseInPenalCode].prison_max }} years </p>
                <p><i class="ti ti-accessible-off"/>Probation of {{ offenses[offenseInPenalCode].probation_max }} years </p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-currency-dollar"/>Fine of {{ offenses[offenseInPenalCode].fine_max }}$ </p>
            </div>
        </div>
        <div v-else class="penal-code-modal-container">
            <div>
                <p><i class="ti ti-book-2"/> Minimum :</p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-prison"/>Imprisonment of {{ offenses[offenseInPenalCode].prison_months_min }} months </p>
                <p><i class="ti ti-accessible-off"/>Probation of {{ offenses[offenseInPenalCode].probation_months_min }} months </p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-currency-dollar"/>Fine of {{ offenses[offenseInPenalCode].fine_min }}$ </p>
            </div>
            <div>
                <p> <i class="ti ti-book-2"/>Maximum :</p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-prison"/>Imprisonment of {{ offenses[offenseInPenalCode].prison_months_max }} months </p>
                <p><i class="ti ti-accessible-off"/>Probation of {{ offenses[offenseInPenalCode].probation_months_max }} months </p>
                <p v-if="offenseInPenalCode !== 'parole'"><i class="ti ti-currency-dollar"/>Fine of {{ offenses[offenseInPenalCode].fine_max }}$ </p>
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
            offenses: undefined,
            showYearsSentences: true
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