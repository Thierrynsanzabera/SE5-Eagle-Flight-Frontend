import apiClient from "./services.js";

export default {
  loginUser(user) {
    console.log("user", user);
    return apiClient.post("login", user);
  },
  authorizeUser(code) {
    return apiClient.post("authorize", code);
  },
  logoutUser(token) {
    return apiClient.post("logout", { token }, {
      headers: {
          "Content-Type": "application/json", // Ensure the content is sent as JSON
        },
      }
    );
  },
};