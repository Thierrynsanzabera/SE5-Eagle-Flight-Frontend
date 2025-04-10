import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFpInstanceStore = defineStore('fpInstanceStore', () => {
    const selectedSemester = ref(null);
    const selectedTask = ref(null);

    const showOverlay = computed(() => {
        return selectedTask.value !== null;
    });

    const setCurrentSemester = (semester) => {
        selectedSemester.value = semester;
    };
    const getSemesterName = (semester) => {
        return selectedSemester.name || null;
    };
    const getAllforSemesterUntilGraduation = (semesterUntilGraduation) => {
        return selectedSemester.semesterUntilGraduation;
    }

    return { setCurrentSemester, selectedSemester, selectedTask, showOverlay, getSemesterName, getAllforSemesterUntilGraduation };
});
