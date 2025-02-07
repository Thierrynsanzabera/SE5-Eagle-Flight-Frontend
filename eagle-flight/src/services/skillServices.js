import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/skills");
  },
  getAllForUser(userId) {
    return apiClient.get("/skills/userSkills/" + userId);
  },
  get(id) {
    return apiClient.get(`/skills/${id}`);
  },
  create(data) {
    return apiClient.post("/skills", data);
  },
  update(id, data) {
    return apiClient.put(`/skills/${id}`, data);
  },
  updateRelation(skillId, data) {
    return apiClient.put(`/skills/updateRelation/${skillId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/skills/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/skills`);
  },
  findByTitle(title) {
    return apiClient.get(`/resumes?title=${title}`);
  },
};