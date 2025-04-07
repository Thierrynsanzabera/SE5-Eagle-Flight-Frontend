import apiClient from "../services.js";

export default {
  getForMajorId(majorId) {
    return apiClient.get(`/plan/major/${majorId}`);
  },
  addplan(data){
    return apiClient.post("/plan", data);
  },
  update(planId, data) {
    return apiClient.put(`/plan/${planId}`, data);
  },
  addTask(planId, data) {
    return apiClient.post(`/plan/${planId}/addTask`, data);
  },
  deleteTask(planId, taskId) {
    return apiClient.delete(`/plan/${planId}/task/${taskId}`);
  },
  delete(id) {
    return apiClient.delete(`/plan/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/plan`);
  },
};