import apiClient from "../services.js";

export default {
  getAll() {
    return apiClient.get("/major");
  },
  addmajor(data){
    return apiClient.post("/major", data);
  },
  update(majorId, data) {
    return apiClient.put(`/major/${majorId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/major/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/major`);
  },
};