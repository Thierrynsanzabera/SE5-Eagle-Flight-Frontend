import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/experiences");
  },
  getAllForUser(userId) {
    return apiClient.get("/experiences/userExperiences/" + userId);
  },
  get(id) {
    return apiClient.get(`/experiences/${id}`);
  },
  create(data) {
    return apiClient.post("/experiences", data);
  },
  update(id, data) {
    return apiClient.put(`/experiences/${id}`, data);
  },
  updateRelation(experienceId, data) {
    return apiClient.put(`/experiences/updateRelation/${experienceId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/experiences/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/experiences`);
  },
  findByTitle(title) {
    return apiClient.get(`/resumes?title=${title}`);
  },
};