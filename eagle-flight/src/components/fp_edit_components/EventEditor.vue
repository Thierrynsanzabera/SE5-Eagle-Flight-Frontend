<template>
    <v-card color="primary" width="500px" height="500px">
        <v-card-title class="text-center pb-0">{{currentAction}} Event</v-card-title>
        <v-card color="transparent" class="d-flex align-center justify-center" width="100%" height="75%" variant="flat">
            <v-list bg-color="transparent" width=96% max-height=100%>
                <v-container width="96%">
                    <v-row>
                        <v-col cols=6>
                            <v-text-field v-model="event.id" label="ID" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols=6>
                            <v-text-field v-model="event.experienceID" label="ExperienceID" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=6>
                            <v-text-field v-model="event.location" label="Location" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols=6>
                            <v-date-input v-model="event.date" label="MM/DD/YYYY" max-width="368"></v-date-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=9>
                            <v-text-field v-model="event.name" label="Name" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols=3>
                            <v-text-field v-model="event.type" label="Type" variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-textarea v-model="event.description" label="Description" variant="outlined" density="compact" auto-grow="true"
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
import eventServices from '@/services/eagle-flight/eventServices'
import { ref, computed, watch } from 'vue'
import { useEventStore } from '@/store/eventStore'

const eventStore = useEventStore();

let event = ref({
    id:"",
    experienceID: "",
    location:"",
    date:"",
    name: "",
    type:"",
    description: ""
})

const newEvent = computed(() => eventStore.selectedEvent);
const currentAction = ref("Add");
watch(newEvent, () => {
    currentAction.value = eventStore.selectedEvent == null ? "Add" : "Edit";
    event.value = eventStore.selectedEvent == null ? {
        id:"",
        experienceID: "",
        location:"",
        date:"",
        name: "",
        type:"",
        description: ""
    } : eventStore.selectedEvent;
});

function doAction (){
    console.log(currentAction.value)
    currentAction.value == "Add" ? addEvent() : updateEvent()
}

function cancelAction(){
    event.value = {
        id:"",
        experienceID: "",
        location:"",
        date:"",
        name: "",
        type:"",
        description: ""
    }
    eventStore.cancelSelectedEvent()
}

function addEvent (){
    eventServices.addEvent(event.value).then(
        cancelAction()
    ).catch(
        error => {
            console.log(error)
        }
    )
}

function updateEvent (){
    eventServices.updateEvent(event.value.id, event.value).then(
        cancelAction()
    )
}
</script>
<style scoped></style>