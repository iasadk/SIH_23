import axios from "../utils/axios";

export default class service {

    static baseURL = 'ecomm/product/';

    static detailUser(id, data) {
        return axios.get(this.baseURL + 'details/' + id, { params: data });
    }
    static listUser(data) {
        return axios.get(this.baseURL + 'list', { params: data });
    }
    static saveFromCSVUrl(data) {
        return axios.post(this.baseURL + "csv-upload", data);
    }
    static saveUser(data, query) {
        return axios.post(this.baseURL + "save", data, { params: query });
    }
    static deleteUser(id) {
        return axios.post(this.baseURL + 'delete', { ids: id });
    }
    static exportData() {
        return axios.post(this.baseURL + 'export');
    }
}