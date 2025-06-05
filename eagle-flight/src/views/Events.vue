<template>
    <v-overlay :model-value="editEventStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editEventStore.expandedComboOpen = false">
        <ExpandedEventsCombo />
    </v-overlay>

    <v-container fluid>
        <v-switch
            v-model="showAdminView"
            label="Admin View"
            inset
            hide-details
            class="d-flex justify-center"
        />
        <div v-if="showAdminView" class="admin-layout">
            <div v-if="selectedEvent" class="students-panel">
            <EventStudents :event-id="selectedEvent.id" />
            </div>
            <div class="events-wrapper">
            <EventList @event-selected="passToEdit" />
            </div>
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

<style>
.admin-layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}

.students-panel {
  width: 500px;
  max-width: 500px;
  flex-shrink: 0;
  position: absolute;
  left: 0;
}

.events-wrapper {
  width: 600px;
  max-width: 600px;
}
</style>