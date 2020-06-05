<template>
  <div>
    <Navbar />
    <img
      v-if="useDynamicBackground"
      id="bg"
      :src="backgroundUrl"
      alt=""
      srcset=""
    />
    <router-view></router-view>
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
      imageURL: ""
    };
  },

  computed: {
    useDynamicBackground() {
      return this.$store.state.useDynamicBackground;
    },

    backgroundUrl() {
      return this.$store.state.backgroundUrl;
    }
  }
};
</script>

<style>
.container {
  padding: 3rem;
}
#bg {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  max-height: 100vh;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4);
}
</style>