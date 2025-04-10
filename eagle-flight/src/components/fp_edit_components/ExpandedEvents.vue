<template>
    <v-card color="primary" width="500px" height="500px">
        <v-card-title class="text-center pb-0">All Events</v-card-title>
        <v-card color="transparent" width="100%" height="90%" class="d-flex justify-center align-center">
            <v-list bg-color="transparent" width=96% max-height=96%>
                <v-card v-for="event in availableEvents" :key="event.id" class="d-flex align-center mb-3" color="background"
                    height="30px" @click="selectEvent(event)">
                    <v-card-title class="d-flex w-100">
                        <span class="text-overline">{{ event.name }}</span>
                        <v-spacer></v-spacer>
                        <v-icon color="primary" class="add-icon" @click="addEventToPlan(event.id)">mdi-plus</v-icon>
                    </v-card-title>
                </v-card>
            </v-list>
        </v-card>
    </v-card>
</template>
<script setup>
import eventServices from '@/services/eagle-flight/eventServices'
import planServices from '@/services/eagle-flight/planServices'
import { ref } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'

const events = ref([])
const availableEvents = ref([])
const editFpStore = useEditFpStore();

getEvents()

function getEvents() {
    eventServices.getAll().then(
        response => {
            events.value = response.data
            setAvailableEvents()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}


function setAvailableEvents() {
    const currentPlanEventIds = new Set(
        editFpStore.currentPlanEvents.flat(2).map(event => event.id)
    )

    availableEvents.value = events.value.filter(
        event => !currentPlanEventIds.has(event.id)
    )
}

function addEventToPlan(eventId) {
    let body = {
        "eventId": eventId,
        "semesterUntilGraduation": editFpStore.getSemesterUntilGraduation()
    }
    planServices.addEvent(editFpStore.currentPlanId, body).then(
        response => {
            console.log(response.data)
            events.value = response.data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

</script>
<style scoped>
.add-icon {
    transition: transform 0.2s ease-in-out;
}

.add-icon:hover {
    transform: scale(1.1);
}
</style>