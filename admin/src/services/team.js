import axios from "../utils/axios";

export default class accountService {

    static baseURL = 'team';

    static detail(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static save(data) {
        return axios.post(this.baseURL + "/save", data);
    }
    static delete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }


}