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
                    <p class="points-text">{{ item.points }} points</p>
                    <!-- Conditionally hide the Redeem button when adminView is true -->
                    <v-btn v-if="!adminView" color="primary" @click="redeemItem(item)" :disabled="item.points > totalPoints">
                      Redeem
                    </v-btn>

                    <!-- Admin Action Buttons (Edit/Delete) -->
                    <v-btn v-if="adminView" color="orange" @click="openEditDialog(item)">Edit</v-btn>
                    <v-btn v-if="adminView" color="red" @click="deleteItem(item.id)">Delete</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Redemption History Button (Visible for Admin and Students) -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8">
        <v-btn color="secondary" @click="openHistoryDialog">
          View Redemption History
        </v-btn>
      </v-col>
    </v-row>

    <!-- Admin Section - Only visible if adminView is true -->
    <v-row justify="center" class="mt-4" v-if="adminView">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline text-center">
            Admin Actions
          </v-card-title>
          <v-card-text>
            <v-btn color="primary" @click="openCreateRedeemableDialog">Create Redeemable Item</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Redeemable Item Dialog (Admin only) -->
    <v-dialog v-model="editRedeemableDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Edit Redeemable Item</v-card-title>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field v-model="editedRedeemable.name" label="Item Name" required></v-text-field>
            <v-text-field v-model="editedRedeemable.points" label="Points Required" type="number" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeEditDialog">Cancel</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="updateRedeemableItem">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Create Redeemable Item Dialog (Admin only) -->
    <v-dialog v-model="createRedeemableDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Create Redeemable Item</v-card-title>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field v-model="newRedeemable.name" label="Item Name" required></v-text-field>
            <v-text-field v-model="newRedeemable.points" label="Points Required" type="number" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeCreateRedeemableDialog">Cancel</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="createRedeemableItem">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

// Admin-specific dialog and form data
let adminView = ref(false);  // Manually set adminView to true (admin mode) or false (student mode)
let createRedeemableDialog = ref(false);
let newRedeemable = ref({
  name: '',
  points: 0,
});

let editRedeemableDialog = ref(false);
let editedRedeemable = ref({
  id: null,
  name: '',
  points: 0,
});

let formValid = ref(false);

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
            entry.redeemableName = redeemableDetails.name;
            entry.redeemablePoints = redeemableDetails.points;
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

.points-text {
  color: black;  /* Change the color to black for the points text */
}

</style>
