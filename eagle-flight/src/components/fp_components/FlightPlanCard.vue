<template>
    <v-card width="1000px" height="550px" color="background" elevation=10>
        <v-card-title class="text-center text-body-1">
            General progress
        </v-card-title>
        <v-row align-self="center" justify="center">
            <v-col cols="8">
                <v-progress-linear v-model="progress" :height="4" :rounded-bar="true" rounded="true"
                    bg-color="secondary"></v-progress-linear>
            </v-col>
        </v-row>
        <v-row align-self="center" justify="center">
            <v-card width="800px" height="30px" color="transparent" variant="flat"
                class="d-flex justify-center align-center">
                <CustomButton v-for="semester in semesters" :semester="semester" />
            </v-card>
        </v-row>
        <v-row style="height: 100%;">
            <v-col class="d-flex justify-center" cols="12">
                <FlightPlanSemesterCard />
            </v-col>
        </v-row>
    </v-card>
</template>
<script setup>
import { computed } from 'vue'
import { useFpInstanceStore } from '@/store/instanceFpStore'

const fpInstanceStore = useFpInstanceStore()
const progress = computed(() => fpInstanceStore.progress)
const semesters = computed(() => fpInstanceStore.semesters)

</script>
<style scoped></style>