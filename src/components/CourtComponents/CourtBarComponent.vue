<template>
  <div class="court-bar" v-if="showCourtBar">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><i class="ti ti-folders"/>Court's Bar</p>
      <div>
        <p class="slow-spelling">Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Amet impedit nostrum
          perspiciatis repellendus similique voluptates?</p>
      </div>
    </b-card>
  </div>
</template>
<script>
  import {mapState} from "vuex";

  export default {
    name: "CourtBarComponent",
    computed: {
      ...mapState(["isDark", "showCourtBar"])
    }
  }
</script>