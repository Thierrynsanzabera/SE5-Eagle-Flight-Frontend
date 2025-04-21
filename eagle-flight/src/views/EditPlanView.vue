<template>
    <v-overlay :model-value="editFpStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editFpStore.expandedComboOpen = false">
        <ExpandedCombo />
    </v-overlay>
    <v-overlay :model-value="editFpStore.showOverlay" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editFpStore.showOverlay = false">
        <NewTemplateOverlay />
    </v-overlay>
    <v-overlay :model-value="editFpStore.showDeleteOverlay" class="d-flex justify-center align-center" z-index="1">
        <v-card height="140px" class="d-flex flex-column justify-space-between pa-4">
            <v-card-title style="min-height: 48px">
                Are you sure you want to delete {{ editFpStore.selectedTemplate.title }}?
            </v-card-title>
            <v-spacer></v-spacer>
            <v-row class="justify-center">
                <v-btn class="mx-2" @click="editFpStore.deletePlan" size="large" color="red" variant="outlined">
                    Delete
                </v-btn>
                <v-btn class="mx-2" size="large" color="background" variant="outlined">
                    Cancel
                </v-btn>
            </v-row>
        </v-card>
    </v-overlay>
    <v-overlay :model-value="editFpStore.showSaveOverlay" class="d-flex justify-center align-center" z-index="1">
        <v-card height="100px" class="d-flex flex-column justify-space-between pa-4">
            <v-card-title style="min-height: 28px">
                {{ editFpStore.selectedTemplate.title }} was saved successfully!
            </v-card-title>
        </v-card>
    </v-overlay>

    <v-card color="transparent" height="64"></v-card>
    <v-container class="d-flex justify-center align-center">
        <TaskList @task-selected="passToEdit" class="mx-3" />
        <TaskEditor :task="selectedTask" class="mx-3" />
    </v-container>
    <v-container class="d-flex justify-center align-center">
        <FpManager />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useEditFpStore } from "@/store/editFpStore";

const editFpStore = useEditFpStore();
const selectedTask = ref(null);

function passToEdit(task) {
    selectedTask.value = task;
}
</script>
