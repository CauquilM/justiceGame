<template>
    <b-form-checkbox :class="isDark ?'bg-dark text-light' : ''" v-model="isDark" switch size="lg">
      {{isDark ? 'Dark' : 'Light'}}
    </b-form-checkbox>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";

  export default {
    name: 'DarkModeSwitch',
    computed: {
      ...mapState(["isDark"]),
      ...mapGetters(["getIsDark"]),
      isDark: {
        get(){
          return this.getIsDark;
        },
        set(value){
          return this.modifyDarkMode(value)
        }
      }
    },
    methods: {
      ...mapActions(["modifyDarkMode"])
    }
  }
</script>