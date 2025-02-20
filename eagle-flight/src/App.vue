<template>
  <v-app>
      <v-layout>
        <router-view />
        <!-- Navigation Drawer -->
        <v-navigation-drawer class="drawer" v-model="drawer" :location="$vuetify.display.platform.win ? 'left' : 'bottom'"
        temporary>
          <v-list class="item">
            <v-list-item @click="navigate('')">Home</v-list-item>
            <v-list-item @click="navigate('account-information')">Account Information</v-list-item>
            <v-list-item @click="navigate('')">Personality Test</v-list-item>
            <v-list-item @click="navigate('')">Schedule a Meeting</v-list-item>
            <v-list-item @click="navigate('')">Resume Builder</v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>    
    <!-- App Bar -->
    <v-app-bar color="primary" dark>
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

  </v-app>
</template>

<script>
import { ref } from 'vue'
import Utils from './config/utils'
import userServices from './services/userServices';

export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(`/${route}`);
    },
    updateUser(user) {
      this.user = user;
      this.isLoggedIn = true;
    },
  }
}

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
</style>