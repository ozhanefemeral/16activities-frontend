import axios from 'axios'

const url = `/api/blogs`

class BlogService {
    static async GetAllBlogs() {
        const response = await axios.get(`${url}/all`);
        return response.data;
    }

    static async PublishBlog(blogBody) {
        const response = await axios.post(`${url}`, blogBody);
        return response.data;
    }

    static async GetBlogById(blogId) {
        const response = await axios.get(`${url}/${blogId}`);
        return response.data;
    }
}

export default BlogService