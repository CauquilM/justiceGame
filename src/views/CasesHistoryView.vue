<template>
    <div>
        <b-button class="return-button" variant="primary" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" class="table-history-cases">
            <div v-if="screenWidth >= 852" class="col-11">
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
            <div v-else-if="screenWidth < 852 && screenWidth > 670" class="col-11">
                <b-table :class="isDark ?'bg-dark text-light' : ''" :items="example" :fields="fields">
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
            <div v-else class="col-auto">
                <p>You need to put your phone in landscape mode</p>
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
            screenWidth: 0,
            example: [
                {
                    case_id: "12000",
                    type: "Criminal",
                    charge: "Murder",
                    description: "The defendant was pulled over for driving with an expired license.",
                    name: "John Doe",
                    age: 40,
                    criminalRecord: [],
                    verdict: "Guilty",
                    prison: "1 year",
                    probation: "5 year",
                    fine: "15000 $",
                }
            ],
            fields:[
                "type", "charge", "name", "age", "criminalRecord",
                "verdict", "prison", "probation", "fine"
            ],
            items: [],
            isLargeScreen: false
        }
    },
    created() {
        this.setItems();
        console.log("history: ", this.$cookies.get("historicOfCases"));

    },
    mounted() {
        this.updateScreenWidth();
        this.onScreenResize();
    },
    computed: {
        ...mapState(["isDark"])
    },
    methods: {
        onScreenResize() {
            window.addEventListener("resize", () => {
                this.updateScreenWidth();
            });
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
        setItems() {
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