<template>
    <v-card color="secondary" height="450px" width="1400px">
        <v-container max-width="94%" class="px-0">
            <v-card-title class="px-0 pb-6">
                <v-title class="text-h4">Flight Plan Edit</v-title>
            </v-card-title>
            <v-row>
                <v-col cols="6">
                    <v-select chips label="Major" :items="majors" v-model="selectedMajor" item-title="name"
                        variant="outlined" return-object="true"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon :yearNumber="1" />
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon :yearNumber="2" />
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon :yearNumber="3" />
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon :yearNumber="4" />
                </v-col>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn class="mx-3" @click="cancelEdit()">Cancel</v-btn>
                <v-btn class="mr-3">Save</v-btn>
            </v-row>
        </v-container>

    </v-card>

</template>
<script setup>
import majorServices from '@/services/eagle-flight/majorServices'
import planServices from '@/services/eagle-flight/planServices'
import { ref, watch } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'


const editFpStore = useEditFpStore()
const currentPlan = ref(null)
const selectedMajor = ref(null)
const majors = ref([])
getMajors()

watch(selectedMajor, (newVal, oldVal) => {
    if (newVal) {
        console.log("new plan selected")
        console.log(newVal)
        editFpStore.major = newVal.name
        getPlan()
    }
})

function getMajors() {
    majorServices.getAll().then(
        response => {
            console.log(response.data)
            majors.value = response.data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

function getPlan() {
    // resetCurrentPlanTasks()
    planServices.getForMajorId(selectedMajor.value.id).then(
        response => {
            currentPlan.value = response.data
            console.log("Current plan:")
            console.log(currentPlan.value)
            editFpStore.currentPlanId= currentPlan.value.id
            populateSemesters()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

function populateSemesters() {
    editFpStore.clearSemesters()
    console.log("Populating semesters")
    for (const task of currentPlan.value.tasks) {
        console.log("task: " + task)
        const yearIndex = 4 - Math.ceil(task.taskInSemester.semesterUntilGraduation / 2)
        const semesterIndex = (task.taskInSemester.semesterUntilGraduation ) % 2
        console.log(`Year: ${yearIndex}, Semester: ${semesterIndex}`)
        editFpStore.pushToCurrentPlanTasks(task, yearIndex, semesterIndex)
        console.log(editFpStore.currentPlanTasks.value)
    }
}

function cancelEdit() {
    selectedMajor.value = null
    currentPlan.value = null
    resetCurrentPlanTasks()
}


</script>
<style scoped></style>