import axios from "axios";

class ImageService {
    static async GetAllImages() {
        const response = await axios.get(`/images/all`);
        return response.data;
    }

    static async UploadImage(image) {
        let formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(`/images/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(response);

        return response.data;
    }
}

export default ImageService;