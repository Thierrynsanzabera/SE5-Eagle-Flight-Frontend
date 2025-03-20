import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/student");
  },
  getStudentForOcId(ocId) {
    return apiClient.get(`/student/${ocId}`);
  },
  create(studentData) {
    return apiClient.post("/student", studentData);
  },
  update(ocId, data) {
    return apiClient.put(`/student/${ocId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/student/${id}`);
  },
  deleteAll() {
    return apiClient.delete("/student");
  },
};