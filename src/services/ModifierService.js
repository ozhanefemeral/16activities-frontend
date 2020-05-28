import axios from 'axios'

class ModifierService {
    static async GetAllModifiers() {
        const response = await axios.get('/modifier/all')
        return response.data
    }

    static async GetModifierPhoto(modifierId, orientation) {
        const response = await axios.get(`/modifier/${modifierId}/photo`, { params: { orientation } })
        return response.data;
    }

    static async ApplyModifier(keys, modifierId, orientation) {

        const response = await axios.get(`/modifier/apply/${modifierId}`, {
            params: {
                orientation,
                keys
            }
        });

        return response.data;
    }
}

export default ModifierService;