import apiClient from "../services.js";

export default {
  // Get all badges
  getAllBadges() {
    return apiClient.get("/badge");
  },

  // Get a specific badge by its ID
  getBadgeById(id) {
    return apiClient.get(`/badge/${id}`);
  },

  // Create a new badge (supports image upload)
  createBadge(formData) {
    return apiClient.post("/badge", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  // Update an existing badge by ID (also supports image upload)
  updateBadge(id, formData) {
    return apiClient.put(`/badge/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  // Delete a badge by ID
  deleteBadge(id) {
    return apiClient.delete(`/badge/${id}`);
  }
};