<template>
    <v-card color="background" width="800px" height="400px" elevation=2>
        <v-card-title class="d-flex justify-center align-center py-0 mt-1" style="width: 100%;font-size:140%;">
            {{ title }}
        </v-card-title>
        <v-tabs v-model="selectedCategory" bg-color="background" class="mb-0" height="35px">
            <v-tab value="tasks">Tasks({{ tasksLeft }})</v-tab>
            <v-tab value="experiences">Experiences({{ experiencesLeft }})</v-tab>
        </v-tabs>
        <v-container class="d-flex justify-center align-center px-0 pt-0 mx-0" height="85%" width="100%">
            <v-list bg-color="secondary" class="my-list px-1" style="overflow-y: auto;" width=100% height=98%
                rounded-sm>
                <v-card v-for="task in filteredTasks" class="mb-3 clickable-card" color="background" elevation="4" hover
                    ripple @click="setCurrentTask(task)">
                    <v-card-title class="d-flex justify-space-between align-center text-overline">
                        <span>{{ task.task.name }} ({{ task.task.points }} pts)</span>
                        <v-btn color="primary" size="small" variant="text"> {{
                            fpInstanceStore.getSubmissionStatus(task.submissions).text
                            }}</v-btn>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>

</template>
<script setup>
import { computed, ref, watch } from 'vue'
import instanceTaskServices from '@/services/eagle-flight/instanceTask.services'
import { useFpInstanceStore } from '@/store/instanceFpStore'
import Utils from '@/config/utils'

let user = Utils.getStore("user");
let userId = user.userId;

const selectedCategory = ref('tasks')

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

const tasksLeft = computed(() => {
    return totalTasks.value.filter(task =>
        task.semesterUntilGraduation === currentSemesterUntilGraduation.value &&
        task.task.isExperience === false
    ).length;
});

const experiencesLeft = computed(() => {
    return totalTasks.value.filter(task =>
        task.semesterUntilGraduation === currentSemesterUntilGraduation.value &&
        task.task.isExperience === true
    ).length;
});

const filteredTasks = computed(() => {
    return totalTasks.value.filter(task => {
        const matchesSemester = task.semesterUntilGraduation === currentSemesterUntilGraduation.value;

        const isExperience = task.task.isExperience;
        if (selectedCategory.value === 'experiences') {
            return matchesSemester && isExperience === true;
        } else {
            return matchesSemester && isExperience === false;
        }
    });
});




function getInstanceTasks() {
    instanceTaskServices.getAllForUserId(userId).then(
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