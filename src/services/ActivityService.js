import axios from 'axios'

class ActivityService {
    static async GetRandomActivity(orientation) {
        const response = await axios.get('/activity/random', { params: { orientation } })
        return response.data
    }

    static async GetActivityById(activityId, orientation) {
        const response = await axios.get(`/activity/${activityId}`, { params: { orientation } })
        return response.data
    }

    static async GetAllActivities() {
        const response = await axios.get('/activity/all')
        return response.data
    }

    static async CreateActivity(activityBody) {
        const response = await axios.post('/activity', activityBody);
        return response.data;
    }
}

export default ActivityService;