<template>
    <v-overlay :model-value="editEventStore.expandedComboOpen" class="d-flex justify-center align-center" z-index="1"
        scrim="black" @click:outside="editEventStore.expandedComboOpen = false">
        <ExpandedEventsCombo />
    </v-overlay>

    <v-container>
        <v-switch
        v-model="showAdminView"
        label="Admin View"
        inset
        hide-details
        class="d-flex justify-center align-center"
        />
        <div class="d-flex" v-if="showAdminView">
                <div class="width justify-left" v-if="selectedEvent">
                    <EventStudents :event-id="selectedEvent.id" />
                </div>
            <EventList @event-selected="passToEdit" class="mx-3 width justify-center" />
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
.width{
    width: 400px;
    max-width: 400px;
}
</style>