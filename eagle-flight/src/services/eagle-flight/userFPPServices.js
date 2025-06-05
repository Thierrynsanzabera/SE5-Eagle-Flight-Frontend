import apiClient from "../services.js";

export default {
  getUserFlightPlans() {
    return apiClient.get("/admin/userFlightPlans");
  }
};