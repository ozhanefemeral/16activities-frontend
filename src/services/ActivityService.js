import axios from 'axios'

class ActivityService {
    static async GetRandomActivity() {
        const response = await axios.get('/activity/random')
        return response.data
    }

    static async GetAllActivities() {
        const response = await axios.get('/activity/all')
        return response.data
    }
}

export default ActivityService;