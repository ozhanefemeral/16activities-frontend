<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <b-button
          type="is-primary"
          @click="$router.push('/panel/create-activity')"
        >
          Create Activity
        </b-button>
      </div>
      <div class="column">
        <b-button type="is-primary" @click="$router.push('/panel/create-test')">
          Create Quiz
        </b-button>
      </div>
      <div class="column">
        <b-button type="is-primary" @click="$router.push('/panel/create-blog')">
          Create Blog
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>