<template>
    <v-card color="primary" width="100%" height="500px">
        <v-card-title class="text-center pb-0">All Events</v-card-title>
        <v-row class="d-flex justify-center mt-2">
            <v-btn @click="openAddEventDialog">Add Event</v-btn>
        </v-row>
        <v-dialog v-model="showEditorDialog" max-width="800px">
            <EventEditor v-if="showEditorDialog" class="d-flex justify-center align-center" @close="showEditorDialog = false" @refresh="onEventEditorRefresh" />
        </v-dialog>
        <v-card color="transparent" width="100%" height="92%" class="d-flex justify-center mt-4">
            <v-list bg-color="transparent" width="96%" max-height="96%">
            <v-card v-for="event in events" :key="event.id" class="d-flex align-center mb-3"
            :color="selectedEvent == event ? 'primary' : 'background'" height="40px" link @click="selectEvent(event)">
                <v-card-title class="d-flex w-100">
                <span class="text-overline">{{ event.name }}</span>
                <v-spacer></v-spacer>
                <v-icon :color="selectedEvent == event ? 'background' : 'primary'" @click.stop="openEditEvent(event)">mdi-pencil-circle</v-icon>
                <v-icon :color="selectedEvent == event ? 'background' : 'primary'" class="delete-icon" @click.stop="deleteEvent(event)">mdi-delete-circle</v-icon>
                </v-card-title>
            </v-card>
            </v-list>
        </v-card>
    </v-card>
</template>

<script setup>
import eventServices from '@/services/eagle-flight/eventServices'
import { ref, computed } from 'vue'
import { useEventStore } from '@/store/eventStore'
import EventEditor from './EventEditor.vue'

let events = ref([])
let selectedEvent = computed(() => eventStore.selectedEvent)

getEvents()

// Dialog for EventEditor
const showEditorDialog = ref(false)

function openAddEventDialog() {
  eventStore.setSelectedEvent(null)
  showEditorDialog.value = true
}

function openEditEvent(event) {
  eventStore.setSelectedEvent(event)
  showEditorDialog.value = true
}

function onEventEditorRefresh() {
  getEvents()
}

// End of EventEditor

const eventStore = useEventStore();

function selectEvent(event) {
    if (eventStore.selectedEvent?.id === event.id) {
    eventStore.cancelSelectedEvent()
    } else {
    eventStore.setSelectedEvent(event)
    }
}

function getEvents() {
    eventServices.getAll().then(
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
function deleteEvent(event) {
    eventServices.deleteEvent(event.id).then(
        response => {
            console.log(response.data)
            getEvents()
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

</script>
<style scoped>
.delete-icon {
    transition: transform 0.2s ease-in-out;
}

.delete-icon:hover {
    transform: scale(1.1);
}
</style>