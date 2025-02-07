<template>
    <v-icon v-if="mode === 'add'" @click="openDialog" size="40px">mdi-plus</v-icon>
    <v-icon v-else @click="openDialog">mdi-pencil</v-icon>

    <v-dialog v-model="showAwardDialog">
        <v-container class="justify-center">
        <v-card color="primary" max-width="95vw">
        <v-card-title>{{ mode === 'add' ? 'Add award' : 'Edit' }}</v-card-title>
                    <v-text-field v-model="award.title" label="Award Title" type="text" required></v-text-field>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field v-model="award.description" label="Description" type="text" reqiored></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="award.startDate" label="Start Date *" type="month" required></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field v-model="award.endDate" label="End Date *" type="month" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn @click="saveAward">Save</v-btn>
            </v-container>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import awardServices from '@/services/awardServices';

const emit = defineEmits(["refresh-data"]);

const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    awardList: {
        type: Array,
        required: true
    },
     mode: {
        type: String,
        default: "add",
    },
    awardToEdit: {
        type: Object,
        default: () => ({}),
    },
});
let showAwardDialog = ref(false);
let userId = props.userId;

let award = ref({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    userId: userId,
});


// Open the dialog for add or edit
const openDialog = () => {
  if (props.mode === "edit") {
    // Pre-fill award object for editing
    award.value = { ...props.awardToEdit };
  } else {
    // Clear award object for adding
    award.value = {
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        userId: userId,
    };
  }
  showAwardDialog.value = true;
};

// Save award (Add or Edit)
const saveAward = () => {
  if (props.mode === "add") {
    // Add new award
    awardServices
      .create(award.value)
      .then((res) => {
        console.log("award added:", res);
        props.awardList.push(award.value); // Update the list
        showAwardDialog.value = false; // Close dialog
        emit("refresh-data");
      })
      .catch((err) => {
        console.error("Error adding award:", err);
      });
  } else if (props.mode === "edit") {
    // Update existing award
    awardServices
      .update(award.value.awardId, award.value)
      .then((res) => {
        console.log("award updated:", res);
        const index = props.awardList.findIndex(
          (e) => e.awardId === award.value.awardId
        );
        if (index !== -1) {
          props.awardList[index] = award.value; // Update the list
        }
        showAwardDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error updating award:", err);
      });
  }
};
</script>
<style scoped></style>