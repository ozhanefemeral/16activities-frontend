import axios from "axios";

const url = '/api/memes'

class MemeService {
    static async GetAllMemes() {
        const response = await axios.get(`${url}/all`);
        return response.data;
    }

    static async UploadMemes(images, memeBody) {
        let formData = new FormData();

        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            formData.append('images', image)
        }


        formData.append('memeBody', JSON.stringify(memeBody));

        const response = await axios.post(`${url}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    }

    static async GetRandomMeme(forTypes, nsfw = false) {
        if (forTypes.length === 0) {
            forTypes = ['Everyone']
        }

        const response = await axios.get(`${url}/random`, { params: { forTypes, nsfw } })
        return response.data
    }

    static async GiveReaction(memeId, reaction, undo = false) {
        const response = await axios.post(`${url}/${memeId}/react`, { reaction, undo })
        return response.data
    }
}

export default MemeService;