import apiClient from "../services.js";

export default {
  // Get all redeemable items
  getAll() {
    return apiClient.get("/redeemables");
  },

  // Get a single redeemable item by ID
  getOne(id) {
    return apiClient.get(`/redeemables/${id}`); // Matches backend route for fetching a specific redeemable
  },

  // Create a new redeemable item
  create(data) {
    return apiClient.post("/redeemables", data); // Matches backend route for creating a redeemable
  },

  // Update an existing redeemable item by ID
  update(id, data) {
    return apiClient.put(`/redeemables/${id}`, data); // Matches backend route for updating a redeemable
  },

  // Delete a redeemable item by ID
  delete(id) {
    return apiClient.delete(`/redeemables/${id}`); // Matches backend route for deleting a redeemable
  },

  // Delete all redeemable items
  deleteAll() {
    return apiClient.delete("/redeemables"); // Matches backend route for deleting all redeemables
  },
};