import { defineStore } from 'pinia';
import { ref } from 'vue';
import majorServices from '@/services/eagle-flight/majorServices'
import planServices from '@/services/eagle-flight/planServices';
import taskServices from '@/services/eagle-flight/taskServices';
import { watch } from 'vue';

export const useEditFpStore = defineStore('editFpStore', () => {
    const expandedComboOpen = ref(false)
    const showOverlay = ref(false)
    const showDeleteOverlay = ref(false)
    const showSaveOverlay = ref(false)

    const semesterNumber = ref(null)
    const yearNumber = ref(null)
    const taskList = ref([])
    const currentPlanTasks = ref([[[], []], [[], []], [[], []], [[], []]])
    const currentPlan = ref(null)
    const templateList = ref([])
    const tasks = ref([])
    const availableTasks = ref([])
    const selectedTemplate = ref(null)

    getPlans()

    // for testing purposes. In the future we might want to call it when needed
    getTasks()

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
        return (9 - (yearNumber.value - 1) * 2 - semesterNumber.value)
    }

    watch(selectedTemplate, (newVal) => {
        if (newVal) {
            getPlan()
        }
    })

    function getPlan() {
        planServices.getForId(selectedTemplate.value.id).then(
            response => {
                currentPlan.value = response.data
                populateSemesters()
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    function populateSemesters() {
        clearSemesters()
        console.log("Populating semesters")
        for (const task of currentPlan.value.tasks) {
            const yearIndex = 4 - Math.ceil(task.taskInSemester.semesterUntilGraduation / 2)
            const semesterIndex = (task.taskInSemester.semesterUntilGraduation) % 2
            pushToCurrentPlanTasks(task, yearIndex, semesterIndex)
        }
    }

    function pushToCurrentPlanTasks(task, yearIndex, semesterIndex) {
        currentPlanTasks.value[yearIndex][semesterIndex].push(task)
    }

    // api call

    function getTasks() {
        taskServices.getAll().then(
            response => {
                tasks.value = response.data
                setAvailableTasks()
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    function setAvailableTasks() {
        const currentPlanTaskIds = new Set(
            currentPlanTasks.value.flat(2).map(task => task.id)
        )

        availableTasks.value = tasks.value.filter(
            task => !currentPlanTaskIds.has(task.id)
        )
    }

    watch(currentPlanTasks.value, (newValue) => {
        setAvailableTasks()
    })

    async function getMajors() {
        try {
            const response = await majorServices.getAll()
            return response.data
        } catch (error) {
            console.log(error)
            return [] // or throw error if you want to handle it elsewhere
        }
    }

    // plans here = templates
    function getPlans() {
        planServices.getAll().then((response) => {
            templateList.value = response.data
        }).catch((error) => {
            console.log(error)
        })
    }

    async function saveData() {
        let canContinue = false;

        try {
            const res = await planServices.deleteAllInPlan(currentPlan.value.id);
            if (res.status === 200) {
                canContinue = true;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("No tasks found to delete.");
                canContinue = true;
            } else {
                console.error("Unexpected error deleting tasks:", error);
            }
        }
        if (canContinue) {
            for (let year = 0; year < 4; year++) {
                for (let semester = 0; semester < 2; semester++) {
                    const semesterArray = currentPlanTasks.value[year][semester]
                    for (const task of semesterArray) {
                        let semesterUntilGraduation = (8 - 2 * (year) - semester)
                        let body = {
                            taskId: task.id,
                            semesterUntilGraduation: semesterUntilGraduation
                        }
                        await planServices.addTask(currentPlan.value.id, body)
                    }
                }
            }
        }
    }

    function deletePlan() {
        planServices.delete(currentPlan.value.id).then((response) => {
            console.log(response.data)
            getPlans()
            currentPlan.value = null
            clearSemesters()
            showDeleteOverlay.value = false
        }).catch((error) => {
            console.log(error)
        })
    }

    return { expandedComboOpen, showDeleteOverlay, showSaveOverlay,semesterNumber, taskList, currentPlanTasks, yearNumber, currentPlan, showOverlay, templateList, availableTasks, selectedTemplate, pushToCurrentPlanTasks, clearSemesters, getSemesterUntilGraduation, getMajors, setAvailableTasks, saveData, deletePlan, getPlans };
});
