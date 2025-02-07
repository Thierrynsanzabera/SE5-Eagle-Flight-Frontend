<template>
  <v-app theme="customTheme">
    <v-main>
      <v-app-bar color="primary">
        <v-btn variant="plain" to="/">Home</v-btn>
        <v-btn variant="plain" to="/">Flight Plan</v-btn>
        <v-btn variant="plain" to="/">Resources</v-btn>
        <v-btn variant="plain" to="/">ResumeBuilder</v-btn>
        <v-btn v-if="isAdmin" variant="plain" to="/adminView">Admin View</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="!isLogged" variant="plain" to="/login">Login</v-btn>
        <v-btn v-else variant="plain" @click="logoutUser">Logout</v-btn>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Utils from './config/utils'
import userServices from './services/userServices';

let isLogged = ref(Utils.isLogged())
let user = Utils.getStore("user")
let isAdmin = ref(false)
if (user) {
  userServices.getUserForId(user.userId).then((res) => {
    isAdmin.value = res.data.isAdmin;
    console.log(res.data)
    console.log(isAdmin)
  }).catch((err) => {
    console.log(err)
  });
}
let logoutUser = () => {
  Utils.removeItem("user")
}

</script>
