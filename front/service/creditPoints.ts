import axios from "@/lib/axios";

export default class creditPoints {

    static baseURL = "credit-point";
    static calculateCredits() {
        return axios.get(this.baseURL + '/list');
    }
}