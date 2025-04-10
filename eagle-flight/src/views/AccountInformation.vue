<template>
    <v-card color="transparent" height="64px"></v-card>
    <v-container class="d-flex justify-center">
        <v-card width="1600px" color="background" class="px-4" elevation="10">
            <v-row justify="center">
                <v-avatar :image=userTest.pfp size="150" class="mt-10 mb-6"></v-avatar>
            </v-row>
            <v-card-title class="text-h4 text-center">Account Information for {{ userBody.fName }} {{ userBody.lName
                }}</v-card-title>
            <v-row>
                <v-col>
                    <v-card color="transparent" elevation="8" class="px-4">
                        <v-card-title>Basic Information</v-card-title>
                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="First Name" :model-value="userBody.fName"
                                        readonly></v-text-field>
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="Last Name" :model-value="userBody.lName"
                                        readonly></v-text-field>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="OC ID" :model-value="userBody.ocId" readonly></v-text-field>
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="Email" :model-value="userBody.email" readonly></v-text-field>
                                </v-card>
                            </v-col>

                        </v-row>

                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="transparent" elevation="8" class="px-4">
                        <v-card-title>Area of Study</v-card-title>
                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="Major" :model-value="userBody.getMajor" readonly></v-text-field>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-card color="transparent">
                                    <v-text-field label="Enrollment Year" :model-value="userBody.enrollmentYear" readonly></v-text-field>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                                <v-card color="transparent">
                                    <v-text-field label="Enrollment Semester" :model-value="userBody.enrollmentSemester" readonly></v-text-field>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                                <v-card color="transparent">
                                    <v-text-field label="Expected Graduation Year" :model-value="userBody.graduationYear" readonly></v-text-field>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                                <v-card color="transparent">
                                    <v-text-field label="Expected Graduation Semester" :model-value="userBody.graduationSemester" readonly></v-text-field>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card color="transparent" elevation="8" class="px-4">
                        <v-card-title>Badges</v-card-title>
                        The list of badges will go here

                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="transparent" elevation="8" class="px-4">
                        <v-card-title>Clifton Strengths</v-card-title>
                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="Strength" model-value="test" readonly></v-text-field>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-btn color="transparent">Take the test</v-btn> </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card color="transparent" elevation="8" class="px-4">
                        <v-card-title> Points </v-card-title>
                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-text-field label="Number of points" :model-value="userBody.points"
                                        readonly></v-text-field>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-card color="transparent">
                                    <v-btn color=transparent>View History</v-btn> </v-card>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="transparent" elevation="8" class="px-4">
                        <v-card-title>My Documents</v-card-title>
                        TODO
                    </v-card>
                </v-col>
            </v-row>
            
        </v-card>
</v-container>

</template>

<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils';
import userServices from '@/services/userServices';


let user = Utils.getStore("user");
let userId = user.userId;


let userBody = ref({
    pfp: "https://media.newyorker.com/photos/5b203f425ee2c7040773fedc/4:3/w_2251,h_1688,c_limit/760209_ra523.jpg",
});

//still need: major, expected graduation, list of badges, strength, documents, points


let userTest = {
    fName: "David",
    lName: "Santos",
    pfp: "https://media.newyorker.com/photos/5b203f425ee2c7040773fedc/4:3/w_2251,h_1688,c_limit/760209_ra523.jpg",
    ocId: "12345678",
    points: "100",
    email: "david@email.com"
}

loadUserInfo();


function loadUserInfo() {
    userServices.getUserForId(userId)
        .then(response => {
            userBody.value = {...userBody.value, ...response.data.user, ...response.data.student};
            console.log(userBody.value);
        })
        .catch(e => {
            console.log(e);
        });
}

</script>

<style scoped></style>