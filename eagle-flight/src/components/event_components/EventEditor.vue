<template>
    <v-card color="primary" class="pa-4" style="width: 100%; height: 100%; max-height: 90vh; overflow-y: auto;">
        <v-card-title class="text-center pb-0">{{currentAction}} Event</v-card-title>
        <v-card color="transparent" class="d-flex align-center justify-center" width="100%" height="80%" variant="flat">
            <v-list bg-color="transparent" width=96% max-height=100%>
                <v-container width="100%">
                    <v-row>
                        <v-col cols=12>
                            <v-text-field v-model="event.name" label="Name" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <v-text-field v-model="event.location" label="Location" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <v-select
                                v-model="event.taskId"
                                :items="experienceTasks"
                                item-title="name"
                                item-value="id"
                                label="Select Experience (Optional)"
                                variant="outlined"
                                density="compact"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=4>
                            <v-date-input v-model="event.date" label="MM/DD/YYYY"></v-date-input>
                        </v-col>
                        <v-col cols="8">
                            <TimeSelector v-model="event.time" />
                        </v-col>
                    </v-row>

                    <v-textarea v-model="event.description" label="Description" variant="outlined" density="compact" auto-grow="true"
                        rows=2></v-textarea>
                </v-container>
            </v-list>
        </v-card>
        <v-row class="d-flex justify-center">
            <v-btn class="mr-1" color="secondary" @click="cancelAction">Cancel</v-btn>
            <v-btn color="secondary" @click="doAction">{{ currentAction }}</v-btn>
        </v-row>
        <br>
    </v-card>
</template>
<script setup>
import eventServices from '@/services/eagle-flight/eventServices'
import { ref, computed, watch, onBeforeMount } from 'vue'
import { useEventStore } from '@/store/eventStore'
import TimeSelector from '@/components/fp_edit_components/TimeSelector.vue'
import taskServices from '@/services/eagle-flight/taskServices'



const emit = defineEmits(['close'])

const eventStore = useEventStore();

let event = ref({
    // experienceID: "",
    location:"",
    date:"",
    time:"",
    name: "",
    type:"",
    description: "",
    taskId: null
})

const currentAction = ref("Add");
const experienceTasks = ref([]);

onBeforeMount(() => {
    const selected = eventStore.selectedEvent
    currentAction.value = selected == null ? "Add" : "Edit";

    Object.assign(event.value, selected ?? {
        // experienceID: "",
        location: "",
        date: "",
        time: "",
        name: "",
        type: "",
        description: "",
        taskId: null
    });
    taskServices.getAll()
    .then(response => {
      experienceTasks.value = response.data.filter(task => task.isExperience);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error);
    });
});

function doAction (){
    console.log(currentAction.value)
    currentAction.value == "Add" ? addEvent() : updateEvent()
}

function cancelAction(){
    event.value = {
        // experienceID: "",
        location:"",
        date:"",
        time:"",
        name: "",
        type:"",
        description: "",
        taskId: null
    }
    
    emit('close')
    emit('refresh')
    setTimeout(() => {eventStore.cancelSelectedEvent()}, 0)
}

function addEvent () {
  eventServices.addEvent(event.value)
    .then(() => {
      cancelAction()
    })
    .catch(error => {
      console.log(error)
    })
}

function updateEvent () {
  eventServices.updateEvent(event.value.id, event.value)
    .then(() => {
      cancelAction()
    })
    .catch(error => {
      console.log(error)
    })
}
</script>
<style scoped></style>