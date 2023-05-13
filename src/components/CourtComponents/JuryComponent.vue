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
    data(){
      return {
          juryExists: true
      }
    },
    created() {
        this.juryDecision();
    },
    computed: {
        ...mapState(["isDark"])
    },
    methods: {
        juryDecision() {
            console.log("jury: ", Math.floor(Math.random() * 100));
        }
    }
}
</script>