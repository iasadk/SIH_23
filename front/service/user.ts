import axios from "@/lib/axios";

export default class user {

    static baseURL = "user";
    static register(data) {
        return axios.post(this.baseURL + '/register', data);
    }
    static login(data) {
        return axios.post(this.baseURL + '/login', data);
    }
    static profile(){
        return axios.get(this.baseURL + '/profile');
        
    }
}