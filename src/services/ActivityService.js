import axios from 'axios'

const url = `/api/activity`

class ActivityService {
    static async GetRandomActivity(orientation) {
        const response = await axios.get(`${url}/random`, { params: { orientation } })
        return response.data
    }

    static async GetActivityById(activityId, orientation) {
        const response = await axios.get(`${url}/${activityId}`, { params: { orientation } })
        return response.data
    }

    static async GetAllActivities() {
        const response = await axios.get(`${url}/all`)
        return response.data
    }

    static async CreateActivity(activityBody) {
        const response = await axios.post(`${url}`, activityBody);
        return response.data;
    }
}

export default ActivityService;