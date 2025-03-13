<template>
    <v-container>
        <!-- Header row -->
        <v-row justify="center" class="mt-10">
            <v-col cols="12" class="text-center">
                <h1>Account Information</h1>
            </v-col>
        </v-row>
        <v-row justify="center">
            <!-- Left column (Personal Information) -->
            <v-col cols="12" md="4">
                <v-card color="transparent" class="v-card-border">
                    <v-card-title class="headline">Personal Information</v-card-title>
                    <v-card-text class="card-text-box">
                        <br>
                        <p>First Name:</p>
                        <p>Last Name:</p>
                        <p>Home Address:</p>
                        <p>Phone Number:</p>
                        <p>Other Information:</p>
                    </v-card-text>
                </v-card>
            </v-col>
  
            <!-- Right column (Awards, Badges, Points) -->
            <v-col cols="12" md="4">
                <!-- Awards -->
                <v-card color="transparent" class="mb-4 v-card-border">
                    <v-card-title class="headline">Awards</v-card-title>
                    <v-card-text class="card-text-box">
                        <br>
                        <p>List of Awards</p>
                    </v-card-text>
                </v-card>
                <!-- Badges -->
                <v-card color="transparent" class="mb-4 v-card-border">
                    <v-card-title class="headline">Badges</v-card-title>
                    <v-card-text class="card-text-box">
                        <br>
                        <v-row>
                            <!-- Loop over badges -->
                            <v-col
                                v-for="badge in badges"
                                :key="badge.id"
                                cols="12"
                                class="d-flex align-center justify-space-between"
                            >
                                <span>{{ badge.name }}</span>
                                <v-btn color="primary" @click="openBadgeDialog(badge)">
                                View
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <!-- Points -->
                <v-card color="transparent" class="v-card-border">
                    <v-card-title class="headline">Points</v-card-title>
                    <v-card-text class="card-text-box">
                        <br>
                        <p>Total:</p>
                        <p>Lifetime:</p>
                        <p>Used:</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- Badge Details Dialog -->
        <BadgeDialog v-model="dialog" :badge="selectedBadge" />
    </v-container>
</template>

<script setup>
    import { getBadges } from '@/services/badgeServices.js';
    import BadgeDialog from '@/components/fp_components/BadgePopUp.vue'

    const { badges, dialog, selectedBadge, openBadgeDialog } = getBadges();
</script>

<style scoped>
    .headline {
        background-color:#800000;
        color: white;
    }
    .mt-10 {
        margin-top: 10rem;
    }
    .card-text-box {
        color: black;
    }
    .v-card-border {
        border-width: 1px;
        border-color: black;
    }
</style>  