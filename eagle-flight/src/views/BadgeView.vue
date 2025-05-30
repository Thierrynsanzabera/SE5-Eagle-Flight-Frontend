<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title class="d-flex justify-center align-center">
            Badge Management
          </v-card-title>

          <v-row class="d-flex justify-center align-center mb-4">
            <v-btn color="primary" class="ma-2" @click="toggleSection('add')">
              Create a Badge
            </v-btn>
            <v-btn color="secondary" class="ma-2" @click="toggleSection('view')">
              View / Edit Badges
            </v-btn>
            <v-btn color="info" class="ma-2" @click="toggleSection('modify')">
              Manage Student Badges
            </v-btn>
          </v-row>

          <BadgeEditor
            v-if="showAddBadge"
            v-model="badgeDialog"
            :selected-badge="selectedBadge"
            @refresh="refreshBadgeList"
          />

          <BadgeList
            v-if="showViewBadges"
            ref="badgeListRef"
            @edit="openEditDialog"
          />

          <ModifyStudentBadge
            v-if="showModifyBadges"
            v-model="modifyStudentBadges"
            @close="modifyStudentBadges = false"
            @manage="handleManageStudent"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import BadgeEditor from '@/components/badge_components/BadgeEditor.vue';
import BadgeList from '@/components/badge_components/BadgeList.vue';
import ModifyStudentBadge from '@/components/badge_components/ModifyStudentBadge.vue';

const badgeListRef = ref(null);
const badgeDialog = ref(false);
const selectedBadge = ref(null);

const showAddBadge = ref(false);
const showViewBadges = ref(false);
const showModifyBadges = ref(false);
const modifyStudentBadges = ref(false);

function toggleSection(section) {
  showAddBadge.value = section === 'add' ? !showAddBadge.value : false;
  showViewBadges.value = section === 'view' ? !showViewBadges.value : false;
  showModifyBadges.value = section === 'modify' ? !showModifyBadges.value : false;
  badgeDialog.value = section === 'add' ? !badgeDialog.value : false;
}

function openAddDialog() {
  selectedBadge.value = null;
  badgeDialog.value = true;
}

function openEditDialog(badge) {
  selectedBadge.value = badge;
  badgeDialog.value = true;
}

function refreshBadgeList() {
  if (badgeListRef.value) {
    badgeListRef.value.loadBadges();
  }
}

function handleManageStudent(ocId) {
  console.log('Managing student with OC ID:', ocId);
}
</script>

<style scoped></style>