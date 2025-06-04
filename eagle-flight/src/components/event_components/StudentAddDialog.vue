<template>
  <v-dialog v-model="dialog" max-width="700px">
    <v-card>
      <v-card-title class="text-h6 text-center">Add Student to Event</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="px-4" justify="center">
          <v-btn-toggle
            v-model="searchMode"
            color="primary"
            class="mb-4"
            mandatory
          >
            <v-btn value="OC ID">OC ID</v-btn>
            <v-btn value="Name">Name</v-btn>
            <v-btn value="CSV">CSV</v-btn>
          </v-btn-toggle>

          <v-col cols="12" v-if="searchMode === 'CSV'">
            <v-file-input
              label="Upload CSV File"
              accept=".csv"
              @change="handleCsvUpload"
            />

            <v-table v-if="csvStudents.length" class="mt-3">
              <thead>
                <tr>
                  <th class="text-center">OC ID</th>
                  <th class="text-center">First Name</th>
                  <th class="text-center">Last Name</th>
                  <th class="text-center">Attending</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in csvStudents" :key="index">
                  <td class="text-center">
                    <v-text-field v-model="student.ocId" density="compact" hide-details class="ma-0 pa-0" />
                  </td>
                  <td class="text-center">
                    <v-text-field v-model="student.firstName" density="compact" hide-details class="ma-0 pa-0" />
                  </td>
                  <td class="text-center">
                    <v-text-field v-model="student.lastName" density="compact" hide-details class="ma-0 pa-0" />
                  </td>
                  <td class="text-center">
                    <v-checkbox v-model="student.attending" hide-details density="compact" class="ma-0 pa-0 d-flex justify-center" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col cols="12" v-else>
            <v-text-field
              v-model="searchQuery"
              :label="`Search by ${searchMode}`"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

            <v-table class="mt-3">
              <thead>
                <tr>
                  <th class="text-center">OC ID</th>
                  <th class="text-center">First Name</th>
                  <th class="text-center">Last Name</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="student in filteredStudents"
                  :key="student.userId || student.ocId"
                  :class="{ 'bg-grey-darken-3': selectedStudent?.userId === student.userId }"
                  @click="selectStudent(student)"
                  class="cursor-pointer"
                >
                  <td class="text-center">{{ student.ocId }}</td>
                  <td class="text-center">{{ student.fName }}</td>
                  <td class="text-center">{{ student.lName }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>

        <v-row v-if="selectedStudent || csvStudents.length > 0" class="d-flex justify-center">
          <v-checkbox v-if="selectedStudent" v-model="status" label="Attending" />
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="grey" @click="cancel" class="mx-2">Cancel</v-btn>
        <v-btn
          color="primary"
          :disabled="searchMode === 'CSV' ? csvStudents.length === 0 : !selectedStudent"
          @click="confirm"
        >
          Confirm
        </v-btn>
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
const csvStudents = ref([]);

watch(() => props.modelValue, (val) => {
  dialog.value = val;
  if (val) fetchAllStudents();
});

watch(dialog, (val) => {
  emit('update:modelValue', val);
  if (!val) {
    selectedStudent.value = null;
    searchQuery.value = '';
    csvStudents.value = [];
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
  if (searchMode.value === 'CSV') return [];
  if (!searchQuery.value) return students.value;

  const query = searchQuery.value.toLowerCase();
  return students.value.filter(student => {
    if (searchMode.value === 'OC ID') {
      return student.ocId.toString().includes(query);
    } else if (searchMode.value === 'Name') {
      return `${student.fName} ${student.lName}`.toLowerCase().includes(query);
    }
    return true;
  });
});

watch(searchMode, () => {
  searchQuery.value = '';
  selectedStudent.value = null;
  csvStudents.value = [];
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

  if (searchMode.value === 'CSV') {
    csvStudents.value.forEach(student => {
      emit('student-added', {
        eventID: selectedEventId.value,
        studentUserID: null,
        studentOCID: student.ocId,
        fName: student.firstName,
        lName: student.lastName,
        status: student.attending ? 1 : 0
      });
    });
  } else {
    emit('student-added', {
      eventID: selectedEventId.value,
      studentUserID: selectedStudent.value.userId,
      studentOCID: selectedStudent.value.ocId,
      status: status.value ? 1 : 0
    });
  }

  selectedStudent.value = null;
  dialog.value = false;
}

function cancel() {
  selectedStudent.value = null;
  dialog.value = false;
}

function handleCsvUpload(e) {
  let file;
  if (e instanceof File) {
    file = e;
  } else if (e?.target?.files?.[0]) {
    file = e.target.files[0];
  }

  if (!file || !(file instanceof Blob)) return;

  const reader = new FileReader();
  reader.onload = evt => {
    const lines = evt.target.result.split(/\r?\n/).filter(Boolean);
    const parsed = [];

    for (let i = 1; i < lines.length; i++) {
      const [ocId, firstName, lastName, attendingRaw] = lines[i].split(',');
      if (!ocId || !firstName || !lastName) continue;

      parsed.push({
        ocId: ocId.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        attending: attendingRaw?.trim() === '1'
      });
    }
    csvStudents.value = parsed;
  };
  reader.readAsText(file);
}
</script>