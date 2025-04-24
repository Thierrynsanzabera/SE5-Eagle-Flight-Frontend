<template>
    <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="500px">
        <v-card>
            <v-card-title>{{ event.name }}</v-card-title>
            <v-card-text>
                <p><strong>Location:</strong> {{ event.location }}</p>
                <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
                <p><strong>Time:</strong> {{ formatTime(event.time) }}</p>
                <p><strong>Description:</strong> {{ event.description }}</p>
            </v-card-text>
            <v-card-actions class="action-buttons">
                <div class="button-group">
                    <div v-if="isSignedUp" class="signed-up-text">
                        You have signed up for this event.
                    </div>
                    <div class="button-row">
                    <v-btn
                        color="primary"
                        v-if="!isSignedUp"
                        @click="signUpForEvent"
                    >
                        Sign Up
                    </v-btn>
                    <v-btn
                        color="error"
                        v-if="isSignedUp"
                        @click="withdrawFromEvent"
                    >
                        Withdraw
                    </v-btn>
                    <v-btn text @click="emit('update:modelValue', false)">Close</v-btn>
                    </div>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, computed } from 'vue';
import studentEventServices from '@/services/eagle-flight/studentEventServices';
import Utils from '@/config/utils';

const emit = defineEmits(['update:modelValue']);
const signedUpStudents = ref([]);

const props = defineProps({
    modelValue: Boolean,
    event: Object
});

const loginUser = Utils.getStore('user');
const localUserId = ref(loginUser?.userId || null);
const localOcId = ref(null);

async function fetchCurrentStudentOcId() {
    if (!localUserId.value) {
        console.error('No logged-in user ID found in localStorage.');
        return;
    }
    try {
        const res = await studentEventServices.getAllStudentsWithNames();
        const currentStudent = res.data.find(s => s.userId === localUserId.value);
        if (currentStudent) {
            localOcId.value = currentStudent.ocId;
        } else {
            console.error('Current student not found in the student list.');
        }
    } catch (err) {
        console.error('Error fetching student info from backend:', err);
    }
}

function fetchSignedUpStudents(eventId) {
    if (!eventId) return;
    studentEventServices.getStudentsForEvent(eventId)
    .then(res => {
        signedUpStudents.value = res.data.map(student => student.userId);
    })
    .catch(err => {
        console.error('Error fetching signed-up students:', err);
    });
}

onMounted(() => {
    fetchCurrentStudentOcId();
    if (props.event) {
        fetchSignedUpStudents(props.event.id);
    }
});

watch(() => props.event, (newEvent) => {
    if (newEvent) {
        fetchSignedUpStudents(newEvent.id);
    }
}, { immediate: true });

const isSignedUp = computed(() => signedUpStudents.value.includes(localUserId.value));

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function formatTime(time) {
    const [hour, minute] = time.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${((h + 11) % 12 + 1)}:${minute} ${ampm}`;
}

async function signUpForEvent() {
    if (!localUserId.value || !localOcId.value) {
        alert('Your account information is incomplete. Cannot sign up.');
        return;
    }
    if (isSignedUp.value) {
        alert('You are already signed up for this event.');
        return;
    }
    const payload = {
    eventID: props.event.id,
    studentUserID: localUserId.value,
    studentOCID: localOcId.value,
    status: 0
    };
    try {
        await studentEventServices.addStudentToEvent(payload);
        alert(`Signed up for event: ${props.event.name}`);
        fetchSignedUpStudents(props.event.id);
    } catch (error) {
        console.error('Error signing up for event:', error);
        alert('There was an issue signing up.');
    }
}

async function withdrawFromEvent() {
    if (!props.event?.id || !localUserId.value) {
        alert('Invalid event or user information.');
        return;
    }
    try {
        await studentEventServices.deleteStudentFromEvent(props.event.id, localUserId.value);
        alert(`Withdrawn from event: ${props.event.name}`);
        fetchSignedUpStudents(props.event.id);
    } catch (error) {
        console.error('Error withdrawing from event:', error);
        alert('There was an issue withdrawing from the event.');
    }
}
</script>

<style scoped>
.action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.button-row {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
}

.signed-up-text {
    text-align: center;
    font-weight: bold;
}
</style>