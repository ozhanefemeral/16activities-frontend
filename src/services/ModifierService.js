import axios from 'axios'

const url = `/api/modifier`

class ModifierService {
    static async GetAllModifiers() {
        const response = await axios.get(`${url}/all`)
        return response.data
    }

    static async GetModifierPhoto(modifierId, orientation) {
        const response = await axios.get(`${url}/${modifierId}/photo`, { params: { orientation } })
        return response.data;
    }

    static async ApplyModifier(keys, modifierId, orientation) {

        const response = await axios.get(`${url}/apply/${modifierId}`, {
            params: {
                orientation,
                keys
            }
        });

        return response.data;
    }
}

export default ModifierService;