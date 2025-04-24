<template>
    <v-card color="background" height="100px" width="200px">
        <v-card-title class="text-high-emphasis text-center py-0">{{ item.name }}</v-card-title>
        <v-card-subtitle class="text-overline text-center mt-0 mb-5">{{ item.points }} points</v-card-subtitle>
        <v-row class="d-flex justify-center align-center">
            <v-btn color="secondary" @click="$emit('edit')" variant="text">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="primary" @click="$emit('delete')" variant="text">
                <v-icon>mdi-delete</v-icon>
            </v-btn>

        </v-row>
    </v-card>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>
<style scoped></style>