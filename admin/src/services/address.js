import axios from "../utils/axios";

export default class service {

    static baseURL = 'user';

    static detailJob(id, data) {
        return axios.get(this.baseURL + '/address/details' + id, { params: data });
    }
    static listJob(data) {
        return axios.get(this.baseURL + '/address/list', { params: data });
    }
    static saveJob(data, query) {
        return axios.post(this.baseURL + '/address/save', data, { params: query });
    }
    static deleteJob({_id}) {
        return axios.delete(this.baseURL + '/address/delete/' + _id);
    }
}