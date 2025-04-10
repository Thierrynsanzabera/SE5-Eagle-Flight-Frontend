<template>
    <div class="d-flex justify-center align-center" style="cursor:pointer" @mouseenter="hovered = true"
        @mouseleave="hovered = false" @click="fpInstanceStore.setCurrentSemester(semester)">
        <v-btn v-if="!hovered" class="px-0 mx-5" :style="{
            height: '7px',
            width: '30px',
            minWidth: 0,
        }" />
        <span v-else class="text-overline hover-text">{{ semester.name }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFpInstanceStore } from '@/store/instanceFpStore'

const fpInstanceStore = useFpInstanceStore()
const hovered = ref(false)
const props = defineProps({
    semester: {
        type: Object,
    },
})
</script>

<style scoped>
.hover-text {
    margin-inline: 20px;
    white-space: nowrap;
}
</style>