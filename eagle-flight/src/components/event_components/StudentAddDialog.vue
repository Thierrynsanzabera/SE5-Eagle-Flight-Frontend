<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title class="d-flex justify-center align-center">
                Add Student to Event
            </v-card-title>
            <v-card-text>
                <v-row class="d-flex justify-center align-center">
                <v-col cols="12">
                    <v-select
                    v-model="searchMode"
                    :items="['OC ID', 'Name', 'CSV']"
                    label="Search By"
                    class="mb-3"
                    />
                </v-col>
                </v-row>

                <div v-if="searchMode === 'CSV'">
                <v-file-input
                    label="Upload CSV File"
                    accept=".csv"
                    @change="handleCsvUpload"
                />
                </div>

                <div v-else>
                    <v-text-field
                        v-model="searchQuery"
                        :label="`Search by ${searchMode}`"
                        prepend-inner-icon="mdi-magnify"
                        hide-details
                    />
                    
                <v-list>
                    <v-list-item
                    v-for="student in filteredStudents"
                    :key="student.userId"
                    @click="selectStudent(student)"
                    :active="selectedStudent?.userId === student.userId"
                    class="cursor-pointer"
                    >
                    <v-list-item-title>
                        <v-row>
                            <v-col class="d-flex justify-center align-center">{{ student.ocId }}</v-col>
                            <v-col class="d-flex justify-center align-center">{{ student.fName }}</v-col>
                            <v-col class="d-flex justify-center align-center">{{ student.lName }}</v-col>
                        </v-row>
                    </v-list-item-title>
                    </v-list-item>
                </v-list>
                </div>

                <div v-if="selectedStudent">
                <v-row class="d-flex justify-center align-center">
                    <v-checkbox v-model="status" label="Attending" />
                </v-row>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-row>
                <v-btn color="grey" @click="cancel" class="mx-1">Cancel</v-btn>
                <v-btn color="primary" :disabled="!selectedStudent" @click="confirm">Confirm</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import studentEventServices from '@/services/eagle-flight/studentEventServices';
import { useEventStore } from '@/store/eventStore';

const eventStore = useEventStore();
const selectedEventId = computed(() => eventStore.selectedEvent?.id);

const props = defineProps({
modelValue: Boolean
});
const emit = defineEmits(['update:modelValue', 'student-added']);

const dialog = ref(props.modelValue);
const searchMode = ref('OC ID');
const searchQuery = ref('');
const selectedStudent = ref(null);
const status = ref(false);
const students = ref([]);

watch(() => props.modelValue, (val) => {
dialog.value = val;
if (val) fetchAllStudents();
});

watch(dialog, (val) => {
  emit('update:modelValue', val);
  if (!val) {
    selectedStudent.value = null;
    searchQuery.value = '';
  }
});

function fetchAllStudents() {
studentEventServices.getAllStudentsWithNames().then(res => {
    students.value = res.data;
}).catch(err => {
    console.error("Error fetching students:", err);
});
}

const filteredStudents = computed(() => {
  if (searchMode.value === 'CSV') {
    return [];
  }
  if (!searchQuery.value) {
    return students.value;
  }
  const query = searchQuery.value.toLowerCase();
  return students.value.filter(student => {
    if (searchMode.value === 'OC ID') {
      return student.ocId.toString().includes(query);
    } else if (searchMode.value === 'Name') {
      return `${student.fName} ${student.lName}`.toLowerCase().includes(query);
    }
    return true; // Just in case
  });
});

watch(searchMode, () => {
  searchQuery.value = ''; // Clear search when mode is changed
});

function selectStudent(student) {
  if (selectedStudent.value?.userId === student.userId) {
    selectedStudent.value = null;
  } else {
    selectedStudent.value = student;
    status.value = true;
  }
}

function confirm() {
if (!selectedEventId.value) {
    console.error('No event selected!');
    return;
}

emit('student-added', {
    eventID: selectedEventId.value,
    studentUserID: selectedStudent.value.userId,
    studentOCID: selectedStudent.value.ocId,
    status: status.value ? 1 : 0
});
selectedStudent.value = null;
dialog.value = false;
}

function cancel() {
    selectedStudent.value = null;
    dialog.value = false;
}

function handleCsvUpload(file) {
console.log("CSV Upload selected. You'll implement parsing here.");
// Placeholder for CSV logic
}
</script>