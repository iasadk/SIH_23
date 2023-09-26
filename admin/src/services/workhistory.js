import axios from "../utils/axios";

export default class service {

    static baseURL = 'workhistory';

    static listWorkHistory(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
}