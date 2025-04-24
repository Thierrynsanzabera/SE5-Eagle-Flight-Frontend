<template>
    <v-card color="transparent" height="64px"></v-card>
    <v-container class="d-flex justify-center">
        <v-card width="1600px" color="background" class="px-4" elevation="10">
            <v-card-title class="text-h4 text-center">Hello {{ studentBody.fName }} {{ studentBody.lName
                }}</v-card-title>
            <v-card-title class="text-body-2 text-center mt-0 mb-4">Let's get your account set up</v-card-title>

            <v-form ref="form" v-model="formIsValid">
                <v-container width="60%">
                    <v-card color="background" class="mb-4">
                        <v-card-title class="text-center text-body">What is your OC ID?</v-card-title>
                        <v-container class="d-flex justify-center align-center" width="60%">
                            <v-text-field label="OC ID" placeholder="e.g. 1235678" variant="underlined"
                                :rules="[v => /^\d{7,8}$/.test(v) || 'Enter a valid OC ID']" clearable
                                v-model="studentBody.ocId"></v-text-field>
                        </v-container>
                    </v-card>

                    <v-card color="transparent" class="mb-4">
                        <v-card-title class="text-center text-body">What is your Major?</v-card-title>
                        <v-container class="d-flex justify-center align-center" width="60%">
                            <v-select label="Major" :items="majors" v-model="studentBody.majorId" item-title="name"
                                variant="underlined" item-value="id"
                                :rules="[v => !!v || 'Major is required']"></v-select>
                        </v-container>
                    </v-card>

                    <v-card color="transparent" class="mb-4">
                        <v-card-title class="text-center text-body">What is your enrollment year and
                            semester?</v-card-title>
                        <v-row class="mx-2">
                            <v-col cols="6">
                                <v-text-field label="Year" :rules="yearRules" v-model="studentBody.enrollmentYear"
                                    variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select label="Semester" :items="['Fall', 'Spring']"
                                    v-model="studentBody.enrollmentSemester" variant="underlined"
                                    :rules="[v => !!v || 'Semester is required']"></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card color="transparent" class="mb-4">
                        <v-card-title class="text-center text-body">What is your expected graduation year and
                            semester?</v-card-title>
                        <v-row class="mx-2">
                            <v-col cols="6">
                                <v-text-field label="Year" :rules="graduationYearRules"
                                    v-model="studentBody.graduationYear" variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select label="Semester" :items="['Fall', 'Spring']"
                                    v-model="studentBody.graduationSemester" variant="underlined"
                                    :rules="[v => !!v || 'Semester is required']"></v-select>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-btn color="primary" width="100%" size="large" class="mt-2" :disabled="!formIsValid"
                        @click="saveAndGoHome">
                        Continue
                    </v-btn>
                </v-container>
            </v-form>

        </v-card>

    </v-container>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import Utils from '@/config/utils';
import userServices from '@/services/userServices';
import majorServices from '@/services/eagle-flight/majorServices'
import studentServices from '@/services/eagle-flight/studentServices'
import planServices from '@/services/eagle-flight/planServices';


const router = useRouter();

const majors = ref([])
getMajors()

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
    v => v >= studentBody.value.enrollmentYear || "Graduation year must be after or equal to enrollment year",
];

//===============================================================================

// User Stuff

let user = Utils.getStore("user");
let userId = user.userId;
loadUserInfo();

let studentBody = ref({
    userId: userId,
    fName: "",
    lName: "",
    ocId: "",
    majorId: "",
    points: "",
    enrollmentYear: "",
    enrollmentSemester: "",
    graduationYear: "",
    graduationSemester: ""
});

//===============================================================================


// Getters
// this will be just for first name and last name here
function loadUserInfo() {
    userServices.getUserForId(userId)
        .then(response => {
            studentBody.value.fName = response.data.user.fName;
            studentBody.value.lName = response.data.user.lName;
        })
        .catch(e => {
            console.log(e);
        });
}

function getMajors() {
    majorServices.getAll().then(
        response => {
            console.log(response.data)
            majors.value = response.data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

//===============================================================================

// Save and go home
const form = ref(null)
const formIsValid = ref(false)

async function saveAndGoHome() {
    if (!(await form.value?.validate())) {
        console.log("Form is not valid");
        return;
    }
    try {
        await studentServices.addStudent(studentBody.value)
        await planServices.startInstance(userId)
        await planServices.populateInstance(userId)

        router.push({ name: "home" });
        return;
    }
    catch (error) {
        console.error("Error saving student data:", error);
    }
}
</script>

<style scoped></style>