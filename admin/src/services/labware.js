import axios from "../utils/axios";

export default class service {

    static baseURL = 'master';

    static detailUser(id, data) {
        return axios.get(this.baseURL + '/labware/details/' + id, { params: data });
    }
    static listUser(data) {
        return axios.get(this.baseURL + '/labware/list', { params: data });
    }
    static saveUser(data, query) {
        return axios.post(this.baseURL + "/labware/save", data, { params: query });
    }
    static deleteUser(id) {
        return axios.post(this.baseURL + '/labware/delete', { ids: id });
    }
}