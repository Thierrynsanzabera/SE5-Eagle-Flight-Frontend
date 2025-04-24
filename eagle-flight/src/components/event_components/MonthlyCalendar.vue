<template>
    <div class="monthly-calendar">
      <div class="calendar-header">
        <div class="nav-controls">
          <v-btn icon @click="previousMonth" class="nav-btn">
            <v-icon size="18">mdi-chevron-left</v-icon>
          </v-btn>
          <div class="month-year">{{ months[currentMonth] }} {{ currentYear }}</div>
          <v-btn icon @click="nextMonth" class="nav-btn">
            <v-icon size="18">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <div class="dropdown-controls">
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
            dense
            hide-details
            class="month-dropdown"
            @update:modelValue="jumpToMonth"
          />
        </div>
      </div>
  
      <table class="monthly-table">
        <thead>
          <tr>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in weeks" :key="week[0].date">
            <td
              v-for="day in week"
              :key="day.date"
              :class="{ 'not-current-month': day.date.getMonth() !== currentMonth }"
            >
              <div class="day-box">
                <div class="date">{{ day.date.getDate() }}</div>
                <div
                  v-for="event in getEventsForDay(day.date)"
                  :key="event.id"
                  class="event"
                  @click="openEventDialog(event)"
                >
                  {{ event.name }}
                </div>
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
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const today = new Date();
  const currentMonth = ref(today.getMonth());
  const currentYear = ref(today.getFullYear());
  const selectedMonth = ref(months[today.getMonth()]);
  
  const generateCalendar = () => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1);
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
    const calendar = [];
    let week = [];
  
    const startOffset = (firstDay.getDay() + 6) % 7;
    let d = new Date(firstDay);
    d.setDate(d.getDate() - startOffset);
  
    while (d <= lastDay || week.length !== 0) {
      week.push({ date: new Date(d) });
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
      d.setDate(d.getDate() + 1);
    }
    return calendar;
  };
  
  const weeks = computed(() => generateCalendar());
  
  function getEventsForDay(date) {
    return props.events.filter(event => event.date === date.toISOString().split('T')[0]);
  }
  
  function previousMonth() {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value -= 1;
    } else {
      currentMonth.value -= 1;
    }
    selectedMonth.value = months[currentMonth.value];
  }
  
  function nextMonth() {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value += 1;
    } else {
      currentMonth.value += 1;
    }
    selectedMonth.value = months[currentMonth.value];
  }
  
  function jumpToMonth(monthName) {
    currentMonth.value = months.indexOf(monthName);
  }
  </script>
  
  <style scoped>
  .monthly-calendar {
    position: relative;
    z-index: 2;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .calendar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1rem;
    position: relative;
}
  
.nav-controls-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

  .nav-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .month-year {
  font-size: 1.5rem;
  font-weight: bold;
}
  
.nav-btn {
  background-color: white !important;
  border: 1px solid black !important;
  color: black !important;
}
  
.dropdown-controls {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  min-width: 140px;
}
  
.month-dropdown .v-input__control {
  min-width: 140px;
}
  
  .monthly-table th,
  .monthly-table td:first-child {
    background-color: #e0e0e0;
    font-weight: bold;
    text-align: center;
    padding: 8px;
    color: #000;
  }
  
  .monthly-table {
    width: 100%;
    border-collapse: collapse;
    color: #000;
  }
  
  .monthly-table th,
  .monthly-table td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 8px;
  }
  
  .event {
    background-color: #1565c0;
    color: white;
    margin-top: 4px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    z-index: 3;
    position: relative;
  }
  
  .event:hover {
    background-color: #0d47a1;
  }
  
  .not-current-month .day-box {
    opacity: 0.5;
  }
  
  .day-box {
    min-height: 80px;
  }
  
  .date {
    font-weight: bold;
    text-align: left;
    padding-left: 4px;
  }
  </style>
  