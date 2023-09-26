import axios from "../utils/axios";

export default class service {

    static baseURL = 'file';

    static get(url) {
        return axios.get("../" + url);
    }
    static save(data, config) {
        return axios.post(this.baseURL + "/save", data, config);
    }
    static remove(data) {
        return axios.post(this.baseURL + "/remove", data);
    }
}