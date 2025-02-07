<!-- this is the old HomeView -->
<template>
    <v-container>
        <ResumePreview :resumeId="currentResumeId" v-if="showPreview" @hidePreviewEmit="showPreview = false" />
        <div class="text-h4" style="text-align: center;">Saved Resumes</div>
        <v-row justify="center">
            <Resume />
            <Resume v-for="resumeObject in resumeObjects" :resumeObject="resumeObject"
                @showPreviewEmit="showPreviewFunction" />
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import resumeServices from '@/services/resumeServices';



let resumeObjects = ref([])


let user = Utils.getStore("user");

// getting data from the backend
if (user) {
    let userId = user.userId;
    resumeServices.getAllForUser(userId).then((res) => {
        res.data.forEach((item) => {
            let resume = item
            resumeObjects.value.push(resume);
        });
        console.log("resumes:")
        console.log(resumeObjects)
    });
}

let showPreview = ref(false);
let currentResumeId = ref(0);
function showPreviewFunction (resumeId) {
    currentResumeId.value = resumeId;
    console.log("showing preview for resumeId:" + currentResumeId.value)
    showPreview.value = true;
}

</script>
<style scoped></style>