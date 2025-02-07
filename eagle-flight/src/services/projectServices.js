import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/projects");
  },
  getAllForUser(userId) {
    return apiClient.get("/projects/userProjects/" + userId);
  },
  get(id) {
    return apiClient.get(`/projects/${id}`);
  },
  create(data) {
    return apiClient.post("/projects", data);
  },
  update(id, data) {
    return apiClient.put(`/projects/${id}`, data);
  },
  updateRelation(projectId, data) {         // updates the resumeprojects selected
    return apiClient.put(`/projects/updateRelation/${projectId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/projects/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/projects`);
  },
  findByTitle(title) {
    return apiClient.get(`/resumes?title=${title}`);
  },
};