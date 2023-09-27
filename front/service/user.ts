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
    static trackWasteOrder(){
        return axios.get(this.baseURL + '/track-order');
        
    }
    static trackWasteHistory(){
        return axios.get(this.baseURL + '/get-waste-history');
        
    }
}