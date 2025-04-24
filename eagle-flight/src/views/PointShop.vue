<template>
  <v-container fluid class="d-flex flex-column align-center">
    <v-card style="padding: 10px; margin: 10px;" color="transparent" variant="flat">
      <v-row class="d-flex justify-center align-center">
        <v-icon style="font-size: 160%;">mdi-basket</v-icon>
        <v-card-title style="font-size: 140%;">Point Shop</v-card-title>
      </v-row>
    </v-card>

    <v-card variant="outlined" class="mb-2">
      <v-card-title>
        My Points: {{ totalPoints }}
      </v-card-title>
    </v-card>
    <v-card height="500px" width="1100px">
      <v-card-title class="bg-primary text-white d-flex justify-center align-center" style="height: 40px;">
        All Rewards
      </v-card-title>

      <v-container fluid style="height: 400px; overflow-y: auto;">
        <v-row class="ma-0">
          <v-col v-for="item in pointShopItems" :key="item.id" cols="12" sm="6" md="4" lg="3"
            class="pa-2 d-flex justify-center">
            <RedeemableCardUser :item="item" :redeemable="false" @edit="handleEdit(item)" @delete="handleDelete(item)" />
          </v-col>
        </v-row>
      </v-container>
      <v-card width="100%" height="60px" color="primary" class="d-flex justify-center align-center">
        <v-btn color="white" @click="createRedeemableDialog = true" variant="text" size="large" width="60%">
          View Redemption History
        </v-btn>
      </v-card>
    </v-card>

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

        // 🔧 Set the flag locally so UI updates immediately
        const targetItem = pointShopItems.value.find(i => i.id === item.id);
        if (targetItem) {
          targetItem.isWaitingApproval = true;
        }
      })
      .catch(error => {
        console.error("Error redeeming item:", error);
      });
  } else {
    alert('Not enough points to redeem this item.');
  }
}

// Fetch redemption history
async function loadRedemptions() {
  try {
    const response = await studentRedeemableServices.getByStudent(userId);
    const redemptionData = response.data;

    // Wait for all redeemable lookups to complete
    const enrichedRedemptions = await Promise.all(
      redemptionData.map(async entry => {
        try {
          const redeemableResponse = await redeemableServices.getOne(entry.redeemableId);
          const redeemableDetails = redeemableResponse.data;

          // Update the "waiting for approval" flag
          const targetItem = pointShopItems.value.find(i => i.id === entry.redeemableId);
          if (targetItem && entry.isApproved === false) {
            targetItem.isWaitingApproval = true;
          }

          return {
            ...entry,
            redeemableName: redeemableDetails.name,
            redeemablePoints: redeemableDetails.points,
            redeemDate: entry.redeemDate,
          };
        } catch (err) {
          console.error("Error fetching redeemable details:", err);
          return entry;
        }
      })
    );

    redemptionHistory.value = enrichedRedemptions;
  } catch (error) {
    console.error("Error fetching redemption history:", error);
  }
}

function openHistoryDialog() {
  loadRedemptions();
  historyDialog.value = true;
}

// Close the redemption history dialog
function closeHistoryDialog() {
  historyDialog.value = false;
}

// Open the dialog to create a new redeemable item
function openCreateRedeemableDialog() {
  createRedeemableDialog.value = true;
}

// Close the dialog for creating a new redeemable item
function closeCreateRedeemableDialog() {
  createRedeemableDialog.value = false;
  newRedeemable.value = { name: '', points: 0 };  // Reset the form
}

// Open the dialog to edit a redeemable item
function openEditDialog(item) {
  editedRedeemable.value = { ...item };
  editRedeemableDialog.value = true;
}

// Close the edit dialog
function closeEditDialog() {
  editRedeemableDialog.value = false;
}

// Update an existing redeemable item (admin only)
function updateRedeemableItem() {
  redeemableServices.update(editedRedeemable.value.id, editedRedeemable.value)
    .then(() => {
      alert('Redeemable item updated successfully!');
      editRedeemableDialog.value = false;
      loadItems();  // Reload the available items
    })
    .catch(error => {
      console.error("Error updating redeemable item:", error);
    });
}

// Delete a redeemable item (admin only)
function deleteItem(itemId) {
  redeemableServices.delete(itemId)
    .then(() => {
      alert('Redeemable item deleted successfully!');
      loadItems();  // Reload the available items
    })
    .catch(error => {
      console.error("Error deleting redeemable item:", error);
    });
}

// Create a new redeemable item (admin only)
function createRedeemableItem() {
  if (newRedeemable.value.name && newRedeemable.value.points > 0) {
    redeemableServices.create(newRedeemable.value)
      .then(() => {
        alert('Redeemable item created successfully!');
        createRedeemableDialog.value = false;  // Close the dialog
        newRedeemable.value = { name: '', points: 0 };  // Reset the form
        loadItems();  // Reload the available items
      })
      .catch((error) => {
        console.error("Error creating redeemable item:", error);
      });
  } else {
    alert('Please fill in all fields correctly.');
  }
}

// Fetch the data when the component is mounted
onMounted(async () => {
  await loadItems();
  await loadRedemptions();
  loadStudentPoints();
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

.points-text {
  color: black;
  /* Change the color to black for the points text */
}
</style>
