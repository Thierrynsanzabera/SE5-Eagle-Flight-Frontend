<template>
  <v-dialog v-model="show" max-width="1400px">
    <v-card>
      <v-card-title class="d-flex align-center">
        <span class="flex-grow-1 text-center">All Badges</span>
        <v-btn icon color="primary" @click="show = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="px-0">

        <v-row class="px-4" justify="space-between" align="center">
          <v-text-field
            v-model="search"
            label="Search Badges by Name"
            prepend-icon="mdi-magnify"
            class="search-bar"
            hide-details
          />

          <v-btn-toggle
            v-model="filterMode"
            color="primary"
            class="mr-4"
            mandatory
          >
            <v-btn value="all">All</v-btn>
            <v-btn value="unlocked">Unlocked</v-btn>
            <v-btn value="locked">Locked</v-btn>
          </v-btn-toggle>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="pagedBadges"
          :items-per-page="itemsPerPage"
          class="table-bg"
          hide-default-footer
        >
          <template #headers>
            <tr>
              <th class="text-center">Image</th>
              <th class="text-center">Name</th>
              <th class="text-center">Description</th>
            </tr>
          </template>

          <template #item.imagePath="{ item }">
            <v-avatar size="40">
              <v-img
                :src="item.imagePath"
                :class="{ 'grayscale': !item.unlocked }"
                contain
              />
            </v-avatar>
          </template>

          <template #item.name="{ item }">
            <span
              class="text-subtitle-2"
              :class="{ 'text-muted': !item.unlocked }"
            >
              {{ item.name }}
            </span>
          </template>

          <template #item.description="{ item }">
            <span :class="{ 'text-muted': !item.unlocked }">
              {{ item.description }}
            </span>
          </template>
        </v-data-table>

        <v-pagination
          v-model="page"
          :length="pageCount"
          circle
          class="mt-4"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  badges: Array
})
const emit = defineEmits(['update:modelValue'])

const show = ref(props.modelValue)
watch(() => props.modelValue, v => show.value = v)
watch(show, v => emit('update:modelValue', v))

const search = ref('')
const filterMode = ref('all') // 'all', 'unlocked', 'locked'
const page = ref(1)
const itemsPerPage = 10

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  return props.badges
    .filter(badge => {
      if (filterMode.value === 'unlocked') return badge.unlocked
      if (filterMode.value === 'locked') return !badge.unlocked
      return true
    })
    .filter(badge => badge.name.toLowerCase().includes(q))
    .sort((a, b) => collator.compare(a.name, b.name))
})

const pageCount = computed(() =>
  Math.ceil(filtered.value.length / itemsPerPage)
)

const pagedBadges = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return filtered.value.slice(start, start + itemsPerPage)
})

const headers = [
  { text: 'Image', value: 'imagePath', align: 'center', width: '125px' },
  { text: 'Name', value: 'name', align: 'center', width: '200px' },
  { text: 'Description', value: 'description', align: 'center', maxWidth: '600px' }
]
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
.grayscale {
  filter: grayscale(1);
  opacity: 0.4;
}
.text-muted {
  opacity: 0.5;
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