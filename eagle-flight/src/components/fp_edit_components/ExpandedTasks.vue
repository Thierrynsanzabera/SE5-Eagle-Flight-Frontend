<template>
    <v-card color="primary" width="500px" height="500px">
        <v-card-title class="text-center pb-0">All Tasks</v-card-title>
        <v-card color="transparent" width="100%" height="90%" class="d-flex justify-center align-center">
            <v-list bg-color="transparent" width=96% max-height=96%>
                <v-card v-for="task in editFpStore.availableTasks" :key="task.id" class="d-flex align-center mb-3"
                    color="background" height="30px" @click="selectTask(task)">
                    <v-card-title class="d-flex w-100">
                        <span class="text-overline">{{ task.name }}</span>
                        <v-spacer></v-spacer>
                        <v-icon color="primary" class="add-icon" @click="addTaskToPlan(task)">mdi-plus</v-icon>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-card>
    </v-card>
</template>
<script setup>
import { ref } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'

const editFpStore = useEditFpStore();
editFpStore.setAvailableTasks()

const indexI = editFpStore.yearNumber - 1
const indexJ = editFpStore.semesterNumber - 1

function addTaskToPlan(task) {
    editFpStore.currentPlanTasks[indexI][indexJ].push(task)
}

</script>
<style scoped>
.add-icon {
    transition: transform 0.2s ease-in-out;
}

.add-icon:hover {
    transform: scale(1.1);
}
</style>