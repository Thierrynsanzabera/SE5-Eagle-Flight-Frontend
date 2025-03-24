import apiClient from "./services.js";

export default {
  getAllBadges(){
    return apiClient.get("/badge");
  },
  getAllForUser(userId) {
    return apiClient.get("/badges/studentBadges/" + userId);
  },
  getBadge(id) {
    return apiClient.get(`/badge/${id}`);
  },
  createBadge(id, data){
    return apiClient.post(`/badge/${id}`, data);
  },
  updateBadge(id, data) {
    return apiClient.put(`/badge/${id}`, data);
  },
  deleteBadge(id) {
    return apiClient.delete(`/badge/${id}`);
  }
}