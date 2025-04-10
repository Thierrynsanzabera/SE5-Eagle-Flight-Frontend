<template>
    <v-card height="350px" width="560" color="secondary">
        <v-container class="px-6">
            <v-card-title class="text-h5 text-center py-0">{{ title }}</v-card-title>
            <v-card-subtitle class="text-body-2 text-center">Points: {{ points }}</v-card-subtitle>
            <v-sheet class="pa-5" style="height: 140px; overflow-y: auto;" color="background" rounded="lg"
                elevation="1">
                {{ description }}
            </v-sheet>
            <v-row class="mt-2 mx-0">
                <v-btn size="large" width="100%" color="primary" rounded="lg">Complete</v-btn>
            </v-row>
            <v-row class="mt-5 mx-0">
                <v-btn size="large" width="100%" color="primary" rounded="lg" @click="cancelTask">Cancel</v-btn>
            </v-row>
        </v-container>
    </v-card>
</template>
<script setup>
import { computed } from 'vue'
import { useFpInstanceStore } from '@/store/instanceFpStore'

const fpInstanceStore = useFpInstanceStore()
const cancelTask = () => {
    fpInstanceStore.selectedTask = null
}

const title = computed(() => fpInstanceStore.selectedTask?.task?.name || '')
const points = computed(() => fpInstanceStore.selectedTask?.task?.points || 0)
const description = computed(() => fpInstanceStore.selectedTask?.task?.description || '')

</script>
<style scoped></style>