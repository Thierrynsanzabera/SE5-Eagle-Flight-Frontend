<template>
    <v-card color="secondary" height="450px" width="1400px">
        <v-container max-width="94%" class="px-0">
            <v-card-title class="px-0 pb-6">
                <v-title class="text-h4">Flight Plan Edit</v-title>
            </v-card-title>
            <v-select clearable chips label="Major" :items="majors" multiple variant="outlined"></v-select>
            <v-row>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon />
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon />
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon />
                </v-col>
                <v-col cols="3" class="d-flex justify-center">
                    <YearIcon />
                </v-col>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn class="mx-3">Cancel</v-btn>
                <v-btn class="mr-3">Save</v-btn>
            </v-row>
        </v-container>

    </v-card>

</template>
<script setup>
let majors = [
    "Default Flight Plan",
    "Computer Science",
    "Software Engineering",
    "Computer Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biomedical Engineering",
    "Aerospace Engineering",
    "Industrial Engineering",
    "Environmental Engineering",
    "Materials Science and Engineering"
]
</script>
<style scoped></style>