import axios from "../utils/axios";

export default class service {

    static baseURL = 'master';

    static detailUser(id, data) {
        return axios.get(this.baseURL + '/lab-instrument/details/' + id, { params: data });
    }
    static listUser(data) {
        return axios.get(this.baseURL + '/lab-instrument/list', { params: data });
    }
    static saveUser(data, query) {
        return axios.post(this.baseURL + "/lab-instrument/save", data, { params: query });
    }
    static deleteUser(id) {
        return axios.post(this.baseURL + '/lab-instrument/delete', { ids: id });
    }
}