<template>
    <v-container>
        <v-row justify="center">
        <v-col cols="12" md="10">
            <v-card>
                <v-card-title class="d-flex justify-center align-center">
                    Badge Management
                </v-card-title>
                <div class="d-flex justify-center align-center mb-2">
                    <v-btn color="primary" @click="openAddDialog">Add New Badge</v-btn>
                </div>
            <BadgeList ref="badgeListRef" @edit="openEditDialog" />
            </v-card>
        </v-col>
        </v-row>
        <BadgeEditor
            v-model="badgeDialog"
            :selected-badge="selectedBadge"
            @refresh="refreshBadgeList"
            />
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import BadgeEditor from '@/components/badge_components/BadgeEditor.vue';
import BadgeList from '@/components/badge_components/BadgeList.vue';

const badgeListRef = ref(null);
const badgeDialog = ref(false);
const selectedBadge = ref(null);

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
</script>

<style scoped></style>
