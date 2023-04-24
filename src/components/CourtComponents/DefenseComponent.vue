<template>
  <div class="defense-table">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><b-avatar :src="require('@/assets/characters-logo/juror_4.jpg')"/>Defense</p>
      <p v-if="defenseComment !== ''">
        {{ defenseComment }}
      </p>
    </b-card>
  </div>
</template>
<script>
  import {mapState} from "vuex";

  export default {
    name: 'DefenseComponent',
    computed: {
      ...mapState(["defenseComment", "isDark"])
    }
  }
</script>