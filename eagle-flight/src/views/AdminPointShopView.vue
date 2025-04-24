<template>
    <v-container fluid class="d-flex flex-column align-center">
        <v-card style="padding: 10px; margin: 10px;" color="transparent" variant="flat">
            <v-row class="d-flex justify-center align-center">
                <v-card-title style="font-size: 140%;">Manage Point Shop Items</v-card-title>
            </v-row>
        </v-card>

        <v-card height="500px" width="1100px">
            <v-card-title class="bg-primary text-white d-flex justify-center align-center" style="height: 40px;">
                All Rewards
            </v-card-title>

            <v-container fluid style="height: 400px; overflow-y: auto;">
                <v-row class="ma-0">
                    <v-col v-for="item in pointShopItems" :key="item.id" cols="12" sm="6" md="4" lg="3"
                        class="pa-2 d-flex justify-center">
                        <RedeemableCard :item="item" @edit="handleEdit(item)" @delete="handleDelete(item)" />
                    </v-col>
                </v-row>
            </v-container>
            <v-card width="100%" height="60px" color="primary" class="d-flex justify-center align-center">
                <v-btn color="white" @click="createRedeemableDialog = true" variant="text" size="large" width="60%">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card>
        </v-card>

        <v-dialog v-model="editRedeemableDialog" max-width="600">
            <v-card>
                <v-card-title class="headline">Edit Redeemable Item</v-card-title>
                <v-card-text>
                    <v-form v-model="formValid">
                        <v-text-field v-model="editedRedeemable.name" label="Item Name" required></v-text-field>
                        <v-text-field v-model="editedRedeemable.points" label="Points Required" type="number"
                            required></v-text-field>
                        <v-text-field v-model="editedRedeemable.description" label="Description"
                            required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="editRedeemableDialog = false">Cancel</v-btn>
                    <v-btn color="primary" :disabled="!formValid" @click="updateRedeemableItem">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="createRedeemableDialog" max-width="600">
            <v-card>
                <v-card-title class="headline">Create Redeemable Item</v-card-title>
                <v-card-text>
                    <v-form v-model="formValid">
                        <v-text-field v-model="newRedeemable.name" label="Item Name" required></v-text-field>
                        <v-text-field v-model="newRedeemable.points" label="Points Required" type="number"
                            required></v-text-field>
                        <v-text-field v-model="newRedeemable.description" label="Description"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="closeCreateRedeemableDialog">Cancel</v-btn>
                    <v-btn color="primary" :disabled="!formValid" @click="createRedeemableItem">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width="400" height="200" v-model="deleteRedeemableDialog">
            <v-card class="d-flex justify-center align-center">
                <v-card-title>Are you sure you want to delete this item?</v-card-title>
                <v-btn @click="deleteItem(currentItemToDelete.id)" width="100%" size="large">Yes</v-btn>
                <v-btn @click="deleteRedeemableDialog = false" width="100%" size="large">No</v-btn>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Utils from '@/config/utils';
import redeemableServices from '@/services/eagle-flight/redeemableServices';

const user = Utils.getStore("user");

const pointShopItems = ref([]);

const createRedeemableDialog = ref(false);
const newRedeemable = ref({
    name: '',
    description: '',
    points: 0,
});

const editRedeemableDialog = ref(false);
const editedRedeemable = ref({
    id: null,
    name: '',
    points: 0,
});
const handleEdit = (item) => {
    editedRedeemable.value = item;
    editRedeemableDialog.value = true;
};

const currentItemToDelete = ref(null);
const deleteRedeemableDialog = ref(false);
const handleDelete = (item) => {
    deleteRedeemableDialog.value = true;
    currentItemToDelete.value = item;
};

const formValid = ref(false);

function loadItems() {
    redeemableServices.getAll()
        .then(response => {
            pointShopItems.value = response.data;
        })
        .catch(error => {
            console.error("Error fetching items:", error);
        });
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
            deleteRedeemableDialog.value = false;
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
});
</script>

<style scoped></style>