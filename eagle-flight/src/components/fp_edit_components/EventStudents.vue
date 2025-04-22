<template>
    <v-card color="secondary" height="500px">
        <v-card-title class="text-h6 d-flex justify-center align-center">Attending Students</v-card-title>

        <div v-if="students.length > 0">
        <v-data-table
            :headers="[
            { text: 'Name', value: 'fullName' },
            { text: 'Status', value: 'status' },
            { text: 'Reflection', value: 'reflection' }
            ]"
            :items="students"
            dense
            class="mt-2"
            height="400"
        ></v-data-table>
        </div>

        <div v-else class="text-center mt-1">
        <v-card-text class="text-white">
            No students are currently attending this event.
        </v-card-text>
        </div>
    </v-card>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import eventServices from '@/services/eagle-flight/eventServices'

const props = defineProps({
eventId: {
    type: Number,
    required: true
}
})

const students = ref([])

watch(() => props.eventId, fetchStudents, { immediate: true })

function fetchStudents() {
    if (!props.eventId) return
    console.log("Fetching students for event ID:", props.eventId)
    eventServices.getStudentsForEvent(props.eventId).then(res => {
    console.log("Response data:", res.data)
    students.value = [
        {
        fullName: 'Alice Johnson',
        status: 1,
        reflection: 'Looking forward to it!'
        },
        {
        fullName: 'Bob Smith',
        status: 2,
        reflection: 'I may be late'
        }
    ]
    // students.value = res.data.map(s => ({
    //     ...s,
    //     fullName: `${s.fName} ${s.lName}`
    // }))
    }).catch(err => {
    console.error("Error fetching students:", err)
    })
}
</script>
