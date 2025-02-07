<template>
    <v-icon v-if="mode === 'add'" @click="openDialog" size="40px">mdi-plus</v-icon>
    <v-icon v-else @click="openDialog">mdi-pencil</v-icon>

    <v-dialog v-model="showProjectDialog">
        <v-container class="justify-center">
        <v-card color="primary" max-width="95vw">
        <v-card-title>{{ mode === 'add' ? 'Add project' : 'Edit' }}</v-card-title>
                    <v-text-field v-model="project.projectName" label="Project Name *" type="text" required></v-text-field>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field v-model="project.startDate" label="Start Date *" type="month" required></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="project.endDate" label="End Date *" type="month" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn @click="saveProject">Save</v-btn>
            </v-container>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import projectServices from '@/services/projectServices';

const emit = defineEmits(["refresh-data"]);

const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    projectList: {
        type: Array,
        required: true
    },
     mode: {
        type: String,
        default: "add",
    },
    projectToEdit: {
        type: Object,
        default: () => ({}),
    },
});
let showProjectDialog = ref(false);
let userId = props.userId;

let project = ref({
    projectName: '',
    startDate: '',
    endDate: '',
    userId: userId,
});


// Open the dialog for add or edit
const openDialog = () => {
  if (props.mode === "edit") {
    // Pre-fill project object for editing
    project.value = { ...props.projectToEdit };
  } else {
    // Clear project object for adding
    project.value = {
      projectName: '',
      startDate: '',
      endDate: '',
      userId: userId,
    };
  }
  showProjectDialog.value = true;
};

// Save project (Add or Edit)
const saveProject = () => {
  if (props.mode === "add") {
    // Add new project
    projectServices
      .create(project.value)
      .then((res) => {
        console.log("project added:", res);
        props.projectList.push(project.value); // Update the list
        showProjectDialog.value = false; // Close dialog
        emit("refresh-data");
      })
      .catch((err) => {
        console.error("Error adding project:", err);
      });
  } else if (props.mode === "edit") {
    // Update existing project
    projectServices
      .update(project.value.projectId, project.value)
      .then((res) => {
        console.log("project updated:", res);
        const index = props.projectList.findIndex(
          (e) => e.projectId === project.value.projectId
        );
        if (index !== -1) {
          props.projectList[index] = project.value; // Update the list
        }
        showProjectDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error updating project:", err);
      });
  }
};
</script>
<style scoped></style>