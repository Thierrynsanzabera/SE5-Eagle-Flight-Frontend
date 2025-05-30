<template>
  <v-card>
    <template v-if="!selectedStudent">
      <v-text-field
        v-model="search"
        label="Search by OC ID or Name"
        prepend-icon="mdi-magnify"
        class="search-bar"
        hide-details
      />

      <v-data-table
        :items="filteredStudents"
        :headers="headers"
        class="table-bg"
        density="comfortable"
        style="width: 100%"
      >
        <template #headers>
          <tr>
            <th class="text-center" style="width: 125px">OC ID</th>
            <th class="text-center">Student Name</th>
            <th class="text-center" style="width: 125px">Action</th>
          </tr>
        </template>
        <template #item.ocId="{ item }">
          <td class="d-flex justify-center align-center">{{ item.ocId }}</td>
        </template>
        <template #item.fullName="{ item }">
          <td class="d-flex justify-center align-center">
            {{ item.fName && item.lName ? `${item.fName} ${item.lName}` : 'Unknown' }}
          </td>
        </template>
        <template #item.actions="{ item }">
          <td class="d-flex justify-center align-center">
            <v-btn color="error" class="text-none" @click="handleManage(item)">MANAGE</v-btn>
          </td>
        </template>
      </v-data-table>
    </template>

    <template v-else>
      <StudentBadgeManager
        :student="selectedStudent"
        :student-badges="studentBadges"
        :all-badges="allBadges"
        @assign-badge="assignBadge"
        @remove-badge="removeBadge"
        @back="selectedStudent = null"
      />
    </template>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import studentBadgeServices from '@/services/eagle-flight/studentBadgeServices';
import badgeServices from '@/services/eagle-flight/badgeServices';
import StudentBadgeManager from '@/components/badge_components/StudentBadgeManager.vue';

const emit = defineEmits(['manage']);
const search = ref('');
const students = ref([]);
const selectedStudent = ref(null);
const studentBadges = ref([]);
const allBadges = ref([]);

const filteredStudents = computed(() => {
  if (!search.value.trim()) return students.value;
  return students.value.filter(s => {
    const name = `${s.fName ?? ''} ${s.lName ?? ''}`.toLowerCase();
    return (
      s.ocId.toString().includes(search.value.trim()) ||
      name.includes(search.value.toLowerCase())
    );
  });
});

const headers = [
  { text: 'OC ID', value: 'ocId', align: 'center' },
  { text: 'Name', value: 'fullName', align: 'center' },
  { text: 'Actions', value: 'actions', align: 'center' },
];

async function handleManage(student) {
  selectedStudent.value = student;
  try {
    const [studentBadgeRes, allBadgeRes] = await Promise.all([
      studentBadgeServices.getStudentBadges(student.ocId),
      badgeServices.getAllBadges()
    ]);

    console.log('studentBadgeRes.data:', studentBadgeRes.data);

    studentBadges.value = studentBadgeRes.data;
    allBadges.value = allBadgeRes.data;
  } catch (err) {
    console.error('Error loading badges:', err);
  }
}

function assignBadge(badge) {
  studentBadgeServices.assignBadgeToStudent(selectedStudent.value.userId, badge.id)
    .then(() => handleManage(selectedStudent.value))
    .catch(err => console.error('Assign failed:', err));
}

function removeBadge(badge) {
  studentBadgeServices.removeBadgeFromStudent(selectedStudent.value.userId, badge.id)
    .then(() => handleManage(selectedStudent.value))
    .catch(err => console.error('Remove failed:', err));
}

onMounted(() => {
  studentBadgeServices.getAllStudentsWithNames().then(res => {
    students.value = res.data;
  }).catch(err => {
    console.error('Failed to fetch students with names:', err);
  });
});
</script>

<style scoped>
.search-bar {
  margin: 16px auto;
  padding: 0 1rem;
  max-width: 400px;
  width: 100%;
}

.table-bg {
  background-color: rgb(30, 30, 30);
  width: 100%;
}

:deep(.v-data-table th),
:deep(.v-data-table td) {
  border-right: 1px solid lightgrey;
}

:deep(.v-data-table th:last-child),
:deep(.v-data-table td:last-child) {
  border-right: none;
}
</style>