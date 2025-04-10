<template>
  <v-container>
    <!-- Header -->
    <v-row justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <h1>Point Shop</h1>
      </v-col>
    </v-row>

    <!-- Total Points -->
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline text-center">
            My Points: {{ totalPoints }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Available Items -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline text-center">
            Available Rewards
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="item in pointShopItems" :key="item.id" cols="12" md="4">
                <v-card class="reward-item">
                  <v-card-title class="reward-title">{{ item.name }}</v-card-title>
                  <v-card-text>
                    <p>{{ item.points }} points</p>
                    <v-btn color="primary" @click="redeemItem(item)" :disabled="item.points > totalPoints">
                      Redeem
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Points History Button -->
    <v-row justify="center" class="mt-4">
      <v-btn color="secondary" @click="openHistoryDialog">View Redemption History</v-btn>
    </v-row>

    <!-- Redemption History Dialog -->
    <v-dialog v-model="historyDialog" max-width="800">
      <v-card>
        <v-card-title class="headline text-center">Redemption History</v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="(entry, index) in redemptionHistory" :key="index" cols="12" md="6">
              <v-card class="reward-item">
                <v-card-title>{{ entry.redeemableName }}</v-card-title>
                <v-card-text>
                  <p>{{ entry.redeemablePoints }} points</p>
                  <p>Redeemed on: {{ formatDate(entry.redeemDate) }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div v-if="!redemptionHistory.length">No redemption history available.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeHistoryDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Utils from '@/config/utils';
  import redeemableServices from '@/services/eagle-flight/redeemableServices';
  import studentServices from '@/services/eagle-flight/studentServices';
  import studentRedeemableServices from '@/services/eagle-flight/studentRedeemableServices';
  
  let user = Utils.getStore("user");
  let userId = user.userId;
  
  
  let pointShopItems = ref([]);  // List of available items for redemption
  let totalPoints = ref(0);      // Student's current total points
  let redemptionHistory = ref([]); // Redemption history for the student
  let historyDialog = ref(false); // Controls the visibility of the history dialog
 
  
  // Load current student points from the backend
  function loadStudentPoints() {
    studentServices.getForUserId(userId)
      .then(response => {
        totalPoints.value = response.data.points;
      })
      .catch(error => {
        console.error("Error fetching points:", error);
      });
  }
  
  function loadItems() {
  redeemableServices.getAll()
    .then(response => {
      pointShopItems.value = response.data;
    })
    .catch(error => {
      console.error("Error fetching items:", error);
    });
}

  // Redeem an item if the user has enough points
  function redeemItem(item) {
    if (totalPoints.value >= item.points) {
      const redeemData = {
        studentUserId: userId,
        redeemableId: item.id,
      };
  
      studentRedeemableServices.create(redeemData)
        .then(() => {
          totalPoints.value -= item.points;  // Subtract redeemed points
          alert(`You redeemed ${item.name} for ${item.points} points!`);
        })
        .catch(error => {
          console.error("Error redeeming item:", error);
        });
    } else {
      alert('Not enough points to redeem this item.');
    }
  }
  
  // Fetch redemption history
  function loadRedemptions() {
  studentRedeemableServices.getByStudent(userId)
    .then(response => {
      const redemptionData = response.data;
      redemptionHistory.value = [];

      redemptionData.forEach(entry => {
        redeemableServices.getOne(entry.redeemableId)
          .then(redeemableResponse => {
            const redeemableDetails = redeemableResponse.data;
            // Add redeemable item details to each redemption entry
            entry.redeemableName = redeemable.name;
            entry.redeemablePoints = redeemable.points;
            entry.redeemDate = entry.redeemDate;
            redemptionHistory.value.push(entry); // Add the entry to the history
          })
          .catch(error => {
            console.error("Error fetching redeemable details:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error fetching redemption history:", error);
    });
}



function openHistoryDialog() {
  loadRedemptions();
  historyDialog.value = true;
}

// Close the redemption history dialog
function closeHistoryDialog() {
  historyDialog.value = false;
}


  // Fetch the data when the component is mounted
  onMounted(() => {
    loadItems();  // Load the available rewards
    loadStudentPoints();  // Load the student's total points
  });
  </script>
  
  <style scoped>
  .mt-10 {
    margin-top: 5rem;
  }
  
  .headline {
    background-color: #800000;
    color: white;
    font-weight: bold;
  }
  
  .reward-item {
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
  }
  
  .reward-title {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
  }
  </style>
  