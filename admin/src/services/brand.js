import axios from "../utils/axios";

export default class service {

    static baseURL = 'master/';

    static list(data) {
        return axios.get(this.baseURL + "brand/list", { params: data });
    }
    static save(data, query) {
        return axios.post(this.baseURL + "brand/save", data, { params: query });
    }
    static delete(id) {
        return axios.post(this.baseURL + 'brand/delete', { ids: id });
    }
    static details(id) {
        return axios.get(this.baseURL + 'brand/details/' + id);
    }
}