<template>
  <div>
      <b-row align-h="center" align-v="center">
          <div class="col-8">
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
          </div>
          <div>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
              <i class="jury-member ti ti-user"/>
          </div>
      </b-row>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: "JuryComponent",
    computed: {
        ...mapState(["isDark"])
    }
}
</script>