<template>
    <div>
        <b-button variant="primary" class="return-button" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" class="table-history-cases">
            <div class="col-11">
                <b-table :class="isDark ?'bg-dark text-light' : ''" :items="example">
                    <template v-slot:cell(criminalRecord)="row">
                        <span v-if="row.item.criminalRecord.length > 0">True</span>
                        <span v-else>False</span>
                    </template>
                    <template v-slot:cell(prison)="row">
                        <span v-if="row.item.verdict === 'Guilty'">
                            {{ row.item.prison }}
                        </span>
                        <span v-else>False</span>
                    </template>
                    <template v-slot:cell(probation)="row">
                        <span v-if="row.item.verdict === 'Guilty'">
                            {{ row.item.probation }}
                        </span>
                        <span v-else>False</span>
                    </template>
                    <template v-slot:cell(fine)="row">
                        <span v-if="row.item.verdict === 'Guilty'">
                            {{ row.item.fine }}
                        </span>
                        <span v-else>False</span>
                    </template>
                </b-table>
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
                {
                    type: "Criminal",
                    charge: "Murder",
                    description: "The defendant was pulled over for driving with an expired license.",
                    first_name: 'Dickerson',
                    last_name: 'Macdonald',
                    age: 40,
                    criminalRecord: [],
                    verdict: "Guilty",
                    prison: "1 year",
                    probation: "5 year",
                    fine: "15000 $",
                }
            ],
            items: [],
            fields: [
                {
                    key: 'charge',
                    sortable: true
                },
                {
                    key: 'suspect.name',
                    label: "Suspect Name",
                    sortable: true
                },
                {
                    key: 'verdict',
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