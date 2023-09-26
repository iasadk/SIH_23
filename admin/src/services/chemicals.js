import axios from "../utils/axios";

export default class service {

    static baseURL = 'master/';

    static list(data) {
        return axios.get(this.baseURL + "chemical/list", { params: data });
    }
    static save(data, query) {
        return axios.post(this.baseURL + "chemical/save", data, { params: query });
    }
    static delete(id) {
        return axios.post(this.baseURL + 'chemical/delete', { ids: id });
    }
    static details(id) {
        return axios.get(this.baseURL + 'chemical/details/' + id);
    }
}