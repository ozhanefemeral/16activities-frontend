import axios from 'axios'

class BlogService {
    static async GetAllBlogs() {
        const response = await axios.get('/blogs/all');
        return response.data;
    }

    static async PublishBlog(blogBody) {
        const response = await axios.post('/blogs/', blogBody);
        return response.data;
    }

    static async GetBlogById(blogId) {
        const response = await axios.get(`/blogs/${blogId}`);
        return response.data;
    }
}

export default BlogService