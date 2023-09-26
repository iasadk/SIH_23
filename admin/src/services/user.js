import axios from "../utils/axios";

export default class service {

    static baseURL = 'user';

    static listUser(data) {
        return axios.get(this.baseURL + '/list-user', { params: data });
    }
 
}