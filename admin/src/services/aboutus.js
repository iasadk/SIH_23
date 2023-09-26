import axios from "../utils/axios";

export default class aboutService {

    static baseURL = 'aboutus';

    static detail(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static save(data) {
        return axios.post(this.baseURL + "/save", data);
    }
    static delete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
}