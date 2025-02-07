<template>
    <!-- Button to Open Add/Edit Dialog -->
    <v-icon v-if="mode === 'add'" @click="openDialog" size="40px">mdi-plus</v-icon>
    <v-icon v-else @click="openDialog">mdi-pencil</v-icon>
  
    <!-- Dialog for Add/Edit -->
    <v-dialog v-model="showExperienceDialog">
      <v-card color="secondary" max-width="95vw">
        <v-card-title>{{ mode === 'add' ? 'Add experience' : 'Edit' }}</v-card-title>
        <v-row>
          <v-col cols="4">
            <v-text-field label="Company Name" type="text" required
              v-model="experience.companyName"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Job Title" type="text" required v-model="experience.jobRole"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="City" type="text" required v-model="experience.city"></v-text-field>
          </v-col>
          <v-col>
            <v-select label="State" :items="statesShort" required v-model="experience.state"></v-select>
          </v-col>
          <v-col>
            <v-text-field label="Start Date *" type="month" required v-model="experience.startDate"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="End Date *" type="month" required v-model="experience.endDate"></v-text-field>
          </v-col>
        </v-row>
            <v-textarea label="Accomplishment " v-model="experience.accomplishment"
            placeholder="Accomplished {X} as measured by {Y}, by doing {Z} | Action + Project/Problem + Results = Accomplishment"></v-textarea>
  
        <!-- Save Button -->
        <v-btn color="primary" @click="saveexperience">Save</v-btn>
      </v-card>
    </v-dialog>
  </template>


<script setup>
import { ref } from 'vue';
import experienceServices from '@/services/experienceServices';

const emit = defineEmits(["refresh-data"]);


let statesShort = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
    'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];


const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  experienceList: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    default: "add",
  },
  experienceToEdit: {
    type: Object,
    default: () => ({}),
  },
});

let showExperienceDialog = ref(false);

let experience = ref({
    companyName: '',
    jobRole: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    accomplishment: '',
    userId: props.userId,
});

// Open the dialog for add or edit
const openDialog = () => {
  if (props.mode === "edit") {
    // Pre-fill experience object for editing
    experience.value = { ...props.experienceToEdit };
  } else {
    // Clear experience object for adding
    experience.value = {
    companyName: '',
    jobRole: '',
    city: '',
    state: '',
    accomplishment: '',
    startDate: '',
    endDate: '',
    userId: props.userId,
    };
  }
  showExperienceDialog.value = true;
};

// Save experience (Add or Edit)
const saveexperience = () => {
  if (props.mode === "add") {
    // Add new experience
    experienceServices
      .create(experience.value)
      .then((res) => {
        console.log("experience added:", res);
        props.experienceList.push(experience.value); // Update the list
        showExperienceDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error adding experience:", err);
      });
  } else if (props.mode === "edit") {
    // Update existing experience
    experienceServices
      .update(experience.value.experienceId, experience.value)
      .then((res) => {
        console.log("experience updated:", res);
        const index = props.experienceList.findIndex(
          (e) => e.experienceId === experience.value.experienceId
        );
        if (index !== -1) {
          props.experienceList[index] = experience.value; // Update the list
        }
        showExperienceDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error updating experience:", err);
      });
  }
};
</script>
<style scoped></style>