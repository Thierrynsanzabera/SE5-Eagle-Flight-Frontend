<template>
    <v-card color="transparent" height="64px"></v-card>
    <v-container class="d-flex justify-center">
        <v-card width="1600px" color="background" class="px-4" elevation="10">
            <v-card-title class="text-h4 text-center">Hello {{ userBody.fName }} {{ userBody.lName
                }}</v-card-title>
            <v-card-title class="text-body-2 text-center mt-0 mb-4">Let's get your account set up</v-card-title>

            <v-container width="60%">

                <v-card color="background" class="mb-4">
                    <v-card-title class="text-center text-body">What is your OC ID?</v-card-title>
                    <v-container class="d-flex justify-center align-center" width="60%">
                        <v-text-field label="OC ID" placeholder="e.g. 1235678" variant="underlined"
                            :rules="[v => /^\d{7,8}$/.test(v) || 'Enter a valid OC ID']" clearable
                            v-model="userBody.ocId"></v-text-field>
                    </v-container>
                </v-card>

                <v-card color="transparent" class="mb-4">
                    <v-card-title class="text-center text-body">What is your Major?</v-card-title>
                    <v-container class="d-flex justify-center align-center" width="60%">
                        <v-select label="Select" :items="['cs', 'not cs']"></v-select>
                    </v-container>
                </v-card>

                <v-card color="transparent" class="mb-4">
                    <v-card-title class="text-center text-body">What is your enrollment year and
                        semester?</v-card-title>
                    <v-row class="mx-2">
                        <v-col cols="6">
                            <v-text-field label="Year" :rules="yearRules" v-model="userBody.enrollmentYear"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select label="Semester" :items="['Fall', 'Spring']"
                                v-model="userBody.enrollmentSemester"></v-select>
                        </v-col>
                    </v-row>
                </v-card>

                <v-card color="transparent" class="mb-4">
                    <v-card-title class="text-center text-body">What is your expected graduation year and
                        semester?</v-card-title>
                    <v-row class="mx-2">
                        <v-col cols="6">
                            <v-text-field label="Year" :rules="graduationYearRules"
                                v-model="userBody.graduationYear"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select label="Semester" :items="['Fall', 'Spring']"
                                v-model="userBody.graduationSemester"></v-select>
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn color="primary" width="100%" size="large" @click="saveAndGoHome()">
                    Continue
                </v-btn>

            </v-container>
        </v-card>

    </v-container>

</template>

<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import userServices from '@/services/userServices';


// rules for years
const currentYear = new Date().getFullYear();

const yearRules = [
    v => !!v || "Year is required",
    v => /^\d{4}$/.test(v) || "Year must be exactly 4 digits",
    v => !isNaN(v) || "Year must be a number",
    v => v >= 2015 || "Year cannot be before 2015",
    v => Number.isInteger(Number(v)) || "Year must be an integer",
    v => v <= currentYear || `Year cannot be after ${currentYear}`,
];

const graduationYearRules = [
    v => !!v || "Year is required",
    v => /^\d{4}$/.test(v) || "Year must be exactly 4 digits",
    v => !isNaN(v) || "Year must be a number",
    v => Number.isInteger(Number(v)) || "Year must be an integer",
    v => v >= userBody.value.enrollmentYear || "Graduation year must be after or equal to enrollment year",
];

//===============================================================================


let user = Utils.getStore("user");
let userId = user.userId;


let userBody = ref({
    fName: "",
    lName: "",
    ocId: "",
    enrollmentYear: "",
    enrollmentSemester: "",
    graduationYear: "",
    graduationSemester: ""
});

//still need: major, expected graduation, list of badges, strength, documents, points

loadUserInfo();


function loadUserInfo() {
    userServices.getUserForId(userId)
        .then(response => {
            userBody.value = { ...userBody.value, ...response.data.user, ...response.data.student };
            console.log(userBody.value);
        })
        .catch(e => {
            console.log(e);
        });
}

</script>

<style scoped></style>