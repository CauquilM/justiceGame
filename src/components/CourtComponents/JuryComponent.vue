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
import {mapState} from "vuex";

export default {
    name: "JuryComponent",
    data() {
        return {
            juryExists: false
        }
    },
    created() {
        this.createJury();
    },
    computed: {
        ...mapState(["isDark"])
    },
    methods: {
        juryDecision() {
            let randomDecision = Math.floor(Math.random() * 100);
            if (randomDecision >= 67) {
                console.log("Not guilty");
            }
            else {
                console.log("Guilty");
            }
        },
        createJury() {
            let random = Math.floor(Math.random() * 11);
            if (random >= 0) {
                this.juryExists = true;
                this.juryDecision();
            }
        }
    }
}
</script>