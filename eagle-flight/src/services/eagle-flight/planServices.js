import apiClient from "../services.js";

export default {
  getAll() {
    return apiClient.get("/plan");
  },
  getForId(planId) {
    return apiClient.get(`/plan/${planId}`);
  },
  addplan(data) {
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
  deleteAllInPlan(planId) {
    return apiClient.delete(`/plan/${planId}/tasks`);
  },
  startInstance(userId) {
    return apiClient.post(`/plan/plan-instance/start/${userId}`);
  },
  populateInstance(userId) {
    return apiClient.post(`/plan/plan-instance/populate/${userId}`);
  }
};