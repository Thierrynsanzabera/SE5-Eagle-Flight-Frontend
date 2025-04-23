<template>
    <v-card color="secondary" height="460px" width="500px" class="px-5 py-3">
        <v-card-title class="text-center text-h6">View Submission</v-card-title>
        <v-btn width="100%" variant="text">{{ selectedSubmission.instanceTask.task.name }}</v-btn>
        <v-textarea readonly label="Description" :model-value="selectedSubmission.description" auto-grow class="mb-0"
            density="compact" rows="3" />
        <v-btn color="primary" width="100%" class="mb-2" @click="submissionStore.showOverlay = true" size="large">
            View Submitted Image
        </v-btn>
        <div class="text-caption mb-2">Submitted on: {{ submissionStore.formatDate(selectedSubmission.date) }}</div>
        <div class="text-caption mb-2">Submitted by: {{ submissionStore.fullName(selectedSubmission) }}</div>
        <div v-if="selectedSubmission.status == 'pending'">
            <v-btn @click="updateSubmission('approved')" width="100%" class="my-2" color="green" variant="outlined"
                size="large">Approve</v-btn>
            <v-btn @click="updateSubmission('rejected')" width="100%" class="my-2" color="red" variant="outlined"
                size="large">Reject</v-btn>
        </div>
    </v-card>

</template>
<script setup>
import { computed, ref } from 'vue'
import { useSubmissionStore } from '@/store/submissionStore'
import submissionServices from '@/services/eagle-flight/submission.services'
import instanceTaskServices from '@/services/eagle-flight/instanceTask.services'
import studentServices from '@/services/eagle-flight/studentServices'

const submissionStore = useSubmissionStore()
const selectedSubmission = computed(() => submissionStore.selectedSubmission)

async function updateSubmission(status) {
    await submissionServices.update(selectedSubmission.value.id, { status: status })
    if (status === 'approved') {
        const completionDate = submissionStore.selectedSubmission.date
        const instanceTaskId = submissionStore.selectedSubmission.instanceTaskId
        await instanceTaskServices.update(instanceTaskId, { completionDate: completionDate })
        let awardedPoints = submissionStore.selectedSubmission.instanceTask.task.points
        await studentServices.addPoints(submissionStore.userId(submissionStore.selectedSubmission), awardedPoints)
    }
    submissionStore.selectedSubmission = null
    submissionStore.showOverlay = false
    submissionStore.getAllSubmissions()

}


</script>
<style scoped></style>