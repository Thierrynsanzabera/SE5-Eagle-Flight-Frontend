import apiClient from "../services.js";
 
 export default {
   getAll() {
     return apiClient.get("/event");
   },
   addEvent(data){
     return apiClient.post("/event", data);
   },
   updateEvent(eventId, data) {
     return apiClient.put(`/event/${eventId}`, data);
   },
   deleteEvent(id) {
     return apiClient.delete(`/event/${id}`);
   },
   deleteAllEvents() {
     return apiClient.delete(`/event`);
   },
   getStudentsForEvent(id) {
    return apiClient.get(`/event/${id}/students`)
  }  
 };