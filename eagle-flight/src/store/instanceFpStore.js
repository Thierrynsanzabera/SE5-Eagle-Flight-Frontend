import { defineStore } from 'pinia';
import { watch, ref, computed } from 'vue';
import instanceTaskServices from '@/services/eagle-flight/instanceTask.services';
import Utils from '@/config/utils'

export const useFpInstanceStore = defineStore('fpInstanceStore', () => {
    let user = Utils.getStore("user");
    let userId = user.userId;
    const selectedSemester = ref(null);
    const selectedTask = ref(null);

    const selectedCategory = ref('tasks')

    const totalTasks = ref([]);
    getInstanceTasks()

    const showOverlay = ref(false)

    const totalPointsPossible = computed(() => {
        if (!totalTasks.value || !Array.isArray(totalTasks.value)) return 0;

        const seenTaskIds = new Set();
        let total = 0;

        for (const instance of totalTasks.value) {
            const task = instance.task;
            if (task && !seenTaskIds.has(task.id)) {
                seenTaskIds.add(task.id);
                total += task.points || 0;
            }
        }

        return total;
    });

    const totalPointsAwarded = computed(() => {
        if (!totalTasks.value || !Array.isArray(totalTasks.value)) return 0;

        let total = 0;

        for (const instance of totalTasks.value) {
            const task = instance.task;
            const isCompleted = instance.completionDate !== null;

            if (task && isCompleted) {
                total += Number(task.points) || 0;
            }
        }

        return total;
    });

    const progress = computed(() => {
        if (totalPointsPossible.value === 0) return 0;
        return Math.round((totalPointsAwarded.value / totalPointsPossible.value) * 100);
    })



    watch(selectedTask, (newValue) => {
        if (newValue) {
            showOverlay.value = true;
        } else {
            showOverlay.value = false;
        }
    })
    watch(showOverlay, (newValue) => {
        if (newValue == false) {
            selectedTask.value = null;
        }
    })

    const setCurrentSemester = (semester) => {
        selectedSemester.value = semester;
    };

    const getSemesterName = (semester) => {
        return selectedSemester.name || null;
    };

    const getAllforSemesterUntilGraduation = (semesterUntilGraduation) => {
        return selectedSemester.semesterUntilGraduation;
    }

    function getSubmissionStatus(submissions) {
        if (!submissions || submissions.length === 0) {
            return { id: 1, text: "📝 To do" };
        }

        const hasPending = submissions.some(s => s.status === "pending");
        const hasApproved = submissions.some(s => s.status === "approved");
        const hasRejected = submissions.some(s => s.status === "rejected");

        if (hasApproved) return { id: 2, text: "✅ Completed" };
        if (hasPending) return { id: 3, text: "⏳ Waiting for admin" };
        if (hasRejected) return { id: 4, text: "❌ Rejected" };


        return "Awaiting submission"; // fallback
    }

    const currentSemesterUntilGraduation = computed(() => {
        if (selectedSemester.value == null) {
            return null
        }
        if (selectedSemester.value.semesterFromGraduation === null) {
            return null
        }
        return selectedSemester.value.semesterFromGraduation
    })

    const tasksLeft = computed(() => {
        return totalTasks.value.filter(task =>
            task.semesterUntilGraduation === currentSemesterUntilGraduation.value &&
            task.task.isExperience === false
        ).length;
    });

    const experiencesLeft = computed(() => {
        return totalTasks.value.filter(task =>
            task.semesterUntilGraduation === currentSemesterUntilGraduation.value &&
            task.task.isExperience === true
        ).length;
    });

    const filteredTasks = computed(() => {
        return totalTasks.value.filter(task => {
            const matchesSemester = task.semesterUntilGraduation === currentSemesterUntilGraduation.value;

            const isExperience = task.task.isExperience;
            if (selectedCategory.value === 'experiences') {
                return matchesSemester && isExperience === true;
            } else {
                return matchesSemester && isExperience === false;
            }
        });
    });



    // API calls ==================

    function getInstanceTasks() {
        instanceTaskServices.getAllForUserId(userId).then(
            response => {
                console.log(response.data)
                totalTasks.value = response.data
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    return {
        selectedSemester,
        selectedTask,
        showOverlay,
        totalTasks,
        tasksLeft,
        experiencesLeft,
        filteredTasks,
        currentSemesterUntilGraduation,
        selectedCategory,
        totalPointsPossible,
        totalPointsAwarded,
        progress,
        getSemesterName,
        getAllforSemesterUntilGraduation,
        setCurrentSemester,
        getSubmissionStatus,
        getInstanceTasks,
    };
});
