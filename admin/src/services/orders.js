import axios from "../utils/axios";

export default class accountService {
    static baseURL = 'ecomm/order';

  static orderDetails(id, data) {
    return axios.get(this.baseURL +"/details/" + id, { params: data });
  }
  static orderList(data) {
    return axios.get(this.baseURL +"/list", { params: data });
  }
  static orderSave(data, query) {
    return axios.post(this.baseURL +"/save", data, { params: query });
  }
  static orderDelete(id) {
    return axios.post(this.baseURL +"/delete", { ids: id });
  }

  static downloadCSV() {
    return axios.post(this.baseURL + '/csv-download');
}

  static orderDetailDetails(id, data) {
    return axios.get(this.baseURL +"/orderDetail/details/" + id, {
      params: data,
    });
  }
  static orderDetailList(data) {
    return axios.get(this.baseURL +"/orderDetail/list", { params: data });
  }
  static orderDetailSave(data, query) {
    return axios.post(this.baseURL +"/orderDetail/save", data, {
      params: query,
    });
  }
  static orderDetailDelete(id) {
    return axios.post("/orderDetail/delete", { ids: id });
  }
}
