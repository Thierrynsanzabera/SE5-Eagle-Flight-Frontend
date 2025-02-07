<template>
    <v-container>
        <ResumePreview :resumeId="currentResumeId" v-if="showPreview" @hidePreviewEmit="showPreview = false" />
        <div class="text-h4" style="text-align: center;">Home Page</div>
    </v-container>
</template>
<script setup>
</script>
<style scoped></style>