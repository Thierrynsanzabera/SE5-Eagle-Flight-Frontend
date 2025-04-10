import apiClient from "../services.js";

export default {
  create(data) {
    return apiClient.post("/api/studentRedeemables", data); // ✅ Correct
  },

  getAll() {
    return apiClient.get("/api/studentRedeemables"); // ✅
  },

  getByStudent(studentUserId) {
    return apiClient.get(`/api/studentRedeemables/student/${studentUserId}`);
  },

  getByRedeemable(redeemableId) {
    return apiClient.get(`/api/studentRedeemables/redeemable/${redeemableId}`);
  },
};