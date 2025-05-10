<template>
  <v-dialog :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)" max-width="600px">
    <v-card>
      <v-card-title>{{ selectedBadge ? 'Edit Badge' : 'Add New Badge' }}</v-card-title>
      <v-card-text>
        <v-text-field variant="outlined" v-model="badge.name" :label="badgeName" :error="!badge.name.trim()"></v-text-field>
        <v-textarea variant="outlined" v-model="badge.description" label="Description"></v-textarea>
        <v-file-input 
          clearable
          variant="outlined"
          label="Badge Image"
          v-model="imageFile"
          accept="image/*"
          :rules="[ file => !file || file.type.startsWith('image/') || 'This is not an image file. Please select an image file.']"
          show-size
          counter
          @change="handleImageUpload"
        />
        <div v-if="previewImage || badge.imagePath">
          <v-img :src="previewImage || badge.imagePath" max-height="200" class="my-2"></v-img>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="error" @click="closeDialog">Cancel</v-btn>
        <v-btn color="green" :disabled="!canSave" @click="saveBadge">{{ selectedBadge ? 'Update' : 'Create' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import badgeServices from '@/services/eagle-flight/badgeServices';

const props = defineProps({
  modelValue: Boolean,
  selectedBadge: Object
});

const emit = defineEmits(['update:modelValue', 'refresh']);
const badge = ref({ name: '', description: '', imagePath: '' });
const imageFile = ref(null);
const previewImage = ref(null);

const badgeName = computed (() => 
  badge.value.name.trim()
    ? 'Badge Name'
    : '* Badge Name *'
)

function resetForm() {
  if (props.selectedBadge) {
    badge.value        = { ...props.selectedBadge }
    previewImage.value = props.selectedBadge.imagePath || null
  } else {
    badge.value        = { name: '', description: '', imagePath: '' }
    previewImage.value = null
  }
  imageFile.value = null
}

watch(
  () => props.modelValue,
  isOpen => {
    if (isOpen) resetForm()
  }
)

watch(() => props.selectedBadge, (newVal) => {
  badge.value = newVal ? { ...newVal } : { name: '', description: '' };
  if (newVal && newVal.imagePath) {
    previewImage.value = newVal.imagePath;
  } else {
    previewImage.value = null;
  }
});

const canSave = computed(() => {
  const hasName = badge.value.name.trim().length > 0
  const validImage = !imageFile.value || imageFile.value.type.startsWith('image/')
  return hasName && validImage
})

function handleImageUpload(file) {
  imageFile.value = file.target.files[0];
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