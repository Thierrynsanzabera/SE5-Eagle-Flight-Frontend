import { defineStore } from 'pinia';
import { watch, ref } from 'vue';

export const useFpInstanceStore = defineStore('fpInstanceStore', () => {
    const selectedSemester = ref(null);
    const selectedTask = ref(null);

    const showOverlay = ref(false)
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

    return {
        selectedSemester,
        selectedTask,
        showOverlay,
        getSemesterName,
        getAllforSemesterUntilGraduation,
        setCurrentSemester,
        getSubmissionStatus,
    };
});
