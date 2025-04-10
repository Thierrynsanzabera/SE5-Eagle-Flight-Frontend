import apiClient from "../services.js";

export default {
    getAll() {
        return apiClient.get("/student");
    },
    getForOcId(ocId) {
        return apiClient.get(`/student/${ocId}`);
    },
    getForUserId(userId) {
        return apiClient.get(`/student/userId/${userId}`);
    },
    checkIfStudentExists(userId) {
        return apiClient
            .get(`/student/userId/${userId}`)
            .then(() => true)
            .catch(err => {
                if (err.response.status == 404) {
                    return false;
                }
                throw err;
            });
    },
    addStudent(data) {
        return apiClient.post("/student", data);
    },
    update(studentId, data) {
        return apiClient.put(`/student/${studentId}`, data);
    },
    delete(id) {
        return apiClient.delete(`/student/${id}`);
    },
    deleteAll() {
        return apiClient.delete(`/student`);
    },
};