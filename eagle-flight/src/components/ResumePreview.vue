<template>
    <div class="background" @click="$emit('hidePreviewEmit')"></div>
    <v-row justify="center">
        <v-card class="card-container">
            <v-container style="display: inline-flex;">
                <v-card color="rgb(190,190,190)" width="66.67vh">
                    <v-card-title>This is where the resume preview will go</v-card-title>
                    <v-card-text>Resume preview will be displayed here either as an html or image/pdf</v-card-text>
                </v-card>
                <v-card width="60vh">
                    <v-card height="50vh">
                        <v-card>
                            <v-row justify="end" no-gutters align="center">
                                <icon-row></icon-row>
                                <v-spacer></v-spacer>
                                <v-icon @click="$emit('hidePreviewEmit')" size="30px">
                                    mdi-fullscreen-exit</v-icon>
                            </v-row>
                        </v-card>
                        <v-timeline align="start" side="end" density="comfortable" line-thickness="0"
                            style="overflow-y: auto;">
                            <v-timeline-item v-for="comment in comments">
                                <template v-slot:icon>
                                    <v-avatar color="primary">
                                        <span>{{ comment.initials }}</span>
                                    </v-avatar>
                                </template>
                                <v-card color="white" max-width="95%" style="border-radius: 10px;">
                                    <v-card-title>{{ comment.author }}</v-card-title>
                                    <v-card-text>{{ comment.text }}</v-card-text>
                                </v-card>
                            </v-timeline-item>
                            <div style="height: 40px;"></div>
                        </v-timeline>
                    </v-card>
                    <v-card>
                        <v-text-field label="Comment" density="comfortable" v-model="newComment" :disabled="isAdmin ? false : true"
                            @keyup.enter="addComment">
                        </v-text-field>
                    </v-card>
                    <v-card color="indigo" height="26vh">
                        <v-card color="indigo-darken-3">
                            <v-card-title>AI Suggestion</v-card-title>
                        </v-card>
                        <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero repudiandae sit
                            sequi blanditiis soluta
                            odit ab quibusdam corrupti provident totam! Nulla laboriosam saepe quibusdam quas magnam
                            odit voluptate animi
                            deleniti.</v-card-text>
                    </v-card>
                </v-card>
            </v-container>
        </v-card>
    </v-row>
</template>

<script setup>
import { ref } from 'vue'
import commentServices from '../services/commentServices.js'
import Utils from '@/config/utils.js';

let props = defineProps({
    resumeId: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

let isAdmin = props.isAdmin
console.log(isAdmin)
let resumeId = props.resumeId
let comments = ref([])
getResumeComments(resumeId)
function getResumeComments(resumeId) {
    console.log("Getting comments for resume:" + resumeId)
    commentServices.getAllForResume(resumeId).then((res) => {
        res.data.forEach((comment) => {
            comment.initials = comment.author.split(" ").map((n) => n[0]).join("")
            comments.value.push(comment)
        })
    });
}

let user = Utils.getStore("user")
let userName = user.fName + " " + user.lName
let userInitials = user.fName[0] + user.lName[0]
let newComment = ref("")
function addComment() {
    if (newComment.value == "") {
        return
    }
    let comment = {
        author: userName,
        text: newComment.value,
        resumeResumeId: resumeId,
    }
    commentServices.create(comment, resumeId).then((res) => {
        newComment.value = ""
        comment.initials = userInitials,
            comments.value.push(comment)
    });

}

</script>

<style scoped>
.v-card {
    border-radius: 0%;
}

.background {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
}

.card-container {
    z-index: 5;
    position: fixed;
    margin-top: 35px;
}
</style>