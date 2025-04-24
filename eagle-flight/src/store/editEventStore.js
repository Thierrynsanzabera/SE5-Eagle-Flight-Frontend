import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditEventStore = defineStore('editEventStore', () => {
    const expandedEventsComboOpen = ref(false)
    const semesterNumber = ref(null)
    const yearNumber = ref(null)
    const eventList = ref([])
    const currentPlanEvents = ref([[[], []], [[], []], [[], []], [[], []]])

    function pushToCurrentPlanEvents(event, yearIndex, semesterIndex) {
        console.log(`pushing ${event} to ${yearIndex} ${semesterIndex}`)
        currentPlanEvents.value[yearIndex][semesterIndex].push(event)
    }

    return { expandedEventsComboOpen, semesterNumber, eventList, currentPlanEvents, yearNumber, pushToCurrentPlanEvents};
});
