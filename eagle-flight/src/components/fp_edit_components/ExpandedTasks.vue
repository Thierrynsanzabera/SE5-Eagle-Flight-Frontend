<template>
    <v-card color="primary" width="500px" height="500px">
        <v-card-title class="text-center pb-0">All Tasks</v-card-title>
        <v-card color="transparent" width="100%" height="90%" class="d-flex justify-center align-center">
            <v-list bg-color="transparent" width=96% max-height=96%>
                <v-card v-for="task in availableTasks" :key="task.id" class="d-flex align-center mb-3" color="background"
                    height="30px" @click="selectTask(task)">
                    <v-card-title class="d-flex w-100">
                        <span class="text-overline">{{ task.name }}</span>
                        <v-spacer></v-spacer>
                        <v-icon color="primary" class="add-icon" @click="addTaskToPlan(task.id)">mdi-plus</v-icon>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-card>
    </v-card>
</template>
<script setup>
import taskServices from '@/services/eagle-flight/taskServices'
import planServices from '@/services/eagle-flight/planServices'
import { ref } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'

const tasks = ref([])
const availableTasks = ref([])
const editFpStore = useEditFpStore();

getTasks()

function getTasks() {
    taskServices.getAll().then(
        response => {
            tasks.value = response.data
            setAvailableTasks()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}


function setAvailableTasks() {
    const currentPlanTaskIds = new Set(
        editFpStore.currentPlanTasks.flat(2).map(task => task.id)
    )

    availableTasks.value = tasks.value.filter(
        task => !currentPlanTaskIds.has(task.id)
    )
}

function addTaskToPlan(taskId) {
    let body = {
        "taskId": taskId,
        "semesterUntilGraduation": editFpStore.getSemesterUntilGraduation()
    }
    planServices.addTask(editFpStore.currentPlanId, body).then(
        response => {
            console.log(response.data)
            tasks.value = response.data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
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