<template>
    <div class="wrapper" @mouseover="showIconRow = true" @mouseout="showIconRow = false">
        <IconRow @edit-clicked="goToEdit" @download-clicked="downloadPDF" @delete-clicked="deleteResume" :style="{
            visibility: showIconRow && !newResumeBool ? 'visible' : 'hidden',
        }" />

        <v-card class="resumePreview" v-if="newResumeBool" @click="goToBuild">
            <div class="circle">
                <v-icon class="plusSign">mdi-plus</v-icon>
            </div>
        </v-card>

        <v-card class="resumePreview" v-else @click="showPreview">
        </v-card>

        <p>{{ resumeName }}</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { generatePDF } from '@/services/PDFDownloader';
import resumeServices from '@/services/resumeServices';

const props = defineProps({
    resumeObject: {
        type: Object
    }
});

let resumeObject = props.resumeObject
console.log(resumeObject)
let newResumeBool = resumeObject ? false : true;
let resumeName = newResumeBool ? "New Resume" : resumeObject.title;

let resumeId = newResumeBool ? 0 : resumeObject.resumeId;
let showIconRow = ref(false);

const emit = defineEmits(['showPreviewEmit']);
function showPreview() {
    emit('showPreviewEmit', resumeId)
}

const router = useRouter();
const goToBuild = () => { router.push('/build'); }
const goToEdit = () => { router.push('/edit/' + resumeId); }
const downloadPDF = () => { generatePDF(resumeObject); }
const deleteResume = () => {
    resumeServices.delete(resumeId)
        .then(() => {
            console.log("Resume deleted");
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<style scoped>
p {
    text-align: center;
    font-size: 12px;
}

.textInside {
    font-size: 12px;
    color: black;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    width: fit-content;
}

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

.resumePreview:hover .circle {
    transform: scale(1.1);
}

.resumePreview:hover .plusSign {
    transform: scale(1.1);
}

.plusSign {
    font-size: 48px;
    color: black;
    transition: transform 0.3s;
}

.circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}
</style>