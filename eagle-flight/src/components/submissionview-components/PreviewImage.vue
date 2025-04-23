<template>
    <div class="d-flex flex-column align-center">
        <img v-if="imageUrl" :src="imageUrl" alt="Preview"
            style="max-width: 1000px; max-height: 560px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);" />

        <v-alert v-else type="warning" variant="tonal" class="mt-3" border="start">
            Image not available.
        </v-alert>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    fileName: String
});

const imageUrl = ref(`http://localhost:3013/submission/image/${encodeURIComponent(props.fileName)}`);

</script>