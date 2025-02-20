<template>
    <v-container v-if="isAdmin == true">
        <ResumePreview :resumeId="currentResumeId" isAdmin="true" v-if="showPreview"
            @hidePreviewEmit="showPreview = false" />
        <div class="text-h4" style="text-align: center;">Admin View</div>
        <v-row>
            <v-col cols="3">
                <v-select label="Resumes For" :items="all_users" v-model="selectedUser"></v-select>
            </v-col>
            <v-col cols="3">
                <v-btn @click="fetchResumes">View</v-btn>
            </v-col>

        </v-row>


        <v-row justify="center">
            <Resume v-for="filteredObject in filteredResumes" :key="filteredObject.id" :resumeObject="filteredObject"
                @showPreviewEmit="showPreviewFunction" />
        </v-row>

    </v-container>
    <v-alert color="red" v-else title="Insufficient Permission"
        text="You cannot view this page because you are not an Admin... Paypal $20 to david.reis@hotmail.com to become one!"></v-alert>
</template>
<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import resumeServices from '@/services/resumeServices';
import userServices from '@/services/userServices';

let resumeObjects = ref([])
let user = Utils.getStore("user");
let isAdmin = ref(false)
// Getting user from the backend
userServices.getUserForId(user.userId).then((res) => {
    user = res.data;
    isAdmin.value = user.isAdmin;
    console.log(user)
    getResumes();
}).catch((err) => {
    console.log(err)
});

function getResumes() {
    let userId = user.userId;
    resumeServices.getAll().then((res) => {
        res.data.forEach((item) => {
            let resume = item
            resumeObjects.value.push(resume);
        });
        console.log("resumes:")
        console.log(resumeObjects)
    });
}

const filteredResumes = ref([]);
const fetchResumes = () => {
    console.log("fetching resumes for user: " + selectedUser.value)
    if (selectedUser.value == "All") {
        filteredResumes.value = resumeObjects.value;
    } else {
        const firstName = selectedUser.value.split(" ")[0];
        const lastName = selectedUser.value.split(" ")[1];
        console.log(all_users)
        const currentUser = all_user_objects.value.find(user => user.fName == firstName && user.lName == lastName);
        let currentId = currentUser.id;

        filteredResumes.value = resumeObjects.value.filter((resume) => {
            return resume.userId == currentId;
        });
    }
    console.log("filtered resumes:")
    console.log(filteredResumes)
}


let showPreview = ref(false);
let currentResumeId = ref(0);
function showPreviewFunction(resumeId) {
    currentResumeId.value = resumeId;
    console.log("showing preview for resumeId:" + currentResumeId.value)
    showPreview.value = true;
}

// getting a list of all users
let all_users = ref(["All"])
let all_user_objects = ref([])
let selectedUser = ref()
userServices.getAll().then((res) => {
    res.data.forEach((item) => {
        let user = item
        all_users.value.push(user.fName + " " + user.lName)
        all_user_objects.value.push(user);
    });
    console.log("users:")
    console.log(all_users)
});
</script>
<style scoped></style>