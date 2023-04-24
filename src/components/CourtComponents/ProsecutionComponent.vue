<template>
  <div class="prosecution-table">
    <b-card :class="isDark ?'bg-dark text-light' : ''">
      <p class="card-title"><i class="ti ti-user-exclamation"/>Prosecution</p>
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