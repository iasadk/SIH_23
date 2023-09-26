import axios from "../utils/axios";

export default class service {

    static baseURL = 'worker';

    static detailWorker(id, data) {
        return axios.get(this.baseURL + '/details-worker/' + id, { params: data });
    }
    static listWorker(data) {
        return axios.get(this.baseURL + '/list-worker', { params: data });
    }
    static saveWorker(data, query) {
        return axios.post(this.baseURL + "/save-worker", data, { params: query });
    }
    static deleteWorker(id) {
        return axios.post(this.baseURL + '/delete-worker', { ids: id });
    }
}