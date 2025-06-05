<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-center">
        Student Flight Plan Progress
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="students"
        :items-per-page="10"
        class="elevation-1 table_lines"
        dense
      >
        <template #item.progress="{ item }">
          <v-progress-linear
            :model-value="item.progress"
            height="20"
            rounded
            :rounded-bar="true"
            bg-color="white"
            color="green"
            style="min-width: 200px;"
          >
            <template #default>
              <strong>{{ item.progress }}%</strong>
            </template>
          </v-progress-linear>
        </template>

        <template #headers>
          <tr>
            <th class="text-center" style="width: 120px;">OC ID</th>
            <th class="text-center" style="width: 160px;">First Name</th>
            <th class="text-center" style="width: 160px;">Last Name</th>
            <th class="text-center" style="width: 300px;">Flight Plan Progress</th>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import userFPPServices from '@/services/eagle-flight/userFPPServices'

const students = ref([])

const headers = [
  { text: 'OC ID', value: 'ocId' },
  { text: 'First Name', value: 'fName' },
  { text: 'Last Name', value: 'lName' },
  { text: 'Flight Plan Progress', value: 'progress' },
]

async function fetchUserFlightPlans() {
  try {
    const res = await userFPPServices.getUserFlightPlans()
    students.value = res.data
      .map(user => ({
        ocId: user.ocId,
        fName: user.fName,
        lName: user.lName,
        progress: user.progress,
      }))
      .sort((a, b) => a.lName.localeCompare(b.lName))
  } catch (err) {
    console.error('Failed to fetch user flight plan data:', err)
  }
}

onMounted(fetchUserFlightPlans)
</script>
<style scoped>
.table_lines {
  background-color: #1e1e1e;
}

:deep(.v-data-table th),
:deep(.v-data-table td) {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

:deep(.v-data-table th:last-child),
:deep(.v-data-table td:last-child) {
  border-right: none;
}
</style>