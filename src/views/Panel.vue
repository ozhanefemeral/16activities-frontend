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

    <hr />

    <Gallery />
  </div>
</template>

<script>
import Gallery from "../components/Gallery";

export default {
  components: {
    Gallery
  },

  data() {
    return {
      text: ""
    };
  }
};
</script>

<style>
</style>