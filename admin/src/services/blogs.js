import axios from "../utils/axios";

export default class service {

    static list(data) {
        return axios.get("blog/list", { params: data });
    }
    static save(data, query) {
        return axios.post("blog/save", data, { params: query });
    }
    static delete(id) {
        return axios.post('blog/delete', { ids: id });
    }
    static details(id) {
        return axios.get('blog/details/' + id);
    }
}