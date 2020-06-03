import axios from "axios";

const url = '/api/images'

class ImageService {
    static async GetAllImages() {
        const response = await axios.get(`${url}/all`);
        return response.data;
    }

    static async UploadImage(image) {
        let formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(`${url}/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    }
}

export default ImageService;