<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title class="d-flex justify-center align-center">Add Student to Event</v-card-title>
            <v-card-text>
                <v-row class="d-flex justify-center align-center">
                    <v-col cols="5">
                        <v-text-field v-model="ocId" label="Search by OC ID" @keydown.enter="searchStudent" />
                    </v-col>
                    <v-col cols="3">
                        <v-btn color="primary" @click="searchStudent">Search</v-btn>
                    </v-col>
                </v-row>
                <div v-if="foundStudent">
                    <v-row>
                        <v-col>
                            <p><strong>First Name:</strong> {{ foundStudent.fName }}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <p><strong>Last Name:</strong> {{ foundStudent.lName }}</p>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex justify-center align-center">
                        <v-checkbox v-model="status" label="Attending" />
                    </v-row>
                </div>
                <div v-else-if="searched">
                    <v-row class="d-flex justify-center align-center">
                        <p class="text-red">No student found with that OC ID.</p>
                    </v-row>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-row>
                    <v-btn color="grey" @click="cancel" class="mx-1">Cancel</v-btn>
                    <v-btn color="primary" :disabled="!foundStudent" @click="confirm">Confirm</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import studentServices from '@/services/eagle-flight/studentServices';
import { useEventStore } from '@/store/eventStore';

const eventStore = useEventStore();
const selectedEventId = computed(() => eventStore.selectedEvent?.id);

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'student-added']);

const dialog = ref(props.modelValue);
const ocId = ref('');
const foundStudent = ref(null);
const searched = ref(false);
const status = ref(false);

watch(() => props.modelValue, (val) => (dialog.value = val));
watch(dialog, (val) => emit('update:modelValue', val));

function searchStudent() {
  studentServices.getForOcId(ocId.value)
    .then(res => {
      foundStudent.value = res.data;
      searched.value = true;
    })
    .catch(() => {
      foundStudent.value = null;
      searched.value = true;
    });
}

function confirm() {
    const eventIdToUse = selectedEventId.value;
    if (!eventIdToUse) {
        console.error('No event selected!');
        return;
    }

    emit('student-added', {
        eventID: eventIdToUse,  // Ensure the correct key is 'eventID'
        studentUserID: foundStudent.value.userId,  // Confirm this is the correct field name
        studentOCID: foundStudent.value.ocId,
        status: status.value ? 1 : 0
    });
        dialog.value = false;
}

function cancel() {
  dialog.value = false;
}
</script>