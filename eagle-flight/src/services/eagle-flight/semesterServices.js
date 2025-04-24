import apiClient from "../services.js";

export default {
  getAll() {
    return apiClient.get(`/generalSemester/`);
  },
  addSemester(data) {
    return apiClient.post("/generalSemester", data);
  },
  update(semesterId, data) {
    return apiClient.put(`/generalSemester/${semesterId}`, data);
  },
  delete(semesterId) {
    return apiClient.delete(`/generalSemester/${semesterId}`);
  },

  getCurrent() {
    return apiClient.get(`/generalSemester/current`);
  },

  refreshStatus() {
    return apiClient.post(`/generalSemester/refresh-status`);
  }

};