<template>
    <v-card color="secondary" height="600px" width="660px" class="px-5">
        <v-card-title class="text-center">Submissions</v-card-title>
        <v-row>
            <v-col cols="6">
                <v-select label="Order by" :items="orderByItems" v-model="currentOrderBy"></v-select>
            </v-col>
            <v-col cols="6">
                <v-select label="Show for"></v-select>
            </v-col>
        </v-row>
        <v-checkbox v-model="showAccepted" density="compact" class="ma-0 pa-0" hide-details> <template #label>
                <span class="text-overline">Show Accepted</span>
            </template>
        </v-checkbox>
        <v-checkbox v-model="showRejected" density="compact" class="ma-0 pa-0" hide-details> <template #label>
                <span class="text-overline">Show Rejected</span>
            </template>
        </v-checkbox>
        <v-container class="d-flex justify-center px-0 pt-0 mx-0" width="100%" height="62%">
            <v-list bg-color="transparent" class="my-list px-1" style="overflow-y: auto;" width=100% rounded-sm>
                <v-card v-for="submission in filteredSubmissions" class="mb-3 status-card"
                    :class="getStatusClass(submission.status)"
                    :color="submission == submissionStore.selectedSubmission ? 'grey' : 'background'"
                    @click="setCurrentSubmission(submission)">
                    <v-card-title class="d-flex justify-space-between align-center text-overline">
                        <v-row>
                            <v-col cols="4">
                                <span class="text-subtitle-2">{{ submission.instanceTask.task.name }}</span>
                            </v-col>
                            <v-col cols="4">
                                <span class="text-subtitle-2">{{ submissionStore.fullName(submission) }}</span>
                            </v-col>
                            <v-col cols="4" class="text-right">
                                <span class="text-body-2">{{ submissionStore.formatDate(submission.date) }}</span>
                            </v-col>
                        </v-row>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useSubmissionStore } from '@/store/submissionStore'

const submissionStore = useSubmissionStore()
submissionStore.getAllSubmissions()

const showAccepted = ref(true);
const showRejected = ref(true);

const orderByItems = ref([
    "Date",
    "Task Name"
])

const currentOrderBy = ref(orderByItems.value[0])

const filteredSubmissions = computed(() => {
    let filtered = submissionStore.allSubmissions.filter((s) => {
        if (s.status === "approved" && !showAccepted.value) return false;
        if (s.status === "rejected" && !showRejected.value) return false;
        return true;
    });

    return filtered.sort((a, b) => {
        switch (currentOrderBy.value) {
            case 'Date':
                return new Date(b.date) - new Date(a.date);
            case 'Task Name':
                return a.instanceTask.task.name.localeCompare(b.instanceTask.task.name);
            default:
                return 0;
        }
    });
});



function setCurrentSubmission(submission) {
    submissionStore.selectedSubmission = submission
}

function getStatusClass(status) {
    switch (status) {
        case "pending":
            return "status-pending";
        case "approved":
            return "status-approved";
        case "rejected":
            return "status-rejected";
        default:
            return "";
    }
}

</script>
<style scoped>
.status-card {
    border-left: 6px solid transparent;
}

.status-pending {
    border-left-color: grey;
}

.status-approved {
    border-left-color: green;
}

.status-rejected {
    border-left-color: red;
}
</style>