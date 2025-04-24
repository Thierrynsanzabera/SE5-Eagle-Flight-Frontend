<template>
    <v-card color="background" height="100px" width="200px">
        <v-card-title class="text-high-emphasis text-center py-0">{{ item.name }}</v-card-title>
        <v-card-subtitle class="text-overline text-center mt-0 mb-5">{{ item.points }} points</v-card-subtitle>
        <v-row class="d-flex justify-center align-center">
            <v-btn color="primary" @click="$emit('delete')" variant="text" :disabled="props.redeemable === false">
                Redeem
            </v-btn>

        </v-row>
    </v-card>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    redeemable: {
        type: Boolean,
        required: true
    }
});
</script>
<style scoped></style>