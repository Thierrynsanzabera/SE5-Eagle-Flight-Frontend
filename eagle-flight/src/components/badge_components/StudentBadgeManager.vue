<template>
  <v-container>
    <div class="d-flex justify-center mb-4">
      <v-btn @click="$emit('back')" color="secondary">Back to Student List</v-btn>
    </div>

    <v-row>
      <v-col>
        <h3 class="text-h6">Student: {{ student.fName }} {{ student.lName }} (OC ID: {{ student.ocId }})</h3>
        <v-divider class="my-3" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3 class="text-h6 mb-2">Assigned Badges</h3>
        <v-divider class="mb-2" />
      </v-col>
    </v-row>

    <v-row v-if="studentBadges.length > 0">
      <v-col
        v-for="badge in studentBadges"
        :key="badge.id"
        cols="auto"
        class="d-flex flex-column align-center"
      >
        <v-avatar size="64">
          <v-img :src="badge.imagePath" contain />
        </v-avatar>
        <span class="text-subtitle-2 mt-1">{{ badge.name }}</span>
        <v-btn small color="error" @click="$emit('remove-badge', badge)">Remove</v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <span class="text-subtitle-2">None</span>
      </v-col>
    </v-row>

    <v-divider class="my-3" />

    <v-row>
      <v-col>
        <h3 class="text-h6 mb-2">All Badges</h3>
        <v-divider class="mb-2" />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="badge in availableBadges"
        :key="badge.id"
        cols="auto"
        class="d-flex flex-column align-center"
      >
        <v-avatar size="64">
          <v-img :src="badge.imagePath" contain />
        </v-avatar>
        <span class="text-subtitle-2 mt-1">{{ badge.name }}</span>
        <v-btn small color="error" @click="$emit('assign-badge', badge)" :disabled="hasBadge(badge.id)">Assign</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  student: Object,
  studentBadges: Array,
  allBadges: Array
});

const emit = defineEmits(['assign-badge', 'remove-badge', 'back']);

const hasBadge = (id) => props.studentBadges.some(b => b.id === id);

const availableBadges = computed(() =>
  props.allBadges.filter(b => !props.studentBadges.some(sb => sb.id === b.id))
);
</script>

<style scoped>
.text-subtitle-2 {
  text-align: center;
}
</style>