<template>
    <v-overlay :model-value="editEventStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editEventStore.expandedComboOpen = false">
        <ExpandedEventsCombo />
    </v-overlay>

    <v-card color="transparent" height="64"></v-card>
    <v-container>
        <v-switch
        v-model="showAdminView"
        label="Admin View"
        inset
        hide-details
        class="d-flex justify-center align-center"
        />
        <div v-if="showAdminView">
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
        </div>
        <div v-else>
            <StudentEventCalendar />
        </div>
    </v-container>

</template>

<script setup>
import { ref, computed } from "vue";
import { useEditEventStore } from "@/store/editEventStore";
import { useEventStore } from "@/store/eventStore";
import EventList from "@/components/event_components/EventList.vue";
import EventStudents from "@/components/event_components/EventStudents.vue";
import ExpandedEventsCombo from "@/components/event_components/ExpandedEventsCombo.vue";
import StudentEventCalendar from "@/components/event_components/StudentEventCalendar.vue";

const editEventStore = useEditEventStore();
const eventStore = useEventStore();
const selectedEvent = computed(() => eventStore.selectedEvent);

const showAdminView = ref(true);

function passToEdit(event) {
    selectedEvent.value = event;
}
</script>