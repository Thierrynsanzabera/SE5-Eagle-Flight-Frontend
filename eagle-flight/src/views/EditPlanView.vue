<template>
    <v-overlay :model-value="editFpStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editFpStore.expandedComboOpen = false">
        <ExpandedCombo />
    </v-overlay>
    <v-overlay :model-value="editFpStore.showOverlay" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editFpStore.showOverlay = false">
        <NewTemplateOverlay />
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
