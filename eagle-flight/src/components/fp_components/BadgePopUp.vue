<template>
    <v-dialog v-model="popUpDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">{{ badge.name }}</v-card-title>
        <v-card-text>{{ badge.description }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Object,
      default: () => ({ name: '', description: '' }),
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const popUpDialog = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
  
  function close() {
    popUpDialog.value = false;
  }
  </script>
  
  <style scoped>
  .headline {
    background-color: #800000;
    color: white;
  }
  </style>  