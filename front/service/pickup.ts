import axios from "@/lib/axios";

export default class pickupService {

    static baseURL = "pick-up";
    static save(data) {
        return axios.post(this.baseURL + '/save', data);
    }
}