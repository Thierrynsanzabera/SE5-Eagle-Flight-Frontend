import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEventStore = defineStore('eventStore', () => {
    const selectedEvent = ref(null);

    function setSelectedEvent(event) {
        selectedEvent.value = event;
    }

    function cancelSelectedEvent() {
        selectedEvent.value = null;
    }

    return { selectedEvent, setSelectedEvent, cancelSelectedEvent };
});