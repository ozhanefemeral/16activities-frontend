<template>
  <div class="container has-text-left" style="padding: 1rem">
    <div class="col is-full has-text-centered">
      <p class="is-size-1 has-text-bolder has-text-black">
        Blogs
      </p>
    </div>
    <hr />
    <div class="content">
      <div class="columns is-multiline">
        <div
          class="column is-one-quarter-desktop"
          v-for="(blog, index) in blogs"
          :key="index"
        >
          <router-link
            :to="{
              name: 'ViewBlog',
              params: { blogId: blog._id, blogName: blog.name }
            }"
          >
            <BlogCard :blog="blog" />
          </router-link>
        </div>
      </div>
      <!-- 
      <div class="columns is-mobile is-multiline">
        <div class="column is-half-mobile is-one-quarter-desktop">1</div>
        <div class="column is-half-mobile is-one-quarter-desktop">2</div>
        <div class="column is-half-mobile is-one-quarter-desktop">3</div>
        <div class="column is-half-mobile is-one-quarter-desktop">4</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import BlogService from "../services/BlogService";
import BlogCard from "../components/BlogCard";
export default {
  components: {
    BlogCard
  },

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