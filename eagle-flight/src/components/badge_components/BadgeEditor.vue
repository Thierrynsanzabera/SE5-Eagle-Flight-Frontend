<template>
  <v-dialog :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)" max-width="600px">
    <v-card>
      <v-card-title>{{ selectedBadge ? 'Edit Badge' : 'Add New Badge' }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="badge.name" label="Badge Name"></v-text-field>
        <v-textarea v-model="badge.description" label="Description"></v-textarea>
        <v-file-input label="Badge Image" @change="handleImageUpload" />
        <div v-if="previewImage || badge.imagePath">
          <v-img :src="previewImage || badge.imagePath" max-height="200" class="my-2"></v-img>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveBadge">{{ selectedBadge ? 'Update' : 'Create' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import badgeServices from '@/services/eagle-flight/badgeServices';

const props = defineProps({
  modelValue: Boolean,
  selectedBadge: Object
});
const emit = defineEmits(['update:modelValue', 'refresh']);
const badge = ref({ name: '', description: '', imagePath: '' });
const imageFile = ref(null);
const previewImage = ref(null);

watch(() => props.selectedBadge, (newVal) => {
  badge.value = newVal ? { ...newVal } : { name: '', description: '' };
  if (newVal && newVal.imagePath) {
    previewImage.value = newVal.imagePath;
  } else {
    previewImage.value = null;
  }
});

function handleImageUpload(e) {
  imageFile.value = e.target.files[0];
  previewImage.value = URL.createObjectURL(imageFile.value);
}

function closeDialog() {
  emit('update:modelValue', false);
}

async function saveBadge() {
  const formData = new FormData();
  formData.append('name', badge.value.name);
  formData.append('description', badge.value.description);
  if (imageFile.value) formData.append('image', imageFile.value);

  try {
    if (props.selectedBadge) {
      await badgeServices.updateBadge(props.selectedBadge.id, formData);
    } else {
      await badgeServices.createBadge(formData);
    }
    emit('refresh');
    closeDialog();
    imageFile.value = null;
    previewImage.value = null;
  } catch (error) {
    console.error('Error saving badge:', error);
  }
}
</script>

<style scoped></style>