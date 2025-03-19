import apiClient from "../services.js";

export default {
  getAll() {
    return apiClient.get("/task");
  },
  addTask(data){
    return apiClient.post("/task", data);
  },
  update(taskId, data) {
    return apiClient.put(`/task/${taskId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/task/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/task`);
  },
};