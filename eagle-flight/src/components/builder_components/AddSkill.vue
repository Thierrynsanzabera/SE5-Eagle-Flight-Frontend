<template>
    <v-icon v-if="mode === 'add'" @click="openDialog" size="40px">mdi-plus</v-icon>
    <v-icon v-else @click="openDialog">mdi-pencil</v-icon>

    <v-dialog v-model="showSkillDialog">
        <v-container class="justify-center">
        <v-card color="primary" max-width="95vw">
        <v-card-title>{{ mode === 'add' ? 'Add skill' : 'Edit' }}</v-card-title>
          <v-col cols="4"></v-col>
                    <!-- Skill or Language Selection -->
                    <v-radio-group v-model="skill.isLanguage" inline>
                        <v-radio :value="false" label="Skill"></v-radio>
                        <v-radio :value="true" label="Language"></v-radio>
                    </v-radio-group>

                    <!-- Conditional Rendering Based on Selection -->
                    <v-text-field
                        v-if="!skill.isLanguage"
                        v-model="skill.title"
                        label="Skill"
                        type="text"
                    ></v-text-field>
                    
                    <template v-else>
                        <v-text-field
                            v-model="skill.title"
                            label="Name of Language"
                            type="text"
                        ></v-text-field>
                        <v-select
                            v-model="skill.proficiencyLevel"
                            label="Proficiency Level"
                            :items="proficiencyLevels"
                        ></v-select>
                    </template>
                    <v-btn color="primary" @click="saveSkill">Save</v-btn>
                </v-card>
            </v-container>
    </v-dialog>
</template>


<script setup>
import { ref } from 'vue';
import skillServices from '@/services/skillServices';

const proficiencyLevels = [
    "Beginner", "Intermediate", "Advanced", "Fluent", "Native"
];

const emit = defineEmits(["refresh-data"]);

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  skillList: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    default: "add",
  },
  skillToEdit: {
    type: Object,
    default: () => ({}),
  },
});

let showSkillDialog = ref(false);
let userId = props.userId;

let skill = ref({
    title: '',
    isLanguage: false,
    proficiencyLevel: '',
    userId: userId,
});


// Open the dialog for add or edit
const openDialog = () => {
  if (props.mode === "edit") {
    // Pre-fill skill object for editing
    skill.value = { ...props.skillToEdit };
  } else {
    // Clear skill object for adding
    skill.value = {
    companyName: '',
    jobRole: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    userId: props.userId,
    };
  }
  showSkillDialog.value = true;
};

// Save skill (Add or Edit)
const saveSkill = () => {
  if (props.mode === "add") {
    // Add new skill
    skillServices
      .create(skill.value)
      .then((res) => {
        console.log("skill added:", res);
        props.skillList.push(skill.value); // Update the list
        showSkillDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error adding skill:", err);
      });
  } else if (props.mode === "edit") {
    // Update existing skill
    skillServices
      .update(skill.value.skillId, skill.value)
      .then((res) => {
        console.log("skill updated:", res);
        const index = props.skillList.findIndex(
          (e) => e.skillId === skill.value.skillId
        );
        if (index !== -1) {
          props.skillList[index] = skill.value; // Update the list
        }
        showSkillDialog.value = false; // Close dialog
        emit("refresh-data");

      })
      .catch((err) => {
        console.error("Error updating skill:", err);
      });
  }
};
</script>
<style scoped></style>