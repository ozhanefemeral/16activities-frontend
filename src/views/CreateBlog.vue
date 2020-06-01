<template>
  <div class="container has-text-left">
    <b-field label="Blog Name">
      <b-input v-model="name"></b-input>
    </b-field>
    <vue-editor
      id="editor"
      use-custom-image-handler="true"
      @image-Added="handleImageAdded"
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

export default {
  data() {
    return {
      name: "",
      content: ""
    };
  },

  methods: {
    publishBlog() {
      BlogService.PublishBlog({ name: this.name, content: this.content }).then(
        published => {
          console.log(published);
          this.$router.push("Blogs");
        }
      );
    },

    handleImageAdded: function(file, Editor, cursorLocation) {
      console.log('handleImageAdded');
      
      console.log(file);
      ImageService.UploadImage(file).then(url => {
        this.$buefy.dialog.alert("Uploaded");
        Editor.insertEmbed(cursorLocation, "image", url);
      });
    }
  }
};
</script>