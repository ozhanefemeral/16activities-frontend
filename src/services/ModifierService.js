import axios from 'axios'

class ModifierService {
    static async GetModifiers(type) {
        const response = await axios.get('/modifier/?type=' + type)
        return response.data
    }
}

export default ModifierService;