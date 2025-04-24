import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import submissionServices from '@/services/eagle-flight/submission.services';

export const useSubmissionStore = defineStore('submissionStore', () => {
    const allSubmissions = ref([]);
    const selectedSubmission = ref(null);
    const showOverlay = ref(false)
    const showSubmission = ref(false)

    watch(selectedSubmission, (newValue) => {
        if (newValue) {
            showSubmission.value = true;
        } else {
            showSubmission.value = false;
        }
    })
    watch(showSubmission, (newValue) => {
        if (newValue == false) {
            selectedSubmission.value = null;
        }
    })

    // Computed Properties =========================
    const fileName = computed(() => {
        return selectedSubmission.value?.imagePath
            ? selectedSubmission.value.imagePath.split(/[/\\]/).pop()
            : null;
    });


    // Helper Functions =========================
    function formatDate(isoString) {
        // Convert the ISO string to CST time
        const date = new Date(isoString);

        const options = {
            timeZone: 'America/Chicago',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };

        const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(date);
        const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

        return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}`;
    }

    function fullName(submission) {
        return `${submission.instanceTask.planInstance.student.user.fName} ${submission.instanceTask.planInstance.student.user.lName}`
    }

    function userId(submission) {
        return submission.instanceTask.planInstance.student.user.id
    }
    // API CALLS =========================
    async function getAllSubmissions() {
        try {
            const response = await submissionServices.getAll();
            allSubmissions.value = response.data;
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    }

    return {
        allSubmissions,
        selectedSubmission,
        showOverlay,
        showSubmission,
        fileName,
        formatDate,
        fullName,
        userId,
        getAllSubmissions,
    };
});
