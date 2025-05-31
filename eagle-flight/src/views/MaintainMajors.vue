<template>
  <v-container class="d-flex justify-center">
    <v-card max-width="1000px" width="100%">
      <v-card-title class="text-h5 text-center pa-4">Manage Majors</v-card-title>

      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-text-field
            v-model="newMajorName"
            label="New Major Name"
            outlined
            :error="!newMajorName.trim() && triedSubmit"
          />
        </v-col>
      </v-row>

      <div class="d-flex justify-center">
        <v-btn color="primary" @click="addMajor">Add Major</v-btn>
      </div>

      <v-alert
        v-if="showSuccess"
        type="success"
        class="mt-3 mx-auto fade-alert"
        max-width="400"
      >
        Major created successfully!
      </v-alert>

      <v-data-table
        :items="majors"
        class="elevation-1 mt-4 table-bg"
        item-value="id"
      >
        <template #headers>
          <tr>
            <th class="pl-7 text-left">Major Name</th>
            <th class="text-center" style="width: 200px;">Actions</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr>
            <td style="padding-left: 30px;">{{ item.name }}</td>
            <td class="text-center">
              <v-btn icon class="me-2" @click="openManageDialog(item)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteMajor(item.id)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="manageDialog" max-width="600">
      <v-card>
        <v-card-title>Edit Major</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedMajor.name" label="Major Name" outlined />
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="green" text @click="updateMajor">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import majorServices from '@/services/eagle-flight/majorServices'

const majors = ref([])
const newMajorName = ref('')
const triedSubmit = ref(false)
const showSuccess = ref(false)

const manageDialog = ref(false)
const editedMajor = ref({ id: null, name: '' })

function openManageDialog(item) {
  editedMajor.value = { ...item }
  manageDialog.value = true
}

function closeDialog() {
  manageDialog.value = false
  editedMajor.value = { id: null, name: '' }
}

async function fetchMajors() {
  try {
    const res = await majorServices.getAll()
    majors.value = res.data
  } catch (err) {
    console.error('Failed to fetch majors:', err)
  }
}

async function addMajor() {
  triedSubmit.value = true
  const name = newMajorName.value.trim()
  if (!name) return

  try {
    await majorServices.addmajor({ name })
    newMajorName.value = ''
    triedSubmit.value = false
    fetchMajors()
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 3000)
  } catch (err) {
    console.error('Failed to add major:', err)
  }
}

async function deleteMajor(id) {
  try {
    await majorServices.delete(id)
    fetchMajors()
  } catch (err) {
    console.error('Failed to delete major:', err)
  }
}

async function updateMajor() {
  try {
    await majorServices.update(editedMajor.value.id, {
      name: editedMajor.value.name.trim()
    })
    fetchMajors()
    closeDialog()
  } catch (err) {
    console.error('Failed to update major:', err)
  }
}

onMounted(fetchMajors)
</script>

<style scoped>
.table-bg {
  background-color: #1e1e1e;
}

:deep(.v-data-table th),
:deep(.v-data-table td) {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.v-data-table th:last-child),
:deep(.v-data-table td:last-child) {
  border-right: none;
}

.fade-alert {
  animation: flash 1s ease-in-out infinite alternate;
}

@keyframes flash {
  from { opacity: 1; }
  to { opacity: 0.5; }
}
</style>