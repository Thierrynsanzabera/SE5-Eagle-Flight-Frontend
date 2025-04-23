<template>
    <v-card height="370px" width="560" color="secondary">
        <v-container v-if="!startSubmission" class="px-6">
            <v-card-title class="text-h5 text-center py-0">{{ title }}</v-card-title>
            <v-card-subtitle class="text-body-2 text-center">Points: {{ points }}</v-card-subtitle>
            <v-sheet class="pa-5" style="height: 140px; overflow-y: auto;" color="background" rounded="lg"
                elevation="1">
                {{ description }}
            </v-sheet>
            <v-row class="mt-2 mx-0">
                <v-btn
                    :disabled="fpInstanceStore.getSubmissionStatus(fpInstanceStore.selectedTask.submissions).id == 2 || fpInstanceStore.getSubmissionStatus(fpInstanceStore.selectedTask.submissions).id == 3"
                    size="large" width="100%" color="primary" rounded="lg" @click="startSubmission = true">Start
                    Submission</v-btn>
            </v-row>
            <v-row class="mt-5 mx-0">
                <v-btn size="large" width="100%" color="primary" rounded="lg" @click="cancelTask">Cancel</v-btn>
            </v-row>
        </v-container>
        <v-container v-else class="px-6">
            <v-card-title class="text-h5 text-center py-0">{{ title }}</v-card-title>
            <v-card-subtitle class="text-body-2 text-center">Points: {{ points }}</v-card-subtitle>
            <v-textarea v-model="submissionData.description" label="Add links or a description" variant="outlined"
                density="compact" auto-grow="true" rows=2></v-textarea>
            <v-file-input v-model="submissionData.image" label="Upload image" accept=".pdf,.jpg,.png"
                prepend-icon="mdi-upload" show-size></v-file-input>
            <v-row class="mt-2 mx-0">
                <v-btn size="large" width="100%" color="primary" rounded="lg" @click="submitData()">Submit</v-btn>
            </v-row>
            <v-row class="mt-5 mx-0">
                <v-btn size="large" width="100%" color="primary" rounded="lg"
                    @click="startSubmission = false">Cancel</v-btn>
            </v-row>
        </v-container>
    </v-card>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useFpInstanceStore } from '@/store/instanceFpStore'
import submissionServices from '@/services/eagle-flight/submission.services'

const startSubmission = ref(false)
const fpInstanceStore = useFpInstanceStore()
const cancelTask = () => {
    fpInstanceStore.selectedTask = null
}

const title = computed(() => fpInstanceStore.selectedTask?.task?.name || '')
const points = computed(() => fpInstanceStore.selectedTask?.task?.points || 0)
const description = computed(() => fpInstanceStore.selectedTask?.task?.description || '')

const submissionData = ref({
    description: "",
    image: null,
})

async function submitData() {
    submissionData.value.instanceTaskId = fpInstanceStore.selectedTask.id;
    await submissionServices.addSubmission(submissionData.value);
    console.log("Submission data: ", submissionData.value);
}


</script>
<style scoped></style>