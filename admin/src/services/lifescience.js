import axios from "../utils/axios";

export default class service {

    static baseURL = 'master/';

    static list(data) {
        return axios.get(this.baseURL + "life-science/list", { params: data });
    }
    static save(data, query) {
        return axios.post(this.baseURL + "life-science/save", data, { params: query });
    }
    static delete(id) {
        return axios.post(this.baseURL + 'life-science/delete', { ids: id });
    }
    static details(id) {
        return axios.get(this.baseURL + 'life-science/details/' + id);
    }
}