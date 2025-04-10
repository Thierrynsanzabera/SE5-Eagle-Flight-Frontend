<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card color="transparent" elevation="8" class="px-4">
            <v-card-title>Points Redemption History</v-card-title>
            <v-list>
              <v-list-item-group v-if="history.length">
                <v-list-item v-for="(item, index) in history" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.redeemDate }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.redeemable.name }} - {{ item.redeemable.points }} points</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-alert v-else>No redemption history available.</v-alert>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import userServices from '@/services/userServices';
  
  const props = defineProps({
    userId: {
      type: String,
      required: true
    }
  });
  
  const history = ref([]);
  
  onMounted(() => {
    loadRedemptionHistory();
  });
  
  function loadRedemptionHistory() {
    userServices.getStudentRedemptionHistory(props.userId)
      .then(response => {
        history.value = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
  </script>
  
  <style scoped></style>