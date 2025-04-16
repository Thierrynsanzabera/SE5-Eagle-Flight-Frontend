<template>
    <v-card color="primary" width="500px" height="500px">
        <v-card-title class="text-center pb-0">All Events</v-card-title>
        <v-card color="transparent" width="100%" height="92%" class="d-flex justify-center">
            <v-list bg-color="transparent" width=96% max-height=96%>
                <v-card v-for="event in events" :key="event.id" class="d-flex align-center mb-3"
                    :color="selectedEvent == event ? 'primary' : 'background'" height="40px" link
                    @click="selectEvent(event)">
                    <v-card-title class="d-flex w-100">
                        <span class="text-overline">{{ event.name }}</span>
                        <v-spacer></v-spacer>
                        <v-icon :color="selectedEvent == event ? 'background' : 'primary'" class="delete-icon"
                            @click="deleteEvent(event)">mdi-delete-circle</v-icon>
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

let events = ref([])
let selectedEvent = computed(() => eventStore.selectedEvent)

getEvents()

const eventStore = useEventStore();

function selectEvent(event) {
    eventStore.setSelectedEvent(event);
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