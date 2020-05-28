<template>
  <div>
    <Navbar @toggleBackground="toggleBackground" />
    <img v-if="showImage" id="bg" :src="imageURL" alt="" srcset="" />

    <router-view @updateBackground="setBackground"></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data: function() {
    return {
      imageURL: "",
      showImage: true
    };
  },
  methods: {
    setBackground(url) {
      this.imageURL = url;
    },

    toggleBackground() {
      console.log("toggleBackground");
      this.showImage = !this.showImage;
    }
  }
};
</script>

<style>
.container {
  text-align: center;
  padding: 3rem;
}
#bg {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  max-height: 100vh;
  object-fit: cover;
  filter: brightness(0.35);
}
</style>