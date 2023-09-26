import axios from "../utils/axios";

export default class service {

    static baseURL = 'job';

    static detailUser(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static listUser(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static saveUser(data, query) {
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
    static deleteUser(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
    static listJobApplication(data) {
        return axios.get(this.baseURL + '/applide-job/list', { params: data });
    }
    static deleteJobApplication(id) {
        return axios.post(this.baseURL + '/applide-job/delete', { ids: id });
    }
}