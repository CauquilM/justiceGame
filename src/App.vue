<template>
  <div id="app" :class="isDark ?'bg-dark text-light' : ''">
    <div class="dark-mode-flex">
      <DarkModeSwitch/>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>
<script setup>
import DarkModeSwitch from "@/components/CourtComponents/DarkModeSwitch.vue";
</script>
<script>
import {mapState} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapState(["isDark"])
  }
}
</script>