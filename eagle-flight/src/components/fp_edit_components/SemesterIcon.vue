<template>
    <v-card color="red" width="155px" height="190px">
        <v-list bg-color="transparent" width="90%" max-height=100%>
            <v-card v-for="task in tasks" class="my-3" color="background">
                <v-card-title>
                    <v-title class="text-body-1">{{ task.title }}</v-title>
                </v-card-title>
            </v-card>
        </v-list>
    </v-card>
</template>
<script setup>
const tasks = [
    { title: 'Task 1' },
    { title: 'Task 2', description: 'Description 2' },
    { title: 'Task 3', description: 'Description 3' },
    { title: 'Task 4', description: 'Description 4' },
]

</script>
<style scoped></style>