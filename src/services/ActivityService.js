import axios from 'axios'

const url = `/api/activity`

class ActivityService {
    static async GetRandomActivity() {
        const response = await axios.get(`${url}/random`)
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

    static async UpdateActivity(activityBody) {
        const response = await axios.patch(`${url}/${activityBody._id}`, activityBody);
        return response.data;
    }
}

export default ActivityService;