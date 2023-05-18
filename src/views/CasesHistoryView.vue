<template>
    <div class="cases-history-container">
        <b-button class="return-button" variant="primary" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" align-v="center" class="table-history-cases">
            <div v-if="historicalCases.length === 0" class="col-11">
                <h1>No data</h1>
            </div>
            <div v-else-if="screenWidth >= 852" class="col-11">
                <b-row align-h="end">
                    <div class="col-2 mb-4">
                        <b-button v-if="!deleteButton" variant="danger" @click="securityDelete">Delete all data
                        </b-button>
                        <b-button v-if="deleteButton" variant="danger" @click="deleteAll">Really ?</b-button>
                    </div>
                </b-row>
                <b-table :class="isDark ?'bg-dark text-light' : ''" :fields="largeFields" :items="historicalCases">
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
                <b-row align-h="end">
                    <div class="col-3 mb-4">
                        <b-button v-if="!deleteButton" variant="danger" @click="securityDelete">Delete all data
                        </b-button>
                        <b-button v-if="deleteButton" variant="danger" @click="deleteAll">Really ?</b-button>
                    </div>
                </b-row>
                <b-table :class="isDark ?'bg-dark text-light' : ''" :fields="smallFields" :items="historicalCases">
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
            <div v-else class="col-auto">
                <h2>You need to put your phone in landscape mode</h2>
            </div>
        </b-row>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
    name: 'CasesHistoryView',
    data() {
        return {
            deleteButton: false,
            screenWidth: 0,
            smallFields: [
                "type", "charge", "suspect_name", "suspect_age", "criminalRecord",
                "verdict", "prison", "probation", "fine"
            ],
            largeFields: [
                "case_id", "type", "charge", "description", "suspect_name", "suspect_age", "criminalRecord",
                "verdict", "prison", "probation", "fine"
            ],
        }
    },
    mounted() {
        this.updateScreenWidth();
        this.onScreenResize();
        this.stats();
    },
    computed: {
        ...mapState(["historicalCases", "isDark"])
    },
    methods: {
        ...mapActions(["getHistoricalCases"]),
        stats() {
            console.log("debug: ", this.historicalCases.length);
            let result = 0;
            for (let i = 0; i < this.historicalCases.length; i++) {
                console.log("enter for");
                if (this.historicalCases[i].verdict === "Guilty") {
                    result++
                    console.log("enetr for if");
                }
            }
            result = ((result * 100) / this.historicalCases.length);
            console.log(result.toFixed(2
            ));
        },
        securityDelete() {
            this.deleteButton = true;
        },
        deleteAll() {
            console.log("before axios");
            axios.delete("https://spotless-ant-beret.cyclic.app/history")
                .then((res) => {
                    console.log("delete: ", res);
                    this.deleteButton = false;
                    this.getHistoricalCases();
                })
                .catch((e) => {
                    console.log("delete error: ", e);
                })
        },
        onScreenResize() {
            window.addEventListener("resize", () => {
                this.updateScreenWidth();
            });
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        }
    }
}
</script>