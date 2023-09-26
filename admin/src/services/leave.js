import axios from "../utils/axios";

export default class service {

    static baseURL = 'leave';

    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static detail(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static save(data, config) {
        return axios.post(this.baseURL + "/save", data, config);
    }
    static approve(id, data) {
        return axios.post(this.baseURL + "/approve/" + id, data);
    }
}