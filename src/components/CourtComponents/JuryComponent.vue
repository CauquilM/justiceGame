<template>
    <div v-if="juryExists">
        <b-row align-h="center" align-v="center">
            <div class="col-8">
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
            </div>
            <div>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
                <i class="jury-member ti ti-user"/>
            </div>
        </b-row>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "JuryComponent",
    created() {
        this.createJury();
    },
    computed: {
        ...mapState(["isDark", "pleaDealExists", "juryExists", "chosenCase"])
    },
    methods: {
        ...mapActions(["toggleJury", "getJuryDecision"]),
        juryDecision() {
            let randomDecision = Math.floor(Math.random() * 100);
            if (randomDecision >= 67) {
                console.log("jury not guilty");
                return "not guilty";
            }
            else {
                console.log("jury guilty");
                return "guilty";
            }
        },
        createJury() {
            let random = Math.floor(Math.random() * 11);
            if (!this.pleaDealExists && random >= 9) {
                this.toggleJury();
                this.getJuryDecision(this.juryDecision());
            }
        }
    }
}
</script>