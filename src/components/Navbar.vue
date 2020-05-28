<template>
  <b-navbar class="navbar" role="navigation" aria-label="main navigation">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">
        <b class="is-size-4 has-text-primary">16activities.com</b>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/activities">
        Activities
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/blogs">
        Blogs
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item @click="toggleBackground">
        Clear Background
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    toggleBackground() {
      this.$emit("toggleBackground");
    }
  }
};
</script>

<style>
</style>