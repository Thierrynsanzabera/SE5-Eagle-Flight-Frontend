<template>
    <v-container>
        <h1>Your resume has been saved</h1>
        <div class="resumePreview">
            <Template1 :resumeData="resumeData" />
        </div>
        <h2>Ai Suggestions</h2>
        <p>ai suggestion text should go here</p>
        <v-btn @click="$router.push('/build')">Edit</v-btn>
        <v-btn @click="downloadPDF">Download PDF</v-btn>
    </v-container>
</template>
<script setup>
//import { ref, onMounted } from "vue";
import { ref } from 'vue';
import { generatePDF } from '../services/PDFDownloader';
import Template1 from '../templates/html/Template1vue.vue';
import resumeServices from '../services/resumeServices';
import userServices from '@/services/userServices';
import Utils from '@/config/utils';

let props = defineProps({
    id: {
        type: Number,
    }
})

let resumeId = props.id;
let resumeData = ref(null);
let isAllowed = ref(false);
let userId = ref(null);
let user = ref(null);
getResumeData(resumeId);

function getResumeData(resumeId) {
    console.log("Getting resume data for resume:" + resumeId)
    resumeServices.get(resumeId).then((res) => {
        let resume = res.data;
        userId = resume.userId;
        resumeData.value = resume;
        if (resumeData.value.userId == userId) isAllowed.value = true;
        getUserData(userId);
        resumeServices.getResumeEducations(resumeId).then((res) => {
            resumeData.value.educations = res.data;
        });
        resumeServices.getResumeExperiences(resumeId).then((res) => {
            resumeData.value.experiences = res.data;
        });
        resumeServices.getResumeSkills(resumeId).then((res) => {
            resumeData.value.skills = res.data;
        });
        resumeServices.getResumeProjects(resumeId).then((res) => {
            resumeData.value.projects = res.data;
        });
        resumeServices.getResumeAwards(resumeId).then((res) => {
            resumeData.value.awards = res.data;
        });
    });
    console.log("Resume data:")
    console.log(resumeData.value)
}
function getUserData() {
    userServices.getUserForId(userId)
        .then(response => {
            user.value = response.data;
            resumeData.value.fName = user.value.fName;
            resumeData.value.lName = user.value.lName;
            resumeData.value.city = user.value.city;
            resumeData.value.state = user.value.state;
            resumeData.value.email = user.value.email;
            resumeData.value.phoneNumber = user.value.phoneNumber;
            resumeData.value.linkedInUrl = user.value.linkedInUrl;
        })
        .catch(e => {
            console.log(e);
        });
}


const downloadPDF = () => {
    console.log("Downloading PDF");
    console.log(resumeData.value);
    generatePDF(resumeData.value);
};
</script>
<style scoped>
.resumePreview{
    border: 1px solid black;
    background-color: white;
    height: 1000px;
    width: 800px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>