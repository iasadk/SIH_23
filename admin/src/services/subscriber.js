import axios from "../utils/axios";

export default class subscriberService {

    static baseURL = 'subscribe';

    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static delete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
}