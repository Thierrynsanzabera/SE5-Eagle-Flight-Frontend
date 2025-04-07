<template>
  <v-container class="d-flex justify-center align-center" height="100%">
    <v-card width="400" height="300" color="secondary" elevation="10">
      <v-card-title class="text-h5 mt-4 text-center">Eagle Flight Login</v-card-title>
      <v-container class="pa-2 d-flex flex-column align-center justify-center">
        <v-card height="60px" class="d-flex align-center justify-center" color="transparent" width="90%">
          <SocialLogin />
        </v-card>

        <v-btn color="primary" width="90%" size="large">
          Admin Login (for testing)
        </v-btn>
      </v-container>
    </v-card>

  </v-container>
</template>
<script setup></script>
<style scoped></style>