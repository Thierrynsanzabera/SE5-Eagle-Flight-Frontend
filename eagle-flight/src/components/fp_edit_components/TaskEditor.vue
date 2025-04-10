<template>
    <v-card color="primary" width="500px" height="300px">
        <v-card-title class="text-center pb-0">{{currentAction}} Task</v-card-title>
        <v-card color="transparent" class="d-flex align-center justify-center" width="100%" height="66%" variant="flat">
            <v-list bg-color="transparent" width=96% max-height=100%>
                <v-container width="96%">
                    <v-row>
                        <v-col cols=9>
                            <v-text-field v-model="task.name" label="Name" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols=3>
                            <v-text-field v-model="task.points" label="Points" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-textarea v-model="task.description" label="Description" variant="outlined" density="compact" auto-grow="true"
                        rows=2></v-textarea>
                </v-container>
            </v-list>
        </v-card>
        <v-row class="d-flex justify-center mt-0">
            <v-btn class="mr-1" color="secondary" @click="cancelAction">Cancel</v-btn>
            <v-btn color="secondary" @click="doAction">{{ currentAction }}</v-btn>
        </v-row>
    </v-card>
</template>
<script setup>
import taskServices from '@/services/eagle-flight/taskServices'
import { ref, computed, watch } from 'vue'
import { useTaskStore } from '@/store/taskStore'

const taskStore = useTaskStore();

let task = ref({
    id:"",
    name: "",
    points: "",
    description: ""
})

const newTask = computed(() => taskStore.selectedTask);
const currentAction = ref("Add");
watch(newTask, () => {
    currentAction.value = taskStore.selectedTask == null ? "Add" : "Edit";
    task.value = taskStore.selectedTask == null ? {
        id:"",
        name: "",
        points: "",
        description: ""
    } : taskStore.selectedTask;
});

function doAction (){
    console.log(currentAction.value)
    currentAction.value == "Add" ? addTask() : updateTask()
}

function cancelAction(){
    task.value = {
        id:"",
        name: "",
        points: "",
        description: ""
    }
    taskStore.cancelSelectedTask()
}

function addTask (){
    taskServices.addTask(task.value).then(
        cancelAction()
    ).catch(
        error => {
            console.log(error)
        }
    )
}

function updateTask (){
    taskServices.update(task.value.id, task.value).then(
        cancelAction()
    )
}
</script>
<style scoped></style>