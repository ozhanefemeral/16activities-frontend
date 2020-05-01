<template>
  <span @mouseenter="showLike" @mouseleave="show = false" @focus="showLike">
    <span>
      {{ sentence }}
    </span>
    <span
      v-show="show"
      class="hoverLike"
      :style="{ left: posX + 'px', top: posY / 2 + 'px' }"
    >
      <v-icon color="red">mdi-heart</v-icon>
      {{ likes }}
    </span>
  </span>
</template>

<script>
export default {
  props: ["sentence", "likes", "type"],
  data() {
    return {
      upHere: false,
      posX: 0,
      posY: 0,
      show: false
    };
  },

  methods: {
    showLike(e) {
      console.log(e);
      this.show = true;
      this.posX = e.screenX;
      this.posY = e.screenY;
    }
  }
};
</script>

<style>
.hoverLike {
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 0.5rem;
}
</style>