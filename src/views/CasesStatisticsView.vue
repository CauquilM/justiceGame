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

export default {
    name: 'CasesStatisticsView',
    data() {
        return {
            screenWidth: 0,
            casesGuilty: 0,
            casesNotGuilty: 0
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
                if (this.historicalCases[i].verdict === "Guilty") {
                    result++
                }
            }
            result = ((result * 100) / this.historicalCases.length);
            console.log("result: ", result.toFixed(2));
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