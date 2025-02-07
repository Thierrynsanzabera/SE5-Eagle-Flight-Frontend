<template>
    <div class="iconRow">
        <v-icon @click="emitEdit">mdi-pencil</v-icon>
        <v-icon @click="emitDownload">mdi-download</v-icon>
        <v-icon @click="emitDelete">mdi-delete</v-icon>
    </div>
</template>

<script setup>
const props = defineProps({
    size: {
        type: String,
        optional: true
    }
});

const emit = defineEmits();
const emitEdit = () => {emit('edit-clicked')}
const emitDownload = () => {emit('download-clicked')}
const emitDelete = () => {emit('delete-clicked')}

</script>

<style scoped>
.iconRow {
    color: white;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    scale: 0.75;
}
.v-icon {
    cursor: pointer;
    transition: transform 0.2s;
}

.v-icon:hover {
    transform: scale(1.2);
}
</style>