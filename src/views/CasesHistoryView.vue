<template>
    <div>
        <b-button class="return-button" variant="primary" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" class="table-history-cases">
            <div v-if="items.length === 0" class="col-11">
                <h1>No data</h1>
            </div>
            <div v-else-if="screenWidth >= 852" class="col-11">
                <b-table :class="isDark ?'bg-dark text-light' : ''" :items="items" :fields="largeFields">
                    <template v-slot:cell(criminalRecord)="row">
                        <span v-if="row.item.criminalRecord.length > 0">True</span>
                        <span v-else>False</span>
                    </template>
                    <template v-slot:cell(prison)="row">
                        <span v-if="row.item.verdict === 'Guilty'">
                            {{ row.item.prison }}
                        </span>
                        <span v-else>0</span>
                    </template>
                    <template v-slot:cell(probation)="row">
                        <span v-if="row.item.verdict === 'Guilty'">
                            {{ row.item.probation }}
                        </span>
                        <span v-else>0</span>
                    </template>
                    <template v-slot:cell(fine)="row">
                        <span v-if="row.item.verdict === 'Guilty'">
                            {{ row.item.fine }}
                        </span>
                        <span v-else>0</span>
                    </template>
                </b-table>
            </div>
            <div v-else-if="screenWidth < 852 && screenWidth > 670" class="col-11">
                <b-table :class="isDark ?'bg-dark text-light' : ''" :items="items" :fields="largeFields">
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
                <h2>You need to put your phone in landscape mode</h2>
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
            smallFields:[
                "type", "charge", "name", "age", "criminalRecord",
                "verdict", "prison", "probation", "fine"
            ],
            largeFields:[
                "case_id", "type", "charge", "description", "suspect_name", "suspect_age", "criminalRecord",
                "verdict", "prison", "probation", "fine"
            ],
            items: [],
        }
    },
    created() {
        this.setItems();
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
            axios.get("https://spotless-ant-beret.cyclic.app/history")
                .then((res) => {
                    this.items = res.data;
                    console.log("case from bdd: ", res.data);
                })
                .catch((err) => {
                    console.log("axios fetch history cases: ", err);
                })

        }
    }
}
</script>