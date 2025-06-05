<template>
    <v-card height="350px" width="560" color="secondary">
        <v-container class="px-6">
            <v-card-title class="text-h5 text-center py-0">New Template</v-card-title>
            <v-text-field label="Title" v-model="templateTitle"></v-text-field>
            <v-select chips multiple label="Target Majors" :items="majors" item-title="name" item-value="id"
                variant="outlined" v-model="selectedMajors"></v-select>
        </v-container>
        <v-row class="mt-2 mx-0">
            <v-btn size="large" width="100%" color="primary" rounded="lg" @click="saveTemplate">Complete</v-btn>
        </v-row>
        <v-row class="mt-5 mx-0">
            <v-btn size="large" width="100%" color="primary" rounded="lg"
                @click="editFpStore.showOverlay = false">Cancel</v-btn>
        </v-row>
    </v-card>
</template>
<script setup>
import { useEditFpStore } from '@/store/editFpStore'
import { ref, onMounted } from 'vue'
import planServices from '@/services/eagle-flight/planServices'
import majorServices from '@/services/eagle-flight/majorServices'

const editFpStore = useEditFpStore()
const majors = ref([])

const templateTitle = ref("")
const selectedMajors = ref([])
onMounted(async () => {
    try {
        majors.value = await editFpStore.getMajors()
    } catch (error) {
        console.error("Failed to load majors:", error)
        majors.value = []
    }
})

const saveTemplate = async () => {
    try {
        const body = {
            title: templateTitle.value,
        };

        const response = await planServices.addplan(body);
        const planId = response.data.id;

        editFpStore.selectedTemplate = { id: planId, title: templateTitle.value };

        for (const majorId of selectedMajors.value) {
            await majorServices.update(majorId, { planId: planId });
        }

        await editFpStore.getPlans();

        editFpStore.showOverlay = false;
    } catch (error) {
        console.error("Failed to save template:", error);
    }
};
</script>
<style scoped></style>