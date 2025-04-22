<template>
    <v-card color="secondary" class="d-flex flex-column" height="840px">
        <v-card-title class="text-h6 d-flex justify-center align-center">Attending Students</v-card-title>
        <v-container class="d-flex justify-center">
            <v-btn color="primary" @click="showAddDialog = true">Add Student</v-btn>
            <StudentAddDialog v-model="showAddDialog" @student-added="handleStudentAdded" />
        </v-container>
                
        <div v-if="students.length > 0">
            <v-text-field
                v-model="search"
                label="Search by OC ID"
                prepend-inner-icon="mdi-magnify"
                hide-details
            />
            <v-data-table
                :headers="headers"
                :items="filteredStudents"
                height="565px"
            >
                <template #headers>
                    <tr>
                    <th class="text-center">OC ID</th>
                    <th class="text-center">Student Name</th>
                    <th class="text-center">Attending?</th>
                    <th class="text-center">Remove</th>
                    </tr>
                </template>
                <template #item.status="{ item }">
                    <div style="display: flex; justify-content: center;">
                        <v-checkbox 
                            v-model="item.status" 
                            @change="updateStudentStatus(item)" 
                            hide-details 
                            density="compact"
                        />
                    </div>
                </template>
                <template #item.actions="{ item }">
                    <v-btn color="error" @click="removeStudent(item)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </div>

        <div v-else class="text-center mt-1">
            <v-card-text class="text-white">
                No students are currently attending this event.
            </v-card-text>
        </div>
    </v-card>
</template>
  
<script setup>
import { ref, watch, computed } from 'vue'
import studentEventServices from '@/services/eagle-flight/studentEventServices'
import StudentAddDialog from './StudentAddDialog.vue'

const props = defineProps({
eventId: {
    type: Number,
    required: true
}
})

const headers = [
    { text: 'OC ID', value: 'ocId', align: 'center'},
    { text: 'Name', value: 'fullName', align: 'center'},
    { text: 'Attending', value: 'status', sortable: false, align: 'center' },
    { text: 'Remove', value: 'actions', sortable: false, align: 'center' }
]

const students = ref([])

watch(() => props.eventId, fetchStudents, { immediate: true })

function fetchStudents() {
    if (!props.eventId) return;
    console.log("Fetching students for event ID:", props.eventId);
    studentEventServices.getStudentsForEvent(props.eventId).then(res => {
        console.log("Response data:", res.data);
        students.value = res.data.map(s => ({
            studentUserID: s.userId,
            ocId: s.ocId,
            fullName: `${s.fName ?? 'FirstName'} ${s.lName ?? 'LastName'}`, 
            status: s.status === 1
        }));
    }).catch(err => {
        console.error("Error fetching students:", err);
    });
}

// Add Student Dialog
const showAddDialog = ref(false)

function handleStudentAdded(student) {
    studentEventServices.addStudentToEvent({
        eventID: props.eventId,
        studentUserID: student.studentUserID,
        studentOCID: student.studentOCID,
        status: student.status
    })
    .then(() => {
        fetchStudents();
    })
    .catch(err => {
        console.error("Error adding student to event:", err);
    });
}

function updateStudentStatus(student) {
    studentEventServices.updateStudentStatus(props.eventId, student.studentUserID, {
        status: student.status ? 1 : 0
    })
    .then(() => {
        console.log("Student status updated successfully.");
    })
    .catch(err => {
        console.error("Error updating student status:", err);
    });
}

const search = ref('');

const filteredStudents = computed(() => {
    if (!search.value) return students.value;
    return students.value.filter(student =>
        student.ocId.toString().includes(search.value.trim())
    );
});

function removeStudent(student) {
    if (confirm(`Are you sure you want to remove ${student.fullName} from this event?`)) {
        studentEventServices.deleteStudentFromEvent(props.eventId, student.studentUserID)
            .then(() => {
                console.log("Student removed successfully.");
                fetchStudents();
            })
            .catch(err => {
                console.error("Error removing student from event:", err);
            });
    }
}
</script>
