<template>
    <v-overlay v-model="showOverlay" class="d-flex justify-center align-center" z-index="1">
        <ExpandedTask />
    </v-overlay>

    <v-card color="transparent" height="64px"></v-card>
    <v-card style="padding: 10px; margin: 10px;" color="transparent" variant="flat">
        <v-row class="d-flex justify-center align-center">
            <v-icon style="font-size: 160%;">mdi-send-variant</v-icon>
            <v-card-title style="font-size: 140%;">My Flight Plan</v-card-title>
        </v-row>
    </v-card>
    <v-container class="d-flex justify-center">
        <FlightPlanCard />
    </v-container>
</template>

<script setup>
import { useFpInstanceStore } from '@/store/instanceFpStore';
import { computed } from 'vue'

const fpInstanceStore = useFpInstanceStore()

const showOverlay = computed(() => fpInstanceStore.showOverlay)

</script>
<style scoped></style>