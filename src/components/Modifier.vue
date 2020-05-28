<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img :src="imageURL" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-3">
          {{ modifier.sentence }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ModifierService from "../services/ModifierService";
export default {
  props: ["modifier"],
  data: function() {
    return {
      imageURL: ""
    };
  },
  created() {
    ModifierService.GetModifierPhoto(
      this.modifier._id,
      "landscape-primary"
    ).then(result => {
      this.imageURL = result.photo;
    });
  }
};
</script>

<style>
</style>