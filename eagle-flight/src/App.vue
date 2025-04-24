<template>
  <v-app>
    <div class="background">
      <div class="overlay-layer"></div> <!-- overlay layer -->
      <v-app-bar color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="header-title">Eagle Flight</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!isLogged" variant="plain" to="/login">Login</v-btn>
        <v-btn v-else variant="plain" @click="logoutUser">Logout</v-btn>
        <div class="user-info">
          <template v-if="isLoggedIn">
            <!-- <div class="points-badge">
            <div>Points: {{ user.points }}</div>
            <div>Badge: {{ user.badge }}</div>
          </div> -->
            <v-text-field class="name-field" v-model="user.name" readonly></v-text-field>
            <v-avatar size="48">
              <img :src="user.avatar" alt="User avatar" />
            </v-avatar>
          </template>
        </div>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" :location="'left'">
        <v-list class="item">
          <v-list-item @click="navigate('')">Home</v-list-item>
          <v-list-item @click="navigate('account-information')">Account Information</v-list-item>
          <v-list-item @click="navigate('point-shop')">Point Shop</v-list-item>
          <v-list-item @click="navigate('')">Personality Test</v-list-item>
          <v-list-item @click="navigate('')">Schedule a Meeting</v-list-item>
          <v-list-item @click="navigate('')">Resume Builder</v-list-item>
          <v-list-item @click="navigate('events')">Events</v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Utils from './config/utils'
import userServices from './services/userServices';

const router = useRouter();
let drawer = ref(false); // Add this to control the drawer
let isLogged = ref(Utils.isLogged());
let user = Utils.getStore("user");
let isAdmin = ref(false);

if (user) {
  userServices.getUserForId(user.userId).then((res) => {
    isAdmin.value = res.data.isAdmin;
  }).catch((err) => {
    console.log(err);
  });
}

let logoutUser = () => {
  Utils.removeItem("user");
};

const navigate = (route) => {
  drawer.value = false; // Close drawer after navigation
  router.push(`/${route}`);
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.user-info {
  display: flex;
  align-items: center;
}

.points-badge {
  margin-right: 10px;
  color: white;
}

.name-field {
  width: 100px;
  margin-right: 10px;
}

.drawer {
  padding-top: 60px;
}

.item {
  border: 5px;
}

.background {
  position: relative;
  background-image: url('https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  overflow: hidden;
}

.overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 0;
}
</style>