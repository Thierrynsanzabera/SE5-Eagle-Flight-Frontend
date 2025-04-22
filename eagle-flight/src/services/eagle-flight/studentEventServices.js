import apiClient from "../services.js";

export default {
    addStudentToEvent(data) {
        return apiClient.post("/studentEvent", data);
    },
    getStudentsForEvent(eventId) {
        return apiClient.get(`/studentEvent/${eventId}`);
    },
    updateStudentStatus(eventId, studentUserID, data) {
        return apiClient.put(`/studentEvent/${eventId}/${studentUserID}`, data);
    },
    deleteStudentFromEvent(eventId, studentUserID) {
        return apiClient.delete(`/studentEvent/${eventId}/${studentUserID}`);
    }
};