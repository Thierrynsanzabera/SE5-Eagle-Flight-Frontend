<template>
    <v-card color="transparent" height="64"></v-card>
    <v-container class="d-flex justify-center align-center">
        <TaskList @task-selected="passToEdit" class="mx-3"/>
        <TaskEditor :task="selectedTask" class="mx-3"/>
    </v-container>
    <v-container class="d-flex justify-center align-center"> 
        <FpManager />
    </v-container>
</template>

<script setup>
import { ref } from "vue";

const selectedTask = ref(null);

function passToEdit(task) {
    selectedTask.value = task;
}
</script>
