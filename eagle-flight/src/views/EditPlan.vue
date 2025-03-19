<template>
    <v-card color="transparent" height="64"></v-card>
    <v-display class="d-flex">
        <TaskList @task-selected="passToEdit" />
        <TaskEditor :task="selectedTask" />
    </v-display>
</template>

<script setup>
import { ref } from "vue";

const selectedTask = ref(null);

function passToEdit(task) {
    selectedTask.value = task;
}
</script>
