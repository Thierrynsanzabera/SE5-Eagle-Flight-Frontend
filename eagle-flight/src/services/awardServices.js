import apiClient from "./services.js";

export default {
  getAllForUser(userId) {
    return apiClient.get("/awards/userAwards/" + userId);
  },
  get(id) {
    return apiClient.get(`/awards/${id}`);
  },
  create(data) {
    return apiClient.post("/awards", data);
  },
  update(id, data) {
    return apiClient.put(`/awards/${id}`, data);
  },
  updateRelation(awardId, data) {
    return apiClient.put(`/awards/updateRelation/${awardId}`, data);
  },
  delete(id) {
    return apiClient.delete(`/awards/${id}`);
  },
};