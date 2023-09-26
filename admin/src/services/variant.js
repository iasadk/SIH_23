import axios from "../utils/axios";

export default class service {

    static baseURL = 'ecomm/variant/';

    static detailUser(id, data) {
        return axios.get(this.baseURL + 'details/' + id, { params: data });
    }
    static listUser(data) {
        return axios.get(this.baseURL + 'list', { params: data });
    }
    static saveUser(data, query) {
        return axios.post(this.baseURL + "save", data, { params: query });
    }
    static deleteUser(id) {
        return axios.post(this.baseURL + 'delete', { ids: id });
    }
}