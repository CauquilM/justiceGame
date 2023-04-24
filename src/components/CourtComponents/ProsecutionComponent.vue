<template>
  <div class="prosecution-table">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><b-avatar :src="require('@/assets/characters-logo/juror_1.jpg')"/>Prosecution</p>
      <p v-if="prosecutionComment !== ''">
        {{ prosecutionComment }}
      </p>
    </b-card>
  </div>
</template>
<script>
  import {mapState} from "vuex";

  export default {
    name: 'ProsecutionComponent',
    computed: {
      ...mapState(["prosecutionComment", "isDark"])
    }
  }
</script>