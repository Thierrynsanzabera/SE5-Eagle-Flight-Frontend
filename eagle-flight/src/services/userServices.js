import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/user");
  },
  getUserForId(userId) {
    return apiClient.get(`/user/id/${userId}`);
  },
  getUserForName(userName) {
    return apiClient.get(`/user/name/${userName}`); //make sure user name has spaces in the form %20
  },
  update(userId, data) {
    return apiClient.put(`/user/${userId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/user/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/user`);
  },
};