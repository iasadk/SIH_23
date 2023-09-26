import axios from "../utils/axios";

export default class accountService {

    static baseURL = 'pick-up';

    static detail(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static save(data, query) {
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
}