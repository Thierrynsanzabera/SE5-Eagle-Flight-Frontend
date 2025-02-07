<template>
  <!-- Button to Open Add/Edit Dialog -->
  <v-icon v-if="mode === 'add'" @click="openDialog" size="40px">mdi-plus</v-icon>
  <v-icon v-else @click="openDialog">mdi-pencil</v-icon>

  <!-- Dialog for Add/Edit -->
  <v-dialog v-model="showEducationDialog">
    <v-container class="justify-center">
      <v-card color="primary" max-width="95vw">
      <v-card-title>{{ mode === 'add' ? 'Add Education' : 'Edit' }}</v-card-title>
      <v-row>
        <v-col cols="4">
          <v-text-field label="University Name *" type="text" required
            v-model="education.institutionName"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field label="City *" type="text" required v-model="education.city"></v-text-field>
        </v-col>
        <v-col>
          <v-select label="State *" :items="statesShort" required v-model="education.state"></v-select>
        </v-col>
        <v-col>
          <v-text-field label="Start Date *" type="month" required v-model="education.startDate"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="End Date *" type="month" required v-model="education.endDate"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field label="Degree *" type="text" required v-model="education.bachalorName"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field label="GPA *" type="number" required v-model="education.gpa"></v-text-field>
        </v-col>
      </v-row>
      <v-col>
        <v-text-field label="Awards" type="text" v-model="education.awards"></v-text-field>
      </v-col>
      <v-text-field label="Coursework" type="text" v-model="education.coursework"></v-text-field>

      <!-- Save Button -->
      <v-btn color="primary" @click="saveEducation">Save</v-btn>
    </v-card>
  </v-container>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import educationServices from "@/services/educationServices";

const emit = defineEmits(["refresh-data"]);

// Props
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  educationList: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    default: "add",
  },
  educationToEdit: {
    type: Object,
    default: () => ({}),
  },
});

let showEducationDialog = ref(false);

let education = ref({
  institutionName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  bachalorName: "",
  gpa: "",
  awards: "",
  coursework: "",
  userId: props.userId,
});

const statesShort = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

// Open the dialog for add or edit
const openDialog = () => {
  if (props.mode === "edit") {
    // Pre-fill education object for editing
    education.value = { ...props.educationToEdit };
  } else {
    // Clear education object for adding
    education.value = {
      institutionName: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      degree: "",
      gpa: "",
      awards: "",
      coursework: "",
      userId: props.userId,
    };
  }
  showEducationDialog.value = true;
};

// Save Education (Add or Edit)
const saveEducation = () => {
  if (props.mode === "add") {
    // Add new education
    educationServices
      .create(education.value)
      .then((res) => {
        console.log("Education added:", res);
        props.educationList.push(education.value); // Update the list
        showEducationDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error adding education:", err);
      });
  } else if (props.mode === "edit") {
    // Update existing education
    educationServices
      .update(education.value.educationId, education.value)
      .then((res) => {
        console.log("Education updated:", res);
        const index = props.educationList.findIndex(
          (e) => e.educationId === education.value.educationId
        );
        if (index !== -1) {
          props.educationList[index] = education.value; // Update the list
        }
        showEducationDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error updating education:", err);
      });
  }
};
</script>

<style scoped>
.v-icon {
  cursor: pointer;
  transition: transform 0.2s;
}

.v-icon:hover {
  transform: scale(1.2);
}
</style>
