import axios from "../utils/axios";

export default class service {

    static detail(id, data) {
        return axios.get('/faq/details/' + id, { params: data });
    }
    static list(data) {
        return axios.get('/faq/list', { params: data });
    }
    static save(data, query) {
        return axios.post("/faq/save", data, { params: query });
    }
    static delete(id) {
        return axios.post('/faq/delete', { ids: id });
    }
}