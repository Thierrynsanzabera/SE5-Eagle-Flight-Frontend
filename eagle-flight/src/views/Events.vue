<template>
    <v-overlay :model-value="editEventStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editEventStore.expandedComboOpen = false">
        <ExpandedCombo />
    </v-overlay>
    <v-card color="transparent" height="64"></v-card>
    <v-container>
        <v-row>
            <v-col cols="3">
                <div v-if="selectedEvent">
                    <EventStudents :event-id="selectedEvent.id" />
                </div>
            </v-col>
            <v-col cols="6">
                <EventList @event-selected="passToEdit" class="mx-3" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useEditEventStore } from "@/store/editEventStore";
import { useEventStore } from "@/store/eventStore";
import EventList from "@/components/fp_edit_components/EventList.vue";
import EventStudents from "@/components/fp_edit_components/EventStudents.vue";
import ExpandedCombo from "@/components/fp_edit_components/ExpandedCombo.vue";

const editEventStore = useEditEventStore();
const eventStore = useEventStore();
const selectedEvent = computed(() => eventStore.selectedEvent);

function passToEdit(event) {
    selectedEvent.value = event;
}
</script>
