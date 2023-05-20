<template>
    <div class="cases-history-container">
        <b-button class="return-button" variant="primary" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="center" align-v="center" class="table-history-cases">
            <div v-if="casesGuilty === 0" class="col-12">
                <h1>No data</h1>
            </div>
            <div v-else class="col-auto">
                <apexchart type="pie" width="450" :options="chartOptions" :series="series"></apexchart>
            </div>
        </b-row>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import VueApexCharts from 'vue-apexcharts';
export default {
    name: 'CasesStatisticsView',
    data() {
        return {
            screenWidth: 0,
            casesGuilty: 0,
            casesNotGuilty: 0,
            series: [],
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Cases Guilty', 'Cases Not Guilty'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        }
    },
    components: {
        apexchart: VueApexCharts,
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
            this.casesGuilty = result;
            this.casesNotGuilty = 100 - this.casesGuilty;
            console.log("result: ", result);
            this.series.push(this.casesGuilty, this.casesNotGuilty);
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