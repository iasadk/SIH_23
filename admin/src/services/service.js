import axios from "../utils/axios";

export default class service {

    static baseURL = 'service';

    static detailService(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static listService(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static saveService(data, query) {
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
    static deleteService(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
}