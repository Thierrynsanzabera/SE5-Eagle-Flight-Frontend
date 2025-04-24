<template>
    <v-overlay v-model="submissionStore.showOverlay" class="d-flex justify-center align-center" z-index="1">0
        <PreviewImage :fileName="submissionStore.fileName" />
    </v-overlay>
    <v-overlay v-model="submissionStore.showSubmission" class="d-flex justify-center align-center" z-index="1">
        <ExpandedSubmission />
    </v-overlay>
    <v-container style="margin-top:48px" class="d-flex justify-center align-center">
        <SubmissionList/>
    </v-container>
</template>
<script setup>
import { useSubmissionStore } from '@/store/submissionStore';

const submissionStore = useSubmissionStore()

</script>
<style scoped></style>