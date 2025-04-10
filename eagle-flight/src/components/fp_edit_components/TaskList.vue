<template>
    <v-card color="primary" width="500px" height="300px">
        <v-card-title class="text-center pb-0">Manage Tasks</v-card-title>
        <v-card color="transparent" width="100%" height="85%" class="d-flex justify-center align-center">
            <v-list bg-color="transparent" width=96% max-height=96%>
                <v-card v-for="task in tasks" :key="task.id" class="d-flex align-center mb-3"
                    :color="selectedTask == task ? 'primary' : 'background'" height="40px" link
                    @click="selectTask(task)">
                    <v-card-title class="d-flex w-100">
                        <span class="text-overline">{{ task.name }}</span>
                        <v-spacer></v-spacer>
                        <v-icon :color="selectedTask == task ? 'background' : 'primary'" class="delete-icon"
                            @click="deleteTask(task)">mdi-delete-circle</v-icon>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-card>
    </v-card>
</template>
<script setup>
import taskServices from '@/services/eagle-flight/taskServices'
import { ref, watch, computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'

let tasks = ref([])
let selectedTask = computed(() => taskStore.selectedTask)

getTasks()

const taskStore = useTaskStore();

function selectTask(task) {
    taskStore.setSelectedTask(task);
}

function getTasks() {
    taskServices.getAll().then(
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
function deleteTask(task) {
    taskServices.delete(task.id).then(
        response => {
            console.log(response.data)
            getTasks()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

</script>
<style scoped>
.delete-icon {
    transition: transform 0.2s ease-in-out;
}

.delete-icon:hover {
    transform: scale(1.1);
}
</style>