<template>
  <div>

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