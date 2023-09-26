import axios from "../utils/axios";

export default class categoryImageService {

    static baseURL = 'category-image';
    static categoryImageDetails(id, data) {
        return axios.get(this.baseURL + '/details/' + id, { params: data });
    }
    static categoryImageList(data) {
        return axios.get(this.baseURL + '/list', { params: data });
    }
    static categoryImageSave(data, query) {
        return axios.post(this.baseURL + "/save", data, { params: query });
    }
    static categoryImageDelete(id) {
        return axios.post(this.baseURL + '/delete', { ids: id });
    }
}