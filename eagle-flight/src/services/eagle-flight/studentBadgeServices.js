import apiClient from "../services.js";

export default {
  getStudentBadges(studentId) {
    return apiClient.get(`/studentBadge/${studentId}`);
  },

  getAllStudentsWithNames() {
    return apiClient.get("/studentBadge/getAllStudentsWithNames");
  },

  assignBadgeToStudent(studentId, badgeId) {
    return apiClient.post("/studentBadge", { studentId, badgeId });
  },

  removeBadgeFromStudent(studentId, badgeId) {
    return apiClient.delete(`/studentBadge/${studentId}/${badgeId}`);
  },

  getAllStudentBadges() {
    return apiClient.get("/studentBadge");
  },

  getStudentByUserId(userId) {
    return apiClient.get(`/studentBadge/student/by-user/${userId}`);
  }
};
