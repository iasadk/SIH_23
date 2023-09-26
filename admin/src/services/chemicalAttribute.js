import axios from "../utils/axios";

export default class service {

    static save(data, query) {
        return axios.post("chemical-attribute/save", data, { params: query });
    }
    static details(id) {
        return axios.get('chemical-attribute/details/' + id);
    }
}