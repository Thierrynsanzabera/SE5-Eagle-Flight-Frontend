<template>
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
                        <v-list>
                        <v-list-item
                            v-for="(badge, index) in limitedBadges"
                            :key="badge.id"
                            class="py-1 badge-list-item"
                        >
                            <v-list-item-avatar size="40">
                            <v-img :src="badge.imagePath" alt="Badge Image"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                            <v-list-item-title class="text-body-1">{{ badge.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        </v-list>
                        <v-row justify="end">
                        <v-col class="mt-1 d-flex justify-center">
                            <v-btn color="primary" @click="showAllBadges = true">View All</v-btn>
                        </v-col>
                        </v-row>

                        <!-- View All Dialog -->
                        <v-dialog v-model="showAllBadges" max-width="800px">
                        <v-card>
                            <v-card-title class="d-flex justify-space-between">
                            <span>All Badges</span>
                            <v-btn icon @click="showAllBadges = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-list>
                            <v-list-item
                                v-for="badge in badges"
                                :key="badge.id"
                                class="py-2"
                            >
                                <v-list-item-avatar size="40">
                                <v-img :src="badge.imagePath" alt="Badge Image"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                <v-list-item-title>{{ badge.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ badge.description }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            </v-list>
                        </v-card>
                        </v-dialog>

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
import { ref, computed } from 'vue';
import Utils from '@/config/utils';
import userServices from '@/services/userServices';
import badgeServices from '@/services/badgeServices';


let user = Utils.getStore("user");
let userId = user.userId;

const badges = ref([]);
const showAllBadges = ref(false);
const limitedBadges = computed(() => badges.value.slice(0, 3));

function loadBadges() {
  badgeServices.getAllBadges()
    .then(response => {
      badges.value = response.data;
    })
    .catch(error => {
      console.error("Error loading badges:", error);
    });
}

function viewAllBadges() {
  console.log('View All Badges clicked');
}

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
loadBadges();


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

<style scoped>
.badge-list-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 1px;
}
</style>