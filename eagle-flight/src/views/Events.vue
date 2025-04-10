<template>
    <v-overlay :model-value="editEventStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editEventStore.expandedComboOpen = false">
        <ExpandedCombo />
    </v-overlay>
    <v-card color="transparent" height="64"></v-card>
    <v-container class="d-flex justify-center align-center">
        <EventList @event-selected="passToEdit" class="mx-3" />
        <EventEditor :event="selectedEvent" class="mx-3" />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useEditEventStore } from "@/store/editEventStore";

const editEventStore = useEditEventStore();
const selectedEvent = ref(null);

function passToEdit(event) {
    selectedEvent.value = event;
}
</script>
