<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img :src="image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <p>
          {{ modifier.sentence }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modifier", "orientation"],
  computed: {
    image() {
      let imgUrl = "";

      if (this.orientation === "landscape-primary") {
        imgUrl = this.modifier.landscapeImage;
      } else if (this.orientation === "portrait-primary") {
        imgUrl = this.modifier.portraitImage;
      }

      if (process.env.NODE_ENV === "development") {
        imgUrl = "http://localhost:3000/uploads/" + imgUrl;
      }

      return imgUrl;
    }
  }
};
</script>

<style>
</style>