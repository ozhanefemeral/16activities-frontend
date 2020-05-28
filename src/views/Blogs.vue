<template>
  <div class="container has-text-left">
    <div class="col is-full has-text-centered">
      <p class="is-size-1 has-text-bolder">
        Blogs
      </p>
    </div>
    <hr />
    <div class="content">
      <ul>
        <li v-for="(blog, index) in blogs" :key="index">
          <router-link
            :to="{
              name: 'ViewBlog',
              params: { blogId: blog._id, blogName: blog.name }
            }"
          >
            {{ blog.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BlogService from "../services/BlogService";
export default {
  data() {
    return {
      blogs: []
    };
  },
  created() {
    this.getAllBlogs();
  },
  methods: {
    getAllBlogs() {
      BlogService.GetAllBlogs().then(blogs => {
        this.blogs = blogs;
      });
    }
  }
};
</script>

<style>
</style>