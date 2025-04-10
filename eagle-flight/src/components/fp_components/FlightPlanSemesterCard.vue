<template>
    <v-card color="background" width="800px" height="400px" elevation=2>
        <v-card-title class="d-flex justify-center align-center" style="width: 100%;font-size:140%">
            {{ title }}
        </v-card-title>
        <v-container class="d-flex justify-center align-center px-2" height="84%" width="98%">
            <v-list bg-color="secondary" class="my-list px-1" style="overflow-y: auto;" width=98% max-height=98%>
                <v-card v-for="task in filteredTasks" class="mb-3 clickable-card" color="background" elevation="4" hover
                    ripple @click="setCurrentTask(task)">
                    <v-card-title class="d-flex justify-space-between align-center text-overline">
                        <span>{{ task.task.name }} ({{ task.task.points }} pts)</span>
                        <v-btn color="primary" size="small">Complete</v-btn>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>

</template>
<script setup>
import { computed, ref } from 'vue'
import instanceTaskServices from '@/services/eagle-flight/instanceTask.services'
import { useFpInstanceStore } from '@/store/instanceFpStore'

const fpInstanceStore = useFpInstanceStore()
const title = computed(() => {
    if (fpInstanceStore.selectedSemester == null) {
        return "\u00A0"
    }
    if (fpInstanceStore.selectedSemester.name === null) {
        return "\u00A0"
    }
    return fpInstanceStore.selectedSemester.name
})

const currentSemesterUntilGraduation = computed(() => {
    if (fpInstanceStore.selectedSemester == null) {
        return null
    }
    if (fpInstanceStore.selectedSemester.semesterFromGraduation === null) {
        return null
    }
    return fpInstanceStore.selectedSemester.semesterFromGraduation
})

const totalTasks = ref([]);
getInstanceTasks()

const filteredTasks = computed(() => {
    return totalTasks.value.filter(
        task => task.semesterUntilGraduation === currentSemesterUntilGraduation.value
    )
});


function getInstanceTasks() {
    // STILL NEED TO GET USERS ID, CURRENTLY MANUALLY INPUTTING FOR TESTING
    instanceTaskServices.getAllForUserId(1).then(
        response => {
            console.log(response.data)
            totalTasks.value = response.data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

function setCurrentTask(task) {
    fpInstanceStore.selectedTask = task
}

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