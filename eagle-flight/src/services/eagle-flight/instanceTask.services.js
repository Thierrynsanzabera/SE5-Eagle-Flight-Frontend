import apiClient from "../services.js";

export default {
    getAllForUserId(userId) {
        return apiClient.get(`/instanceTask/${userId}`);
    },
    update(instanceTaskId, data) {
        return apiClient.put(`/instanceTask/${instanceTaskId}`, data);
    }
};