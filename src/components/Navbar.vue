<template>
  <b-navbar class="navbar" role="navigation" aria-label="main navigation">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">
        <b class="is-size-4 has-text-primary">16activities.com</b>
      </b-navbar-item>
    </template>
    <template slot="start" v-if="userType.length > 0">
      <b-navbar-item tag="router-link" to="/activities">
        Activities
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/blogs">
        Blogs
      </b-navbar-item>
    </template>
    <template slot="end" v-if="userType.length > 0">
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item tag="router-link" to="/panel">Panel</b-navbar-item>
      <b-navbar-item>
        <b-switch v-model="toggle">Default</b-switch>
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
    },
  },

  watch: {
    toggle(){
      this.$store.commit('setUseDynamicBackground', this.toggle);
    }
  }
};
</script>

<style>
</style>