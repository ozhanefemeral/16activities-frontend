<template>
  <span>
    <v-tooltip bottom color="red">
      <template v-slot:activator="{ on }">
        <span v-on="on" :class="{ 'font-italic': on }">
          {{ sentence }}
        </span>
      </template>
      <span v-on="on" @>
        <v-icon color="white">mdi-heart</v-icon>
        {{ likes }}
      </span>
    </v-tooltip>
  </span>
</template>

<script>
export default {
  props: ["sentence", "likes"]
};
</script>

<style>
</style>