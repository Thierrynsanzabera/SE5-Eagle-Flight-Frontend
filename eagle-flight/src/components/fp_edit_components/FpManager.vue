<template>
    <v-card color="secondary" height="470px" width="1400px">
        <v-container max-width="94%" class="px-0">
            <v-card-title class="pb-0 mb-3 text-center text-h4">
                Flight Plan Template Edit
            </v-card-title>

            <v-row>
                <v-col cols="6" class="py-0">
                    <v-select
                        label="Template"
                        :items="templates"
                        v-model="editFpStore.selectedTemplate"
                        item-title="title"
                        variant="underlined"
                        :return-object="true"
                    />
                </v-col>
                <v-col cols="2">
                    <v-btn color="background" variant="flat" rounded="pill" @click="editFpStore.showOverlay = true">
                        +Template
                    </v-btn>
                </v-col>
            </v-row>

            <div v-show="editFpStore.selectedTemplate">
                <v-row>
                    <v-col cols="3" class="d-flex justify-center">
                        <YearIcon :yearNumber="1" />
                    </v-col>
                    <v-col cols="3" class="d-flex justify-center">
                        <YearIcon :yearNumber="2" />
                    </v-col>
                    <v-col cols="3" class="d-flex justify-center">
                        <YearIcon :yearNumber="3" />
                    </v-col>
                    <v-col cols="3" class="d-flex justify-center">
                        <YearIcon :yearNumber="4" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-select
                            chips
                            multiple
                            label="Target Majors"
                            :items="majors"
                            item-title="name"
                            item-value="id"
                            variant="outlined"
                            v-model="selectedMajors"
                        />
                    </v-col>
                    <v-col cols="6" class="d-flex align-center">
                        <v-row class="d-flex justify-end">
                            <v-btn class="mx-3" color="red" variant="outlined" rounded-lg
                                @click="editFpStore.showDeleteOverlay = true" size="large">
                                Delete
                            </v-btn>
                            <v-btn class="mx-3" color="background" variant="outlined" rounded-lg @click="saveData"
                                size="large">
                                Save
                            </v-btn>
                            <v-btn class="mx-3" color="background" variant="outlined" rounded-lg @click="cancelEdit"
                                size="large">
                                Cancel
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </v-card>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useEditFpStore } from '@/store/editFpStore'
import majorServices from '@/services/eagle-flight/majorServices'

const editFpStore = useEditFpStore()
const majors = ref([])
const selectedMajors = ref()
const selectedMajorsCopy = ref([])
const templates = computed(() => {
    return editFpStore.templateList
})
const currentPlanId = ref("")

onMounted(async () => {
    try {
        majors.value = await editFpStore.getMajors()
    } catch (error) {
        console.error("Failed to load majors:", error)
        majors.value = []
    }
    watch(
        () => editFpStore.currentPlan,
        (newPlan) => {
            if (newPlan && newPlan.id) {
                currentPlanId.value = newPlan.id
                selectedMajors.value = majors.value
                    .filter(major => major.planId === currentPlanId.value)
                    .map(major => major.id)
                selectedMajorsCopy.value = [...selectedMajors.value]

            }
        },
        { immediate: true }
    )
})

async function saveData() {
    const added = selectedMajors.value.filter(id => !selectedMajorsCopy.value.includes(id))
    const removed = selectedMajorsCopy.value.filter(id => !selectedMajors.value.includes(id))

    console.log("Added majors:", added)
    console.log("Removed majors:", removed)

    try {
        for (const majorId of added) {
            await majorServices.update(majorId, { planId: currentPlanId.value })
        }

        for (const majorId of removed) {
            await majorServices.update(majorId, { planId: null })
        }

        await editFpStore.saveData()
        selectedMajorsCopy.value = [...selectedMajors.value]
        editFpStore.showSaveOverlay = true
    } catch (error) {
        console.error("Failed to update majors:", error)
    }
}

function cancelEdit() {
    editFpStore.selectedTemplate.value = null
    editFpStore.clearSemesters()
}
</script>
<style scoped></style>