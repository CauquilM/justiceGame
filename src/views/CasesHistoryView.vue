<template>
    <div>
        <b-button variant="primary" class="return-button" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" class="table-css">
            <div class="col-8">
                <b-table :class="isDark ?'bg-dark text-light' : ''" :items="items.judgedCase"/>
            </div>
        </b-row>
    </div>
</template>
<script>
import {mapState} from "vuex";
import axios from "axios";
export default {
    name: 'CasesHistoryView',
    data() {
        return {
            example: [
                {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'}
            ],
            items: [],
            fields: [
                {
                    key: 'type',
                    sortable: true
                },
                {
                    key: 'trafficCharge',
                    label: 'Person age',
                    sortable: true
                },
                {
                    key: 'suspect.name',
                    label: "Suspect Name",
                    sortable: true
                },

            ],
        }
    },
    created() {
        this.setItems();
        console.log("history: ", this.$cookies.get("historicOfCases"));
    },
    computed: {
        ...mapState(["isDark"])
    },
    methods: {
        setItems(){
            axios.get("http://localhost:3000/history")
                .then((res) => {
                    console.log("here: ", res.data);
                    this.items = res.data;
                    console.log("case from store: ", res.data);
                })
                .catch((err) => {
                    console.log("axios fetch history cases: ", err);
                })

        }
    }
}
</script>