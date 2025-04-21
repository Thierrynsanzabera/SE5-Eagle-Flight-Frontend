<template>
    <v-card color="primary" width="136px" height="160px" rounded="true" hover="true" class="hoverable"
        @click="expandSemester()">
        <v-card-title class="pb-0 text-center text-caption">Semester {{ semesterNumber }}</v-card-title>
        <v-container class="d-flex justify-center px-0 py-0" height="80%">
            <v-list bg-color="transparent" width="96%" max-height=96% class="my-list">
                <v-card v-for="task in tasks" class="mb-3 d-flex align-center justify-center" color="background"
                    height="16px">
                    <v-card-title class="d-flex align-center justify-center">
                        <v-title style="font-size: 10px">{{ task.name }}</v-title>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>
</template>
<script setup>
import { computed } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'

const editFpStore = useEditFpStore()

const props = defineProps({
    yearNumber: Number,
    semesterNumber: Number,
})

const tasks = computed(() => editFpStore.currentPlanTasks[props.yearNumber - 1][props.semesterNumber - 1])

function expandSemester() {
    editFpStore.expandedComboOpen = true
    editFpStore.semesterNumber = props.semesterNumber
    editFpStore.yearNumber = props.yearNumber
}

</script>
<style scoped>
.hoverable {
    transition: transform 0.3s ease, filter 0.3s ease;
}

.hoverable:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
}

.my-list::-webkit-scrollbar {
    width: 4px;
    background: #444444;
}

.my-list::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 0.5);
}
</style>