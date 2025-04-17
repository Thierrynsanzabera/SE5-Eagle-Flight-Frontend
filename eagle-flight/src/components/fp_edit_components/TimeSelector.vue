<template>
    <v-row dense>
        <v-col cols="2" class="d-flex justify-center">
            <v-icon class="mt-4">mdi-clock-time-four-outline</v-icon>
        </v-col>
        <v-col cols="3">
            <v-select v-model="hour" :items="hours" label="Hour" />
        </v-col>
        <v-col cols="3">
            <v-select v-model="minute" :items="minutes" label="Minute" />
        </v-col>
        <v-col cols="3">
            <v-select v-model="ampm" :items="['AM', 'PM']" label="AM/PM" />
        </v-col>
    </v-row>
</template>
  
<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        modelValue: String
    })
    const emit = defineEmits(['update:modelValue'])

    const hour = ref('')
    const minute = ref('')
    const ampm = ref('')

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

    watch(
    () => props.modelValue,
    (newVal) => {
        if (!newVal) return
        const [hh, mm] = newVal.split(':')
        let h = parseInt(hh)
        ampm.value = h >= 12 ? 'PM' : 'AM'
        h = h % 12 || 12
        hour.value = String(h).padStart(2, '0')
        minute.value = mm
    },
    { immediate: true }
    )

    watch([hour, minute, ampm], () => {
        if (!hour.value || !minute.value || !ampm.value) return
        let h = parseInt(hour.value)
        if (ampm.value === 'PM' && h !== 12) h += 12
        if (ampm.value === 'AM' && h === 12) h = 0
        const formatted = `${String(h).padStart(2, '0')}:${minute.value}:00`
        emit('update:modelValue', formatted)
    })
</script>  