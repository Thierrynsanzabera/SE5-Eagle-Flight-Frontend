<template>
    <div>
        <v-btn-toggle v-model="currentView" mandatory class="mb-4 d-flex justify-center">
            <v-btn value="week">Week View</v-btn>
            <v-btn value="month">Month View</v-btn>
        </v-btn-toggle>
        <div v-if="currentView === 'week'">
            <WeeklyCalendar
                :events="events"
                :currentUserId="currentUserId"
                :currentUserOcId="currentUserOcId"
            />
        </div>
        <div v-else>
            <MonthlyCalendar
                :events="events"
                :currentUserId="currentUserId"
                :currentUserOcId="currentUserOcId"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import studentEventServices from '@/services/eagle-flight/studentEventServices';
import WeeklyCalendar from './WeeklyCalendar.vue';
import MonthlyCalendar from './MonthlyCalendar.vue';
import Utils from '@/config/utils';

const loginUser = Utils.getStore('user');
const currentUserId = ref(loginUser?.userId || null);
const currentUserOcId = ref(null);
const currentView = ref('week');
const events = ref([]);

async function fetchCurrentStudentOcId() {
    if (!currentUserId.value) {
        console.error('No logged-in user found in localStorage.');
        return;
    }
    try {
        const res = await studentEventServices.getAllStudentsWithNames();
        const currentStudent = res.data.find(s => s.userId === currentUserId.value);
        if (currentStudent) {
            currentUserOcId.value = currentStudent.ocId;
            console.log(`Fetched current student OC ID: ${currentUserOcId.value}`);
        } else {
            console.error('Current student not found in the students list.');
        }
    } catch (err) {
        console.error('Error fetching student ocId:', err);
    }
}

onMounted(() => {
    fetchCurrentStudentOcId();
    studentEventServices.getAllEvents()
    .then((res) => {
        events.value = res.data;
    })
    .catch((err) => {
        console.error('Error fetching events:', err);
    });
});
</script>