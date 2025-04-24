<template>
    <div class="weekly-calendar">
      <div class="week-header">
        <v-btn icon @click="previousWeek" class="nav-btn">
          <v-icon size="18">mdi-chevron-left</v-icon>
        </v-btn>
        <div class="week-range">{{ formattedWeekRange }}</div>
        <v-btn icon @click="nextWeek" class="nav-btn">
          <v-icon size="18">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
  
      <table class="weekly-table">
        <thead>
          <tr>
            <th>Time</th>
            <th v-for="day in weekDays" :key="day">{{ formatDate(day) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hour in hours" :key="hour">
            <td>{{ hour }}</td>
            <td v-for="day in weekDays" :key="day">
              <div
                v-for="event in getEventsForDayAndTime(day, hour)"
                :key="event.id"
                class="event"
                @click="openEventDialog(event)"
              >
                {{ event.name }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  
      <StudentViewEvent
        v-if="selectedEvent"
        v-model="viewEventDialog"
        :event="selectedEvent"
        :currentUserId="currentUserId"
        :currentUserOcId="currentUserOcId"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import StudentViewEvent from '@/components/event_components/StudentViewEvent.vue';
  import studentEventServices from '@/services/eagle-flight/studentEventServices';
  import Utils from '@/config/utils';
  
  const selectedEvent = ref(null);
  const viewEventDialog = ref(false);
  const currentUserId = ref(null);
  const currentUserOcId = ref(null);
  
  const loginUser = Utils.getStore('user');
  if (loginUser?.userId) {
    currentUserId.value = loginUser.userId;
  } else {
    console.error('No logged-in user found in localStorage.');
  }
  
  async function fetchCurrentStudentOcId() {
    if (!currentUserId.value) return;
    try {
      const res = await studentEventServices.getAllStudentsWithNames();
      const currentStudent = res.data.find(s => s.userId === currentUserId.value);
      if (currentStudent) {
        currentUserOcId.value = currentStudent.ocId;
      } else {
        console.error('Current student not found in the students list.');
      }
    } catch (err) {
      console.error('Error fetching student ocId:', err);
    }
  }
  
  onMounted(fetchCurrentStudentOcId);
  
  const props = defineProps({
    events: {
      type: Array,
      required: true
    }
  });
  
  function openEventDialog(event) {
    selectedEvent.value = event;
    viewEventDialog.value = true;
  }
  
  const today = new Date();
  const currentWeekStart = ref(getStartOfWeek(today));
  
  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }
  
  function previousWeek() {
    currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7);
    currentWeekStart.value = new Date(currentWeekStart.value);
  }
  
  function nextWeek() {
    currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7);
    currentWeekStart.value = new Date(currentWeekStart.value);
  }
  
  const weekDays = computed(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart.value);
      day.setDate(currentWeekStart.value.getDate() + i);
      days.push(day);
    }
    return days;
  });
  
  const formattedWeekRange = computed(() => {
    const options = { month: 'long', day: 'numeric' };
    const start = currentWeekStart.value.toLocaleDateString(undefined, options);
    const endDate = new Date(currentWeekStart.value);
    endDate.setDate(endDate.getDate() + 6);
    const end = endDate.toLocaleDateString(undefined, options);
    return `${start} - ${end}`;
  });
  
  const hours = Array.from({ length: 18 }, (_, i) => {
    const hour = 6 + i;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${period}`;
  });
  
  function formatDate(date) {
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }
  
  function getEventsForDayAndTime(day, hour) {
    return props.events.filter(event => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      const eventDay = eventDate.toDateString();
      const compareDay = day.toDateString();
      const eventHour = eventDate.getHours();
      const eventPeriod = eventHour >= 12 ? 'PM' : 'AM';
      const displayHour = eventHour % 12 === 0 ? 12 : eventHour % 12;
      const formattedEventHour = `${displayHour}:00 ${eventPeriod}`;
      return eventDay === compareDay && formattedEventHour === hour;
    });
  }
  </script>
  
  <style scoped>
  .week-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
  
  .week-range {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 1rem;
    text-align: center;
  }
  
  .nav-btn {
    background-color: white !important;
    border: 1px solid black !important;
    color: black !important;
  }
  
  .weekly-table th,
  .weekly-table td:first-child {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
    width: 100px;
  }
  
  .weekly-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .weekly-table th,
  .weekly-table td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 8px;
  }
  
  .event {
    background-color: #b3e5fc;
    margin-top: 4px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .event:hover {
    background-color: #81d4fa;
  }
  </style>
  