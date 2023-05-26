<template>
  <div class="penal-code-view-container">
      <h1>Penal code page</h1>
      <p>Click on an offense to see details</p>
      <div class="mt-5 penal-code-view-div">
          <div v-for="offense in offenses" :key="offense.offense_charge">
              <p>{{ offense.offense_charge }}</p>
          </div>
      </div>
  </div>
</template>
<script>
import offenses from "@/data_cases/penal_code/offenses.json"
  export default {
      name: 'PenalCodeView',
      data(){
          return {
              offenses: undefined
          }
      },
      created() {
          this.offenses = offenses;
          console.log(offenses)
      }
  }
</script>