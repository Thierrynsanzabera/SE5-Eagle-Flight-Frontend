<template>
    <v-card color="background" width="800px" height="400px" elevation=2>
        <v-card-title class="d-flex justify-center align-center py-0 mt-1" style="width: 100%;font-size:130%;">
            {{ title }}
        </v-card-title>
        <v-tabs v-model="fpInstanceStore.selectedCategory" bg-color="background" class="mb-0" height="35px">
            <v-tab value="tasks">Tasks({{ fpInstanceStore.tasksLeft }})</v-tab>
            <v-tab value="experiences">Experiences({{ fpInstanceStore.experiencesLeft }})</v-tab>
        </v-tabs>
        <v-container class="d-flex justify-center align-center px-0 pt-0 mx-0" height="85%" width="100%">
            <v-list bg-color="secondary" class="my-list px-1" style="overflow-y: auto;" width=100% height=98%
                rounded-sm>
                <v-card v-for="task in fpInstanceStore.filteredTasks"
                    :class="!task.isPostponed ? 'mb-3 clickable-card' : 'mb-3'"
                    :color="!task.isPostponed ? 'background' : 'grey lighten-2'" elevation="4" hover ripple
                    @click="!task.isPostponed ? fpInstanceStore.selectedTask = task : null">
                    <v-card-title class="d-flex justify-space-between align-center text-overline">
                        <span>{{ task.task.name }} ({{ task.task.points }} pts)</span>
                        <v-card v-if="!task.isPostponed" color="primary" height="26px"
                            class="d-flex justify-center align-center" variant="text">
                            {{
                                fpInstanceStore.getSubmissionStatus(task.submissions).text
                            }}
                        </v-card>
                        <v-card v-else color="primary" height="26px" class="d-flex justify-center align-center"
                            variant="text">
                            📆 Postponed
                        </v-card>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>

</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useFpInstanceStore } from '@/store/instanceFpStore'

const fpInstanceStore = useFpInstanceStore()
const title = computed(() => {
    if (fpInstanceStore.selectedSemester == null) {
        return "\u00A0"
    }
    return fpInstanceStore.selectedSemester.label
})

</script>
<style scoped>
.my-list::-webkit-scrollbar {
    width: 7px;
    background: rgb(255, 255, 255);

}

.my-list::-webkit-scrollbar-thumb {
    background: #a5a5a5;
    border-radius: 5px;
    box-shadow: 0 0 5px #000000;
}

.clickable-card {
    transition: transform 0.2s;
}

.clickable-card:hover {
    transform: scale(1.005);
}
</style>