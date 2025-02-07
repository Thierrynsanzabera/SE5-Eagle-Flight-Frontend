<template>
    <v-container>
        <v-col>
            <v-row justify="center">
                <v-card color="transparent" style="font-size: 30px; margin-bottom: 10px;">
                    <span class="font-weight-light">Information for {{ userBody.fName + " " + userBody.lName }}</span>
                </v-card>
            </v-row>
            <v-form>
                <!-- Basic Information Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <h2>Basic Information</h2>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Name and City</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="userBody.fName" label="First Name *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.lName" label="Last Name *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.city" label="City *" type="text"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="userBody.state" label="State *" :items="states" required></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card color="transparent" class="mb-3">
                        <v-card-title>
                            <h3>Contact and Links</h3>
                        </v-card-title>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="userBody.phoneNumber" label="Phone Number *" type="phone-number"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.contactEmail" label="Email *" type="email"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="userBody.linkedInUrl" label="LinkedIn/Website"
                                    type="text"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>


                <!-- Education Section -->
                <v-card color="secondary" class="mb-4">

                    <v-card-title>
                        <v-row>
                            <h2>Education</h2>
                            <v-spacer />
                            <add-education :userId="userId" :educationList="currentEducations" mode="add"
                                @refresh-data="refreshEducationData" />
                        </v-row>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="education in currentEducations" cols="6">
                                <v-card class=" mb-2">
                                    <v-card-title>
                                        <v-row>
                                            <h3>{{ education.institutionName }}</h3>
                                            <v-spacer />
                                            <add-education :userId="userId" :educationList="currentEducations"
                                                mode="edit" :educationToEdit="education"
                                                @refresh-data="refreshEducationData" />
                                            <v-icon @click="deleteEducation(education.educationId)">mdi-delete</v-icon>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ education.degree || education.bachalorName }}</p>
                                        <p>{{ education.city }}, {{ education.state }}</p>
                                        <p>{{ education.startDate }} - {{ education.endDate }}</p>
                                        <p>GPA: {{ education.gpa }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>

                <!-- Professional Experience Section -->
                <v-card color="secondary" class="mb-4">

                    <v-card-title>
                        <v-row>
                            <h2>Professional Experience</h2>
                            <v-spacer />
                            <add-experience :userId="userId" :experienceList="currentExperiences" mode="add"
                                @refresh-data="refreshExperienceData" />
                        </v-row>
                    </v-card-title>


                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="experience in currentExperiences" cols="6">
                                <v-card class=" mb-2">
                                    <v-card-title>
                                        <v-row>
                                            <h3>{{ experience.companyName }}</h3>
                                            <v-spacer />
                                            <add-experience :userId="userId" :experienceList="currentExperiences"
                                                mode="edit" :experienceToEdit="experience"
                                                @refresh-data="refreshExperienceData" />
                                            <v-icon
                                                @click="deleteExperience(experience.experienceId)">mdi-delete</v-icon>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>{{ experience.jobRole }}</p>
                                        <p>{{ experience.city }}, {{ experience.state }}</p>
                                        <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
                                        <p v-for="accomplishment in experience.accomplishments" :key="accomplishment">{{
                                            accomplishment }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>

                <!-- Skills -->
                <v-card color="primary" class="mb-4">
                    <v-card-title>
                        <v-row>
                            <h2>Skills</h2>
                            <v-spacer />
                            <add-skill :userId="userId" :skillList="currentSkills" mode="add"
                                @refresh-data="refreshSkillData" />
                        </v-row>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="skill in currentSkills" cols="6">
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <v-row>
                                            <v-spacer />
                                            <add-skill :userId="userId" :skillList="currentSkills" mode="edit"
                                                :skillToEdit="skill" @refresh-data="refreshSkillData" />
                                            <v-icon @click="deleteSkill(skill.skillId)">mdi-delete</v-icon>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text v-if="skill.type == 'Language'">
                                        <h3>{{ skill.title }} - {{ skill.proficiency }}</h3>
                                    </v-card-text>
                                    <v-card-title v-else>
                                        <h3>{{ skill.title }}</h3>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>


                <!-- Projects Section -->
                <v-card color="secondary" class="mb-4">
                    <v-card-title>
                        <v-row>
                            <h2>Projects</h2>
                            <v-spacer />
                            <add-project :userId="userId" :projectList="currentProjects" mode="add"
                                @refresh-data="refreshProjectData" />
                        </v-row>
                    </v-card-title>

                    <v-card color="transparent" class="mb-3">
                        <v-row>
                            <v-col v-for="project in currentProjects" cols="6">
                                <v-card class="mb-2">
                                    <v-card-title>
                                        <v-row>
                                            <v-spacer />
                                            <add-project :userId="userId" :projectList="currentProjects" mode="edit"
                                                :projectToEdit="project" @refresh-data="refreshProjectData" />
                                            <v-icon @click="deleteProject(project.projectId)">mdi-delete</v-icon>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <h3>{{ project.projectName }}</h3>
                                    </v-card-text>
                                    <v-card-text>
                                        <p>{{ project.startDate }}</p>
                                        <p>{{ project.endDate }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-card>
            </v-form>
            <v-btn @click="saveUser">Save</v-btn>
        </v-col>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Utils from '@/config/utils.js';
import userServices from '@/services/userServices.js';
import educationServices from '@/services/educationServices';
import experienceServices from '@/services/experienceServices';
import skillServices from '@/services/skillServices';
import projectServices from '@/services/projectServices';

let userBody = ref({
    fName: "",
    lName: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    contactEmail: "",
    linkedInUrl: "",
})

// start of lists of data for resume

let currentEducations = ref([])
let currentExperiences = ref([])
let currentSkills = ref([])
let currentProjects = ref([])

const userStore = ref(null);
userStore.value = Utils.getStore("user");
let userId = userStore.value.userId

// constants for data editing
const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]
const statesShort = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
    "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
const proficiencyLevels = [
    "Beginner", "Intermediate", "Advanced", "Fluent", "Native"
];

// getting user's data from the backend
userServices.getUserForId(userId)
    .then(response => {
        userBody.value = response.data;
    })
    .catch(e => {
        console.log(e);
    });

educationServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let education = item;
        console.log(item)
        currentEducations.value.push(education);
    });
});
experienceServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let experience = item;
        console.log(item)
        currentExperiences.value.push(experience);
    });
});
skillServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let skill = item;
        console.log(item)
        currentSkills.value.push(skill);
    });
});
projectServices.getAllForUser(userId).then((res) => {
    res.data.forEach((item) => {
        let project = item;
        console.log(item)
        currentProjects.value.push(project);
    });
});

let refreshExperienceData = () => {
    experienceServices.getAllForUser(userId)
        .then((res) => {
            currentExperiences.value = res.data;
            console.log("Experience data refreshed:", currentExperiences.value);
        })
        .catch((err) => {
            console.error("Error refreshing experience data:", err);
        });
};

let deleteExperience = (experienceId) => {
    experienceServices.delete(experienceId)
        .then((response) => {
            console.log("Experience deleted:", response);
            refreshExperienceData();
        })
        .catch((error) => {
            console.error("Error deleting experience:", error);
        });
};

let refreshEducationData = () => {
    educationServices.getAllForUser(userId)
        .then((res) => {
            currentEducations.value = res.data;
            console.log("Education data refreshed:", currentEducations.value);
        })
        .catch((err) => {
            console.error("Error refreshing education data:", err);
        });
};

let deleteEducation = (educationId) => {
    educationServices.delete(educationId)
        .then((response) => {
            console.log("Education deleted:", response);
            refreshEducationData();
        })
        .catch((error) => {
            console.error("Error deleting education:", error);
        });
};

let refreshSkillData = () => {
    skillServices.getAllForUser(userId)
        .then((res) => {
            currentSkills.value = res.data;
            console.log("Skill data refreshed:", currentSkills.value);
        })
        .catch((err) => {
            console.error("Error refreshing skill data:", err);
        });
};

let deleteSkill = (skillId) => {
    skillServices.delete(skillId)
        .then((response) => {
            console.log("Skill deleted:", response);
            refreshSkillData();
        })
        .catch((error) => {
            console.error("Error deleting skill:", error);
        });
};

let refreshProjectData = () => {
    projectServices.getAllForUser(userId)
        .then((res) => {
            currentProjects.value = res.data;
            console.log("Project data refreshed:", currentProjects.value);
        })
        .catch((err) => {
            console.error("Error refreshing project data:", err);
        });
};

let deleteProject = (projectId) => {
    projectServices.delete(projectId)
        .then((response) => {
            console.log("Project deleted:", response);
            refreshProjectData();
        })
        .catch((error) => {
            console.error("Error deleting project:", error);
        })
}


let saveUser = () => {
    userBody.updatedAt = new Date();
    userServices.update(userId, userBody.value)
        .then(response => {
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}
</script>

<style scoped></style>