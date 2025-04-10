import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditFpStore = defineStore('editFpStore', () => {
    const expandedComboOpen = ref(false)
    const semesterNumber = ref(null)
    const yearNumber = ref(null)
    const taskList = ref([])
    const major = ref(null)
    const currentPlanTasks = ref([[[], []], [[], []], [[], []], [[], []]])
    const currentPlanId = ref(null)

    function pushToCurrentPlanTasks(task, yearIndex, semesterIndex) {
        console.log(`pushing ${task} to ${yearIndex} ${semesterIndex}`)
        currentPlanTasks.value[yearIndex][semesterIndex].push(task)
    }

    function clearSemesters() {
        for (let year = 0; year < 4; year++) {
            for (let semester = 0; semester < 2; semester++) {
                const semesterArray = currentPlanTasks.value[year][semester]
                while (semesterArray.length > 0) {
                    semesterArray.pop()
                }
            }
        }
    }

    function getSemesterUntilGraduation() {
        return (9 - (yearNumber.value - 1)*2 - semesterNumber.value)
     }

    return { expandedComboOpen, semesterNumber, taskList, major, currentPlanTasks, yearNumber, currentPlanId, pushToCurrentPlanTasks, clearSemesters, getSemesterUntilGraduation };
});
