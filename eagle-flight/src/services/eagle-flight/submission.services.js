import apiClient from "../services.js";

export default {
    getAllForInstanceTask(instanceTaskId) {
        return apiClient.get(`/submission/${instanceTaskId}`);
    },
    getAll() {
        return apiClient.get(`/submission/`);
    },
    getForId(submissionId) {
        return apiClient.get(`/submission/submission/${submissionId}`);
    },
    addSubmission(submissionData) {
        const formData = new FormData();
        formData.append('instanceTaskId', submissionData.instanceTaskId);
        formData.append('description', submissionData.description);

        if (submissionData.image) {
            formData.append('image', submissionData.image); // 'image' must match multer's `upload.single('image')`
        }
        return apiClient.post('/submission', formData);
    },
    update(submissionId, data) {
        return apiClient.put(`/submission/${submissionId}`, data);
    },
    delete(id) {
        return apiClient.delete(`/submission/${id}`);
    }
};