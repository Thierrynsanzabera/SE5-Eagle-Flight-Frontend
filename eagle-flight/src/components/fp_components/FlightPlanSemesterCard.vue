<template>
    <v-card color="background" width="800px" height="400px" elevation=8>
        <v-card-title class="d-flex justify-center align-center" style="width: 100%;font-size:140%">
            {{ title }}
        </v-card-title>
        <v-card class="d-flex justify-center align-center" color="background" variant="outlined">
            <v-list bg-color="transparent" width="98%" style="max-height: 300px; overflow-y: auto;">
                <v-card v-for="task in tasks" class="my-3" color="background" elevation="4">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <span>{{ task.title }}</span>
                        <v-btn color="primary">Complete</v-btn>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-card>
    </v-card>

</template>
<script setup>
import { ref } from 'vue'

let title = "FA25"
let tasks = [
    { title: 'Task 1', description: 'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1' },
    { title: 'Task 2', description: 'Description 2' },
    { title: 'Task 3', description: 'Description 3' },
    { title: 'Task 4', description: 'Description 4' },

]
</script>
<style scoped></style>