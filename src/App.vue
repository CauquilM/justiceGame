<template>
  <div id="app" :class="isDark ?'bg-dark text-light' : ''">
    <div class="dark-mode-flex">
      <DarkModeSwitch/>
    </div>
    <CourtView/>
  </div>
</template>

<style>

</style>
<script setup>
import CourtView from "@/views/CourtView.vue";
import DarkModeSwitch from "@/components/DarkModeSwitch.vue";
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