<template>
  <div class="description-display">
    <b-card>
      <p class="card-title"><i class="ti ti-file-description"/>The case</p>
      <p>This a <b>{{ chosenCase.type }}</b> case</p>
      <p>The reason of the case is <b>{{ chosenCase.description }}</b></p>
      <p>The suspect is {{ chosenCase.suspect.name }}, he is {{ chosenCase.suspect.age }} years old</p>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'DescriptionComponent',
  props: {
    chosenCase: Object
  }
}
</script>