<template>
  <section>
    <b-button
      icon-right="image"
      class="button is-primary is-medium"
      @click="openGallery"
    />

    <span
      style="margin-left: 1rem"
      v-if="showFileName == 'true' && selectedImageIndex"
      class="has-text-success"
    >
      {{
        images[selectedImageIndex].replace("http://localhost:3000/uploads/", "")
      }}
    </span>

    <b-modal :active.sync="showGalleryModal" scroll="keep">
      <div class="card" style="border-radius: 10px">
        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline has-text-centered">
              <div
                class="column is-3"
                v-for="(image, index) in images"
                :key="index"
                :class="index == selectedImageIndex ? 'selected' : ''"
              >
                <div @click="changeSelected(index)">
                  <img :src="image" style="max-height: 100px" />
                </div>
              </div>
            </div>

            <hr />

            <div class="buttons">
              <b-button
                :type="selectedImageIndex != NaN ? 'is-primary' : 'is-disabled'"
                @click="select"
              >
                Select
              </b-button>
              <UploadImage @uploaded="getAllImages" />
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import ImageService from "../services/ImageService";
import UploadImage from "../components/UploadImage";

export default {
  components: {
    UploadImage
  },

  name: "Gallery",

  props: ["choiceIndex", "resultIndex", "emitName", "target", "showFileName"],

  data() {
    return {
      showGalleryModal: false,
      images: [],
      selectedImageIndex: NaN
    };
  },

  methods: {
    openGallery() {
      this.getAllImages();
      this.showGalleryModal = true;
      console.log(this.target);
    },

    getAllImages() {
      ImageService.GetAllImages().then(images => {
        if (process.env.NODE_ENV === "development") {
          this.images = images.map(
            item => "http://localhost:3000/uploads/" + item
          );
        } else {
          this.images = images.map(item => "/uploads/" + item);
        }
      });
    },

    changeSelected(index) {
      this.selectedImageIndex = index;
    },

    select() {
      this.$emit(
        "imageSelected",
        this.images[this.selectedImageIndex].replace(
          "http://localhost:3000/uploads/",
          ""
        ),
        this.target
      );
      this.showGalleryModal = false;
    }
  }
};
</script>

<style>
.selected {
  background-color: rgb(35, 209, 96);
}
</style>