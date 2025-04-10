<template>
    <v-container class="d-flex justify-center align-center" height="100%">
        <v-card color="transparent" height="64px"></v-card>
        <v-card color="primary" width="600" height="420" class="pa-6">
            <v-card-title class="text-h4 text-center">Manage Semesters</v-card-title>
            <v-row class="d-flex justify-center align-center">

                <v-col cols="6" v-if="isNewYear" class="d-flex justify-center align-center">
                    <v-text-field label="Add Year" v-model="currentSemester.year" variant="underlined" />
                    <v-btn size="small" color="background" @click="isNewYear = false" variant="underlined">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols='6' v-else class="d-flex justify-center align-center">
                    <v-select :items="uniqueYears" label="Year" v-model="currentSemester.year" variant="underlined" />
                    <v-btn size="small" color="background" @click="newYearClicked" variant="underlined">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="6">
                    <v-select :disabled="!currentSemester.year && !currentSemester.year" :items="filteredSemesters"
                        item-title="season" :return-object="true" v-model="currentSemester" label="Semester"
                        variant="underlined" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="currentSemester.startDate" label="Start Date (YYYY-MM-DD)"
                        variant="underlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="currentSemester.endDate" label="End Date (YYYY-MM-DD)"
                        variant="underlined"></v-text-field>
                </v-col>
            </v-row>

            <v-btn v-if="isUpdate" size="large" class="mb-2" width="100%" color="secondary"
                @click="updateSemester">Update
                Semester</v-btn>
            <v-btn v-else size="large" class="mb-2" width="100%" color="secondary" @click="addSemester">Add
                Semester</v-btn>
            <v-btn size="large" class="mb-2" width="100%" color="secondary" v-if="isUpdate">Delete</v-btn>
            <v-btn size="large" class="mb-2" width="100%" color="secondary">Cancel</v-btn>
        </v-card>

    </v-container>

</template>

<script setup>
import { ref, computed, watch } from 'vue';
import semesterServices from '@/services/eagle-flight/semesterServices';

const allSemesters = ref([]);
getSemesters();


const isUpdate = ref(false);
const isNewYear = ref(false);

// this is the actual semester object, not the id or the season name
// this serves to store the New Semester and the Selected Semester
const currentSemester = ref({
    season: null,
    year: null,
    startDate: null,
    endDate: null
})

const uniqueYears = computed(() => {
    const years = allSemesters.value.map(s => s.year)
    return [...new Set(years)].sort()
})

const filteredSemesters = computed(() => {

    const allSeasons = ["FALL", "SUMMER", "SPRING", "WINTER"]

    if (isNewYear.value) return allSeasons.map(season => ({
        season: `+ ${season}`,
        placeholder: true
    }))

    // Existing semester objects for the selected year
    const existingSemesters = allSemesters.value.filter(
        s => s.year === currentSemester.value.year
    )

    // Find which seasons are already added
    const existingSeasons = existingSemesters.map(s => s.season)

    // Find which seasons are missing
    const missingSeasons = allSeasons.filter(season => !existingSeasons.includes(season))

    // Create placeholder objects for the missing seasons
    const placeholders = missingSeasons.map(season => ({
        season: `+ ${season}`,
        year: currentSemester.value.year,
        placeholder: true
    }))

    // Combine real semesters with placeholders
    return [...existingSemesters, ...placeholders]
})

watch(currentSemester, (semester) => {
    if (!semester.placeholder) isUpdate.value = true
    else isUpdate.value = false
})

function newYearClicked() {
    isNewYear.value = true
    currentSemester.year = null
}

// API Calls ===============================
// Getters
function getSemesters() {
    semesterServices.getAll().then(
        response => {
            allSemesters.value = response.data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

// Setters
function addSemester() {
    currentSemester.value.season = currentSemester.value.season.replace("+ ", "")
    semesterServices.addSemester(currentSemester.value).then(
        response => {
            console.log(response.data)
            getSemesters()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

function updateSemester() {
    semesterServices.update(currentSemester.value.id, currentSemester.value).then(
        response => {
            console.log(response.data)
            getSemesters()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}
</script>
<style></style>