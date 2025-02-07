import apiClient from "./services.js";

export default {

  getAllForResume(resumeId) {
    return apiClient.get("/resumeComments/" + resumeId);
  },
  create(data, resumeId) {
    return apiClient.post("/resumeComments/" + resumeId, data);
  },
  delete(resumeId) {
    return apiClient.delete(`/resumeComments/single/${resumeId}`);
  },
};