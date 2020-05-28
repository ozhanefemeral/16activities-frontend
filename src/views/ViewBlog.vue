<template>
  <div class="container has-text-left" style="padding: .5rem">
    <div class="column is-full has-text-centered">
      <p class="is-size-1">{{ blog.name }}</p>
    </div>
    <hr />
    <div class="content">
      <span v-html="blog.content"></span>
    </div>
  </div>
</template>

<script>
import BlogService from "../services/BlogService";
export default {
  data() {
    return {
      blogId: NaN,
      blog: {}
    };
  },

  created() {
    this.blogId = this.$route.params.blogId;
    this.getBlogById();
  },

  methods: {
    getBlogById() {
      BlogService.GetBlogById(this.blogId).then(blog => {
        this.blog = blog;
      });
    }
  }
};
</script>

<style>
</style>