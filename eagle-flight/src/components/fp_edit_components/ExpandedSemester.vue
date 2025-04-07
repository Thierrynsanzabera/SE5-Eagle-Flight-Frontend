<template>
    <v-card color="primary" width="500px" height="500px" rounded="true">
        <v-card-title class="text-center pb-0">Semester: {{ editFpStore.semesterNumber }}</v-card-title>
        <v-card-subtitle class="text-center pb-0">Year: {{ editFpStore.yearNumber }} Major: {{ editFpStore.major
            }}</v-card-subtitle>
        <v-container class="d-flex justify-center px-0 py-0" height="80%">
            <v-list bg-color="transparent" width="96%" max-height=96% class="my-list">
                <v-card v-for="task in tasks" class="mb-3 d-flex align-center justify-center" color="background"
                    height="30px">
                    <v-card-title class="d-flex w-100">
                        <span class="text-overline">{{ task.name }}</span>
                        <v-spacer></v-spacer>
                        <v-icon color="primary" class="add-icon"
                            @click="removeFromTaskToPlan(task.id)">mdi-minus</v-icon>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'
import planServices from '@/services/eagle-flight/planServices'

const editFpStore = useEditFpStore()

const tasks = ref([])

watch(
    [() => editFpStore.yearNumber, () => editFpStore.semesterNumber],
    ([newYear, newSemester]) => {
        tasks.value = editFpStore.currentPlanTasks[newYear - 1][newSemester - 1]
    },
    { immediate: true }
)


function removeFromTaskToPlan(taskId) {
    let planId = editFpStore.currentPlanId
    planServices.deleteTask(planId, taskId).then(
        response => {
            console.log(response)
            editFpStore.getPlan()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

</script>
<style scoped>
.my-list::-webkit-scrollbar {
    width: 4px;
    background: #444444;
}

.my-list::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 0.5);
}
</style>