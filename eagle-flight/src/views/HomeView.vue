<template>
    <div class="background">
        <div class="overlay-layer"></div> <!-- overlay layer -->

        <v-overlay v-model="fpInstanceStore.showOverlay" class="d-flex justify-center align-center" z-index="1">
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
    </div>
</template>

<script setup>
import { useFpInstanceStore } from '@/store/instanceFpStore';

const fpInstanceStore = useFpInstanceStore()

</script>
<style scoped>
.background {
    position: relative;
    background-image: url('https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    overflow: hidden;
}

.overlay-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    /* light white overlay */
    z-index: 0;
}
</style>
