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
                        <v-icon color="primary" class="minus-icon" @click="removeFromTaskToPlan(task)">mdi-minus</v-icon>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'

const editFpStore = useEditFpStore()

const indexI = editFpStore.yearNumber - 1
const indexJ = editFpStore.semesterNumber - 1

const tasks = computed(() => {
  const year = editFpStore.yearNumber
  const semester = editFpStore.semesterNumber

  return editFpStore.currentPlanTasks[year - 1]?.[semester - 1] || []
})


function removeFromTaskToPlan(task) {
    editFpStore.currentPlanTasks[indexI][indexJ] = editFpStore.currentPlanTasks[indexI][indexJ].filter(
        (t) => t.id !== task.id
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