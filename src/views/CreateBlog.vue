<template>
  <div class="container has-text-left">
    <b-field label="Blog Name">
      <b-input v-model="name"></b-input>
    </b-field>
    <vue-editor v-model="content" />
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
          this.$router.push('Blogs')
        }
      );
    }
  }
};
</script>