<template>
    <v-container>
      <v-card>
        <v-card-title>
          Manage User Roles
        </v-card-title>
  
        <!-- Manual header row -->
        <v-row class="px-4 pt-2 pb-1">
          <v-col cols="3"><strong>First Name</strong></v-col>
          <v-col cols="3"><strong>Last Name</strong></v-col>
          <v-col cols="3"><strong>Email</strong></v-col>
          <v-col cols="3"><strong>Role</strong></v-col>
        </v-row>
  
        <v-data-table
          :headers="headers"
          :items="users"
          item-key="id"
          class="elevation-1"
          hide-default-header
        >
          <template #item.roleId="{ item }">
            <v-select
              v-model="item.roleId"
              :items="roleOptions"
              item-text="label"
              item-value="id"
              :return-object="false"
              dense
              hide-details
              @change="newRoleId => onRoleChange(item, newRoleId)"
            />
          </template>
        </v-data-table>
      </v-card>
  
      <!-- simple snackbar for feedback -->
      <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
      >
        {{ snackbar.message }}
        <v-btn text @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import userServices from '@/services/userServices'; // adjust path as needed
  
  // reactive state
  const users = ref([]);
  const snackbar = ref({ show: false, message: '' });
  
  // table headers + select options
  const headers = [
    { text: 'First Name', value: 'fName' },
    { text: 'Last Name',  value: 'lName' },
    { text: 'Email',      value: 'email' },
    { text: 'Role',       value: 'roleId' },
  ];
  const roleOptions = [
    { label: 'Student', value: 1 },
    { label: 'Admin',   value: 2 },
  ];
  
  // load users on mount
  async function loadUsers() {
    try {
      const res = await userServices.getAll();
      users.value = res.data.map(u => ({
        ...u,
        // if backend sent roleId as object, extract the primitive
        roleId: typeof u.roleId === 'object' ? u.roleId.id : u.roleId
      }));
    } catch (err) {
      console.error('Failed loading users', err);
      snackbar.value = { show: true, message: 'Could not load users.' };
    }
  }
  
  // handle role change
  async function onRoleChange(user, newRoleId) {
    const newRoleLabel = roleOptions.find(r => r.value === newRoleId)?.label || newRoleId;
    try {
      // call your existing update() method
      await userServices.update(user.id, { roleId: newRoleId });
  
      // update local state so UI refreshes
      user.roleId = newRoleId;
  
      snackbar.value = { show: true, message: `${user.fName} is now a ${newRoleLabel}` };
    } catch (err) {
      console.error('Failed updating role', err);
      snackbar.value = { show: true, message: 'Error updating role. Reloading…' };
      await loadUsers();
    }
  }
  
  onMounted(loadUsers);
  </script>
  
  <style scoped>
  </style>