import axios from "../utils/axios";

export default class service {

    static baseURL = 'application';

    static detail(data) {

        return axios.get(this.baseURL + '/details/' + data.type, { params: data });
    }
    static list(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static save(data, query) {
        console.log(data)
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
    static delete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
}