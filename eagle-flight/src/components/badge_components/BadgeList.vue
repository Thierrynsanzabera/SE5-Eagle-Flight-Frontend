<template>
  <v-card>
    <v-text-field v-model="search" label="Search Badges by Name" prepend-icon="mdi-magnify" class="search-bar" hide-details />
    <div>
      <v-data-table :items="filteredBadges" :headers="headers" class="table-bg">
        <template #headers>
          <tr>
            <th class="text-center">Image</th>
            <th class="text-center">Name</th>
            <th class="text-center">Description</th>
            <th class="text-center">Action</th>
          </tr>
        </template>
        <template v-slot:item.imagePath="{ item }">
            <v-avatar size="40" :class="{ 'cursor-pointer': !!item.imagePath }" @click="item.imagePath && expandImage(item.imagePath)">
                <v-img v-if="item.imagePath" :src="item.imagePath" alt="Badge Image" max-width="100" max-height="100" />
                <v-icon v-else color="grey" size="40">mdi-image-off</v-icon>
            </v-avatar>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex ma-1">
            <v-btn icon @click="$emit('edit', item)" class="mr-1">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteBadge(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
  </v-card>
  <v-dialog v-model="expandImageDialog" max-width="700px">
      <v-card>
        <v-card-text class="pa-1">
          <v-img
            :src="imageSrc"
            alt="Badge Expanded"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="expandImageDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed, defineExpose } from 'vue';
import badgeServices from '@/services/eagle-flight/badgeServices';

const badges = ref([]);
const search = ref('');

defineExpose({ loadBadges });

const expandImageDialog = ref(false);
const imageSrc = ref('');

const headers = [
  { text: 'Image', value: 'imagePath', align:'center', width: '125px' },
  { text: 'Name', value: 'name', align: 'center', width: '200px' },
  { text: 'Description', value: 'description', align: 'center', maxWidth: '900px' },
  { text: 'Actions', value: 'actions', align: 'center', width: '125px' },
];

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
})

function expandImage(src){
  imageSrc.value = src;
  expandImageDialog.value = true;
}

const filteredBadges = computed(() => {
  return badges.value
    .filter(badge =>
      badge.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .sort((a, b) => collator.compare(a.name, b.name))
})

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
  width: 600px;
  justify-self: center;
}

.table-bg {
  background-color: rgb(30, 30, 30);
}

:deep(.v-data-table th),
:deep(.v-data-table td) {
  border-right: 1px solid lightgrey;
}

:deep(.v-data-table th:last-child),
:deep(.v-data-table td:last-child) {
  border-right: none;
}
</style>
