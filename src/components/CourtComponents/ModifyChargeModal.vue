<template>
    <b-modal ref="modify-charge-modal" centered hide-footer title="Message from the clerk">
        <p><i class="ti ti-book-2"/> Which charge to choose ?</p>
        <b-form-select v-model="selectedOption" :options="options"/>
        <b-button :disabled="!choiceIsValid" block variant="danger"
                  class="mt-3"
                  @click="modifyChargeInStore(selectedOption)">Confirm</b-button>
    </b-modal>
</template>
<script>
import {eventBus} from "@/main";
import {mapActions} from "vuex";

export default {
    name: 'ModifyChargeModal',
    data() {
        return {
            options: [
                {value: null, text: 'Please select an offense'},
                {value: 'recklessDriving', text: 'Reckless driving'},], // Dynamic options
            selectedOption: null, // Selected option
        };
    },
    created() {
        console.log("options: ", this.options)
        eventBus.$on('openModifyChargeModal', () => {
            this.$refs["modify-charge-modal"].show();
        });
        eventBus.$on('closeModifyChargeModal', () => {
            this.$refs["modify-charge-modal"].hide();
        });
    },
    computed: {
        choiceIsValid() {
            return this.selectedOption !== null;
        },
    },
    methods: {
        ...mapActions(["modifyChargeInStore"])
    }
}
</script>