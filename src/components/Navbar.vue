<template>
  <b-navbar class="navbar" role="navigation" aria-label="main navigation">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/activities">
        <b class="is-size-4 has-text-primary">16activities.com</b>
      </b-navbar-item>
    </template>
    <template slot="start" v-if="userType.length > 0">
      <b-navbar-item tag="router-link" to="/activities">
        Aktiviteler
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/activities">
        Troll
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/memes">
        MemeBot 3000
      </b-navbar-item>
    </template>
    <template slot="end" v-if="userType.length > 0">
      <b-navbar-item>
        <b-switch v-model="toggle">Background</b-switch>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      toggle: true
    };
  },

  computed: {
    userType() {
      return this.$store.state.type;
    }
  },

  watch: {
    toggle() {
      this.$store.commit("setUseDynamicBackground", this.toggle);
    }
  }
};
</script>

<style>
</style>