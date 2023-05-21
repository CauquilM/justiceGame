<template>
    <div class="cases-history-container">
        <b-button class="return-button" variant="primary" @click="$router.push('/')">
            <i class="ti ti-arrow-back"/>
        </b-button>
        <b-row align-h="around" align-v="center" class="table-history-cases">
            <div v-if="casesGuilty === 0" class="col-12">
                <h1>No data</h1>
            </div>
            <div class="col-auto">
                <apexchart :options="casesChartOptions" :series="casesSeries" type="pie" width="450"/>
            </div>
            <div class="col-auto">
                <apexchart :options="typeOfCasesChartOptions" :series="typeOfCasesSeries" type="pie" width="450"/>
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
            casesSeries: [],
            typeOfCasesSeries: [],
            casesChartOptions: {
                title: {
                    text: 'Pourcentage of verdict',
                    align: 'center'
                },
                chart: {
                    foreColor: 'white',
                    width: 380,
                    type: 'pie',
                },
                legend:
                    {
                        position: 'bottom',
                    },
                labels: ['Cases Guilty', 'Cases Not Guilty'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
            typeOfCasesChartOptions: {
                title: {
                    text: 'Types of cases',
                    align: 'center'
                },
                chart: {
                    foreColor: 'white',
                    width: 380,
                    type: 'pie',
                },
                fill: {
                    colors: ['#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#009688', '#FFC107']
                },
                colors: ['#F44336', '#E91E63', '#9C27B0', '#03A9F4', '#009688', '#FFC107'],
                legend:
                    {
                        position: 'bottom'
                    },
                labels: ['Parole', 'Criminal', 'Traffic crimes', 'Prison', 'Felony', 'Traffic infraction'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 350
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
            let parole = 0;
            let criminal = 0;
            let road = 0;
            let prison = 0;
            let traffic = 0;
            let felony = 0;
            let verdict = 0;

            for (let i = 0; i < this.historicalCases.length; i++) {

                if (this.historicalCases[i].type === "parole") {
                    parole++
                }

                if (this.historicalCases[i].type === "criminal") {
                    criminal++
                }

                if (this.historicalCases[i].type === "traffic crime") {
                    road++
                }

                if (this.historicalCases[i].type === "prison case") {
                    prison++
                }

                if (this.historicalCases[i].type === "felony") {
                    console.log("felony");
                    felony++
                }

                if (this.historicalCases[i].type === "traffic infraction") {
                    traffic++
                }

                if (this.historicalCases[i].verdict === "Guilty") {
                    verdict++
                }
            }
            verdict = ((verdict * 100) / this.historicalCases.length);
            this.casesGuilty = verdict;
            this.casesNotGuilty = 100 - this.casesGuilty;
            console.log("verdict: ", verdict);
            this.casesSeries.push(this.casesGuilty, this.casesNotGuilty);
            this.typeOfCasesSeries.push(parole, criminal, road, prison, felony, traffic);
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