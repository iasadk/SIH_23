import axios from "../utils/axios";

export default class service {

    static baseURL = 'banner';
    // for Banners : 
    static bannerDetails(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static bannerList(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static bannerSave(data, query) {
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
    static bannerDelete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
}