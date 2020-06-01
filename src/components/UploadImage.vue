<template>
  <section>
    <b-field>
      <b-upload v-model="file" @input="uploadImage">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <p>Upload</p>
        </a>
      </b-upload>
    </b-field>
  </section>
</template>

<script>
import ImageService from "../services/ImageService";
export default {
  data() {
    return {
      file: {}
    };
  },
  methods: {
    uploadImage() {
      ImageService.UploadImage(this.file).then(() => {
        this.$emit("uploaded");
      });
    }
  }
};
</script>