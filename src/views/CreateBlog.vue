<template>
  <div class="container has-text-left">
    <b-field label="Blog Name">
      <b-input v-model="name"></b-input>
    </b-field>
    <Gallery
      style="margin-bottom: 1rem"
      target="image"
      @imageSelected="onImageSelected"
      showFileName="true"
    />
    <vue-editor
      id="editor"
      use-custom-image-handler
      @image-added="handleImageAdded"
      v-model="content"
    >
    </vue-editor>
    <hr />
    <b-button
      type="is-success"
      :disabled="name.length < 5 || content.length < 1"
      @click="publishBlog"
      ><b>Yayınla!</b>
    </b-button>
  </div>
</template>

<script>
import BlogService from "../services/BlogService";
import ImageService from "../services/ImageService";
import Gallery from "../components/Gallery";

export default {
  components: {
    Gallery
  },

  data() {
    return {
      name: "",
      content: "",
      image: ""
    };
  },

  methods: {
    publishBlog() {
      BlogService.PublishBlog({
        name: this.name,
        content: this.content,
        image: this.image
      }).then(() => {
        this.$router.push("Blogs");
      });
    },

    handleImageAdded: function(file, Editor, cursorLocation) {
      ImageService.UploadImage(file).then(filename => {
        this.$buefy.dialog.alert("Uploaded");
        if (process.env.NODE_ENV === "development") {
          Editor.insertEmbed(
            cursorLocation,
            "image",
            "http://localhost:3000/uploads/" + filename
          );
        }
      });
    },

    onImageSelected(image, target) {
      this[target] = image;
    }
  }
};
</script>