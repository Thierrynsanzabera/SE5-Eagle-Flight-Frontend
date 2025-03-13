<template>
    <v-container>
        <!-- Header row -->
        <v-row justify="center" class="mt-10">
            <v-col cols="12" class="text-center">
                <h1>Point Shop</h1>
            </v-col>
        </v-row>

        <!-- Total Points Box -->
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="headline text-center">My Points : {{ totalPoints }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <!-- Add Item Form (Visible only for Admin) -->
        <v-row justify="center" v-if="adminView === 1">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="headline">Add New Item</v-card-title>
                    <v-card-text class="card-text-box">
                        <v-text-field v-model="newItem.name" label="Item Name"></v-text-field>
                        <v-text-field v-model.number="newItem.points" label="Points Required"
                            type="number"></v-text-field>
                        <v-btn color="success" @click="addItem">+ Add Item</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Point Shop Items -->
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="headline text-center">Available Rewards</v-card-title>
                    <v-card-text class="card-text-box">
                        <v-row>
                            <v-col v-for="item in pointShopItems" :key="item.id" cols="12" md="4">
                                <v-card class="reward-item">
                                    <v-card-title class="reward-title">
                                        {{ item.name }}
                                        <span class="admin-icons" v-if="adminView === 1">
                                            <v-icon color="warning" @click="openEditDialog(item)">mdi-pencil</v-icon>
                                            <v-icon color="red" @click="deleteItem(item.id)">mdi-close</v-icon>
                                        </span>
                                    </v-card-title>
                                    <v-card-text class="reward-title">
                                        <p>{{ item.points }} points</p>
                                        <v-btn color="primary" @click="redeemItem(item)"
                                            :disabled="item.points > totalPoints">Redeem</v-btn>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Edit Item Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">Edit Item</v-card-title>
                <v-card-text>
                    <v-text-field v-model="editItemData.name" label="Item Name"></v-text-field>
                    <v-text-field v-model.number="editItemData.points" label="Points Required"
                        type="number"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="green" @click="saveEdit">Save</v-btn>
                    <v-btn color="red" @click="editDialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'PointShop',
    data() {
        return {
            totalPoints: 100, // Example value, replace with dynamic data
            pointShopItems: [
                { id: 1, name: 'Item1', points: 50 },
                { id: 2, name: 'Item2', points: 30 },
                { id: 3, name: 'Item3', points: 20 }
            ],
            newItem: { name: '', points: null },
            adminView: 1, // Temporary variable to store admin view status
            editDialog: false,
            editItemData: { id: null, name: '', points: null }
        };
    },
    methods: {
        redeemItem(item) {
            if (this.totalPoints >= item.points) {
                this.totalPoints -= item.points;
                alert(`You redeemed ${item.name} for ${item.points} points!`);
            }
        },
        addItem() {
            if (this.newItem.name && this.newItem.points) {
                this.pointShopItems.push({
                    id: this.pointShopItems.length + 1,
                    name: this.newItem.name,
                    points: this.newItem.points
                });
                this.newItem.name = '';
                this.newItem.points = null;
            }
        },
        openEditDialog(item) {
            this.editItemData = { ...item };
            this.editDialog = true;
        },
        saveEdit() {
            let item = this.pointShopItems.find(i => i.id === this.editItemData.id);
            if (item) {
                item.name = this.editItemData.name;
                item.points = this.editItemData.points;
            }
            this.editDialog = false;
        },
        deleteItem(itemId) {
            this.pointShopItems = this.pointShopItems.filter(item => item.id !== itemId);
        }
    }
};
</script>

<style scoped>
.headline {
    background-color: #800000;
    color: white;
}

.mt-10 {
    margin-top: 10rem;
}

.card-text-box {
    background-color: lightgrey;
    padding: 1rem;
}

.reward-item {
    background-color: #f5f5f5;
    padding: 1rem;
    text-align: center;
    border-radius: 10px;
    position: relative;
}

.reward-title {
    color: black;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin-icons {
    display: flex;
    gap: 5px;
}
</style>
