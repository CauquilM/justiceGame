<template>
    <div class="cases-history-container">
        <b-button class="return-button" variant="primary" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" align-v="center" class="table-history-cases">
            <div class="col-12">
                <h1>No data</h1>
            </div>
        </b-row>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
    name: 'CasesStatisticsView',
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