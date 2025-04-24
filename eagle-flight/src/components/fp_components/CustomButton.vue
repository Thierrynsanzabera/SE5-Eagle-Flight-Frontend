<template>
    <div class="d-flex justify-center align-center" style="cursor:pointer"
        @click="fpInstanceStore.setCurrentSemester(semester)">
        <span v-if="semester == fpInstanceStore.selectedSemester" class="text-overline selected-text">{{ semester.label
            }}</span>
        <span v-else class="text-overline custom-text">{{ semester.label }}</span>
    </div>
</template>

<script setup>
import { useFpInstanceStore } from '@/store/instanceFpStore'

const fpInstanceStore = useFpInstanceStore()
const props = defineProps({
    semester: {
        type: Object,
    },
})
</script>

<style scoped>
.custom-text,
.selected-text {
    margin-inline: 20px;
    white-space: nowrap;
}

.selected-text {
  text-decoration: underline;
  text-underline-offset: 2px;
}

</style>