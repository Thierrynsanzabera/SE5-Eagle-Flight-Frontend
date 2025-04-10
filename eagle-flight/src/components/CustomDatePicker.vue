<template>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template #activator="{ props: activatorProps }">
            <v-text-field v-model="formattedDate" :label="label" readonly v-bind="activatorProps"
                variant="underlined" />
        </template>

        <v-date-picker v-model="internalDate" @update:model-value="onDateSelected" />
    </v-menu>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
    label: {
        type: String,
        default: 'Select a date'
    },
    modelValue: {
        type: String,
        default: null
    }
})

// Emit
const emit = defineEmits(['update:modelValue'])

// Local state
const internalDate = ref(props.modelValue)
const menu = ref(false)

// Sync selected date back to parent
const onDateSelected = (val) => {
    internalDate.value = val
    emit('update:modelValue', val)
    menu.value = false
}

// Show date as MM/DD/YYYY
const formattedDate = computed(() => {
    if (!internalDate.value) return ''
    const date = new Date(internalDate.value)
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const yyyy = date.getFullYear()
    return `${mm}/${dd}/${yyyy}`
})

// Keep internal state in sync if parent changes value
watch(() => props.modelValue, val => {
    internalDate.value = val
})
</script>