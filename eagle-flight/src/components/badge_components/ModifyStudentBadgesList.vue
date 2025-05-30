<template>
  <v-card>
    <v-text-field
      v-model="search"
      label="Search Students by OC ID or Name"
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
        <td class="text-center">{{ item.ocId }}</td>
      </template>
      <template #item.fullName="{ item }">
        <td class="text-center">
          {{ item.fName && item.lName ? `${item.fName} ${item.lName}` : 'Unknown' }}
        </td>
      </template>
      <template #item.actions="{ item }">
        <td class="text-center">
          <v-btn color="error" class="text-none" @click="$emit('manage', item.ocId)">MANAGE</v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import studentBadgeServices from '@/services/eagle-flight/studentBadgeServices';

const emit = defineEmits(['manage']);
const search = ref('');
const students = ref([]);

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
  { text: 'OC ID', value: 'ocId', align: 'center', width: '125px' },
  { text: 'Name', value: 'fullName', align: 'center' },
  { text: 'Actions', value: 'actions', align: 'center', width: '125px' },
];

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
  margin-bottom: 1rem;
  padding: 0 1rem;
  width: 600px;
  justify-self: center;
}

.table-bg {
  background-color: rgb(30, 30, 30);
  width: 100%;
}

:deep(.v-data-table th),
:deep(.v-data-table td) {
  border-right: 1px solid lightgrey;
  text-align: center;
  vertical-align: middle;
}

:deep(.v-data-table th:last-child),
:deep(.v-data-table td:last-child) {
  border-right: none;
}
</style>