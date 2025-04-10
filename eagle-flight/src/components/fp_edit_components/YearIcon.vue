<template>
    <v-card width="300px" height="200px">
        <v-card-title class="pb-0 text-center text-overline">Year {{ yearNumber }}</v-card-title>
        <v-container class="d-flex justify-center align-center px-0 pt-0" height="90%" width="100%">
            <SemesterIcon class="mx-1" :semesterNumber="1" :yearNumber="props.yearNumber" />
            <SemesterIcon class="mx-1" :semesterNumber="2" :yearNumber="props.yearNumber" />
        </v-container>
    </v-card>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    yearNumber: Number,
    firstSemesterTasks: Array,
    secondSemesterTasks: Array
})

const taskListForYear = ref([props.firstSemesterTasks, props.secondSemesterTasks])

</script>
<style scoped></style>