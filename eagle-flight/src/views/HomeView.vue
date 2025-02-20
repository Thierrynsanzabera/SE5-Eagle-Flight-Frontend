<template>
    <v-container>
        <v-row align-self="center" justify="center">
            <div class="text-h4">Eagle Flight Plan</div>
            <v-card height="80vh" width="170vh">

                <div class="text-center text-h5">General progress</div>
                <v-row align-self="center" justify="center">
                    <v-col cols="11">
                        <v-progress-linear v-model="progress" :height="7" :rounded-bar="true"
                            rounded="true"></v-progress-linear>
                    </v-col>
                </v-row>
                <v-radio-group>
                    <v-row>
                        <v-col cols="1">
                            <v-radio label="SM11" value="1"></v-radio>
                        </v-col>
                        <v-col cols="1">
                            <v-radio label="SM12" value="2"></v-radio>
                        </v-col>
                        <v-col cols="1">    
                            <v-radio label="SM13" value="3"></v-radio>
                        </v-col>
                        <v-col cols="1">
                            <v-radio label="SM11" value="4"></v-radio>
                        </v-col>
                        <v-col cols="1">
                            <v-radio label="SM12" value="5"></v-radio>
                        </v-col>
                        <v-col cols="1">    
                            <v-radio label="SM13" value="6"></v-radio>
                        </v-col>
                        <v-col cols="1">
                            <v-radio label="SM11" value="7"></v-radio>
                        </v-col>
                        <v-col cols="1">
                            <v-radio label="SM12" value="8"></v-radio>
                        </v-col>
                    </v-row>
                </v-radio-group>
                <v-row align-self="center" justify="center">
                    <v-col cols="11">
                        <v-card color="primary" width="96%" height="60vh" class="mx-auto">
                            <v-list>
                                <v-list-item v-for="task in tasks" :title="task.title" :subtitle="task.description">
                                    <v-btn>completed</v-btn>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>

            </v-card>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue'

let tasks = [
    {title: 'Task 1', description: 'Description 1'},
    {title: 'Task 2', description: 'Description 2'},
    {title: 'Task 3', description: 'Description 3'},
    {title: 'Task 4', description: 'Description 4'},
]

let progress = ref(50)
</script>
<style scoped></style>