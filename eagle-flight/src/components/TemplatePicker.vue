<template>
    <v-container>
        <v-card width="40vw" color="transparent">
            <v-row>
                <v-col v-for="template in templates" :key="template.id" cols="3">
                    <v-card class="resumePreview" @click="selectTemplate(template.id)"
                        :class="{ selected: template.id === selectedTemplate }">
                    </v-card>
                    <v-card variant="plain">
                        <v-card-title class="font-weight-light">
                            {{ template.name }}
                        </v-card-title>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <v-radio-group v-model="selectedTemplate">
                                <v-radio :value="template.id" @click="selectTemplate(template.id)"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

const templates = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
    { id: 3, name: 'Template 3' },
    { id: 4, name: 'Template 4' },
];

const selectedTemplate = ref(1);
const emit = defineEmits(['template-selected']);

function selectTemplate(id) {
    selectedTemplate.value = id;
    emit('template-selected', id);  // Emit selected template id to parent
}

watch(selectedTemplate, (newValue) => {
    emit('template-selected', newValue);  // Re-emitting whenever template changes
});
</script>

<style scoped>
.resumePreview {
    width: 135px;
    height: 240px;
    background-color: lightgrey;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.resumePreview.selected {
    border: 2px solid #1976d2;
}
</style>
