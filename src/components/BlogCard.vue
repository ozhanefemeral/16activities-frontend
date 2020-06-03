<template>
  <div class="card" style="padding-bottom: 1rem">
    <div class="card-image">
      <center>
        <figure class="image">
          <img :src="image" alt="" />
        </figure>
      </center>
    </div>
    <center>
      <p class="title">{{ blog.name }}</p>
    </center>
  </div>
</template>

<script>
export default {
  props: ["blog"],

  computed: {
    image() {
      if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000/uploads/" + this.blog.image;
      } else {
        return this.blog.image;
      }
    }
  }
};
</script>

<style>
</style>