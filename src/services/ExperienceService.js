import axios from "axios";

class ExperienceService {
    static async GetRandomExperience() {
        const response = await axios.get('/experience/random')
        return response.data;
    }

    static async GetAllExperiences() {
        const response = await axios.get('/experience/all')
        return response.data;
    }

    static async CreateExperience(expBody) {
        const response = await axios.post('/experience', expBody);
        return response.data;
    }
}

export default ExperienceService;