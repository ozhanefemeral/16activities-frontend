import axios from 'axios'

const url = `/api/modifier`

class ModifierService {
    static async CreateModifier(modifierBody) {
        const response = await axios.post(`${url}`, modifierBody);
        return response.data;
    }

    static async DeleteModifier(modifierId) {
        const response = await axios.delete(`${url}/${modifierId}`);
        return response.data;
    }

    static async GetAllModifiers() {
        const response = await axios.get(`${url}/all`)
        return response.data
    }

    static async ApplyModifier(modifierId) {

        const response = await axios.get(`${url}/apply/${modifierId}`);

        return response.data;
    }

    static async UpdateModifier(modifierBody) {
        const response = await axios.patch(`${url}/${modifierBody._id}`, modifierBody);
        return response.data;
    }
}

export default ModifierService;