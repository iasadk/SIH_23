import axios from "../utils/axios";

export default class service {

    static baseURL = 'offer';

    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static save(data, query) {
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
    static delete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
    static details(id) {
        return axios.get(this.baseURL + '/details/' + id);
    }
}