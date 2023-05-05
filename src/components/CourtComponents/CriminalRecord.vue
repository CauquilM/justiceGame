<template>
  <div v-if="!showCriminalRecord" class="criminal-record-card">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><i class="ti ti-folders"/>Proves</p>
      <div class="criminal-record-overflow">
        <b-card class="criminal-record-subcard" :class="isDark ?'bg-dark text-light' : ''" v-for="record in chosenCase.criminalRecord" :key="record.index">
          <p class="criminal-record-card-title">Offense: {{ record.charge }}</p>
          <p>Description: {{ record.description }}</p>
          <p>The fine received was {{ record.fine }}</p>
          <p>The prison sentence was {{ record.sentence }}</p>
        </b-card>
      </div>
    </b-card>
  </div>

</template>
<script>
import {mapState} from "vuex";

export default {
  name: 'CriminalRecord',

  computed: {
    ...mapState(["chosenCase", "isDark", "showCriminalRecord"])
  },
}
</script>