<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template #activator="{ props }">
            <v-text-field
                v-model="eventDateTimeFormatted"
                label="Select Date and Time"
                readonly
                v-bind="props"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </template>
        <v-card>
            <v-date-picker v-model="eventDate" @change="saveDate"></v-date-picker>
            <v-time-picker v-model="eventTime" format="24hr" @change="saveTime"></v-time-picker>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menu = false">Done</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script setup>
    import { ref, computed, watch } from 'vue'

    const menu = ref(false)
    const eventDate = ref(null)
    const eventTime = ref(null)
    const event = ref({
        scheduledAt: null
    })

    const eventDateTimeFormatted = computed(() => {
        if (!event.value.scheduledAt) return ''
        return new Date(event.value.scheduledAt).toLocaleString()
    })

    const saveDate = () => {
        updateDateTime()
    }

    const saveTime = () => {
        updateDateTime()
    }

    function updateDateTime() {
        if (!eventDate.value || !eventTime.value) return
        const [hour, minute] = eventTime.value.split(':')
        const date = new Date(eventDate.value)
        date.setHours(+hour)
        date.setMinutes(+minute)
        date.setSeconds(0)
        event.value.scheduledAt = date.toISOString()
    }
</script>
  