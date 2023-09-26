import axios from "../utils/axios";

export default class service {

    static baseURL = 'master/';

    static list(data) {
        return axios.get("setting/list", { params: data });
    }
    static save(data, query) {
        return axios.post("setting/save", data, { params: query });
    }
    static delete(id) {
        return axios.post('setting/delete', { ids: id });
    }
    static details(id) {
        return axios.get('setting/details/' + id);
    }
}