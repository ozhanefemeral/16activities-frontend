import axios from 'axios'

const url = `/api/modifier`

class ModifierService {
    static async CreateModifier(modifierBody) {
        const response = await axios.post(`${url}`, modifierBody);
        return response.data;
    }

    static async GetAllModifiers() {
        const response = await axios.get(`${url}/all`)
        return response.data
    }

    static async ApplyModifier(keys, modifierId) {

        const response = await axios.get(`${url}/apply/${modifierId}`, {
            params: {
                keys
            }
        });

        return response.data;
    }
}

export default ModifierService;