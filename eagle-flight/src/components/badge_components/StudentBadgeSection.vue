<template>
  <v-card color="transparent" flat class="pa-4">
    <v-card-title class="text-h6">Badges</v-card-title>

    <v-row justify="center" dense v-if="unlockedBadges.length > 0">
      <v-col
        v-for="badge in unlockedBadges.slice(0, 5)"
        :key="badge.id"
        cols="auto"
        class="d-flex flex-column align-center"
      >
        <v-avatar size="64">
          <v-img :src="badge.imagePath" contain />
        </v-avatar>
        <span class="text-subtitle-1 mt-1">{{ badge.name }}</span>
      </v-col>
    </v-row>

    <v-row justify="center" dense v-else>
      <span class="text-subtitle-2">None</span>
    </v-row>

    <v-row justify="center" class="mb-1">
      <v-btn color="primary" text @click="showAll = true">
        View All
      </v-btn>
    </v-row>

    <StudentBadgeList
      v-model="showAll"
      :badges="allBadgesWithStatus"
    />
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/store'
import badgeServices from '@/services/eagle-flight/badgeServices'
import studentBadgeServices from '@/services/eagle-flight/studentBadgeServices'
import StudentBadgeList from './StudentBadgeList.vue'

const store = useAuthStore()
const userId = computed(() => store.userId)
const showAll = ref(false)
const allBadges = ref([])
const unlockedIds = ref([])

async function loadBadges() {
  if (!userId.value) {
    console.error('No user ID found in store.')
    return
  }

  try {
    const studentRes = await studentBadgeServices.getStudentByUserId(userId.value)
    const student = studentRes?.data

    if (!student || (!student.id && !student.ocId)) {
      throw new Error('Student data invalid or missing ID/ocId')
    }

    const studentId = student.ocId ?? student.id

    const [badgeRes, unlockedRes] = await Promise.all([
      badgeServices.getAllBadges(),
      studentBadgeServices.getStudentBadges(studentId)
    ])

    allBadges.value = badgeRes?.data || []
    unlockedIds.value = unlockedRes?.data?.map(entry => entry.id) || []

    console.log('Fetched allBadges:', allBadges.value)
    console.log('Fetched unlocked badge IDs:', unlockedIds.value)
  } catch (err) {
    console.error('Failed to load student or badges:', err)
    allBadges.value = []
    unlockedIds.value = []
  }
}

onMounted(loadBadges)

const allBadgesWithStatus = computed(() =>
  allBadges.value.map(b => ({
    ...b,
    unlocked: unlockedIds.value.includes(b.id)
  }))
)

const unlockedBadges = computed(() =>
  allBadgesWithStatus.value.filter(b => b.unlocked)
)
</script>
