import axios from "../utils/axios";

export default class service {

    static baseURL = 'master';

    static detailUser(id, data) {
        return axios.get(this.baseURL + '/gas/details/' + id, { params: data });
    }
    static listUser(data) {
        return axios.get(this.baseURL + '/gas/list', { params: data });
    }
    static saveUser(data, query) {
        return axios.post(this.baseURL + "/gas/save", data, { params: query });
    }
    static deleteUser(id) {
        return axios.post(this.baseURL + '/gas/delete', { ids: id });
    }
}