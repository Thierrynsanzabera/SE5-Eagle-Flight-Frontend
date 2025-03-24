<template>
    <v-card color="primary" width="136px" height="160px" rounded="true">
        <v-card-title class="pb-0 text-center text-overline">Semester {{ semesterNumber }}</v-card-title>
        <v-container class="d-flex justify-center px-0 py-0" height="80%">
            <v-list bg-color="transparent" width="96%" max-height=96% class="my-list">
                <v-card v-for="task in tasks" class="mb-3 d-flex align-center justify-center" color="background"
                    height="16px">
                    <v-card-title class="d-flex align-center justify-center">
                        <v-title style="font-size: 10px">{{ task.title }}</v-title>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-container>
    </v-card>
</template>
<script setup>
let semesterNumber = 1
const tasks = [
    { title: 'Task 1' },
    { title: 'Task 2', description: 'Description 2' },
    { title: 'Task 3', description: 'Description 3' },
    { title: 'Task 4', description: 'Description 4' },
    { title: 'Task 4', description: 'Description 4' },
    { title: 'Task 4', description: 'Description 4' },
    { title: 'Task 4', description: 'Description 4' },

]

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