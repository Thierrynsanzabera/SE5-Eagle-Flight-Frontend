<template>
  <v-card>
    <v-text-field
      v-model="search"
      label="Search Badges"
      prepend-icon="mdi-magnify"
      class="search-bar"
    />
    <div class="badge-list-container">
      <v-data-table :items="filteredBadges" :headers="headers" hide-default-header>
        <template v-slot:item.imagePath="{ item }">
            <v-avatar size="40">
                <v-img
                :src="item.imagePath"
                alt="Badge Image"
                max-width="100"
                max-height="100"
                cover
                />
            </v-avatar>
        </template>
        <template #item.actions="{ item }">
          <v-btn icon @click="$emit('edit', item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="deleteBadge(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed, defineExpose } from 'vue';
import badgeServices from '@/services/eagle-flight/badgeServices';

const badges = ref([]);
const search = ref('');

defineExpose({ loadBadges });

const headers = [
  { text: 'Image', value: 'imagePath' },
  { text: 'Name', value: 'name' },
  { text: 'Description', value: 'description' },
  { text: 'Actions', value: 'actions', sortable: false },
];

const filteredBadges = computed(() =>
  badges.value.filter(badge =>
    badge.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

async function loadBadges() {
  try {
    const res = await badgeServices.getAllBadges();
    badges.value = res.data;
  } catch (error) {
    console.error('Error loading badges:', error);
  }
}

function deleteBadge(id) {
  badgeServices.deleteBadge(id)
    .then(() => loadBadges())
    .catch(err => console.error('Error deleting badge:', err));
}

onMounted(loadBadges);
</script>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.badge-list-container {
  padding: 1rem;
}
</style>
