import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/educations");
  },
  getAllForUser(userId) {
    return apiClient.get("/educations/userEducations/" + userId);
  },
  get(id) {
    return apiClient.get(`/educations/${id}`);
  },
  create(data) {
    return apiClient.post("/educations", data);
  },
  update(id, data) {
    return apiClient.put(`/educations/${id}`, data);
  },
  updateRelation(educationId, data) {
    return apiClient.put(`/educations/updateRelation/${educationId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/educations/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/educations`);
  },
  findByTitle(title) {
    return apiClient.get(`/resumes?title=${title}`);
  },
};