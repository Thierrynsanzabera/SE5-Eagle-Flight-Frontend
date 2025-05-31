<template>
  <v-app>
    <div class="background">
      <div class="overlay-layer"></div> <!-- overlay layer -->

      <v-app-bar color="primary" class="px-3" height="40">
        <div class="circle-button" @click="drawer = !drawer">
          <v-icon size="24">mdi-menu</v-icon>
        </div>
        <v-toolbar-title class="header-title" style="max-width: 150px;cursor: pointer;" @click="navigate('')">
          Eagle Flight
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn v-if="!isLogged" variant="plain" to="/login">Login</v-btn>
        <v-btn v-else variant="plain" @click="logoutUser">Logout</v-btn>

      </v-app-bar>

      <v-navigation-drawer temporary v-model="drawer" :location="'left'" class="auto-height-drawer" color="secondary">
        <v-list class="item">
          <v-list-item v-for="page in displayedPages" :key="page.path" @click="navigate(page.path)">
            {{ page.name }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container style="margin-top:40px;">
        <router-view />
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Utils from './config/utils'
import userServices from './services/userServices';

const pagesAdmin = [
  { name: "Manage Semesters", path: "manage-semesters" },
  { name: "Manage Flight Plans", path: "edit-plan" },
  { name: "View Submissions", path: "submissions" },
  { name: "Manage Point Shop", path: "point-shop" },
  { name: "Manage Events", path: "events" },
  { name: "Manage Users", path: "manage-users" },
  { name: "Manage Majors", path: "manage-majors" },
  { name: "Manage Badges", path: "manage-badges" },
  { name: "Manage Roles", path: "manage-roles"}
];

const pagesStudent = [
  { name: "Home", path: "" },
  { name: "Account Information", path: "account-information" },
  { name: "Point Shop", path: "point-shop" },
  { name: "Resume Builder", path: "" },
  { name: "Events", path: "events" },
  { name: "Manage Badges", path: "manage-badges" },
  { name: "Manage Majors", path: "manage-majors" }
];

const displayedPages = computed(() => (isAdmin.value ? pagesAdmin : pagesStudent));


const router = useRouter();
let drawer = ref(false); // Add this to control the drawer
let isLogged = ref(Utils.isLogged());
let user = Utils.getStore("user");
let isAdmin = ref(false);

if (user) {
  userServices.getUserForId(user.userId).then((res) => {
    isAdmin.value = res.data.roleId == 2 ? true : false;
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
.circle-button {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.circle-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.auto-height-drawer {
  max-height: 355px !important;
  top: 40px;
  /* match your app-bar height */
  border-radius: 0 0px 4px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.item {
  border: 5px;
}

.header-title {
  text-align: center;
  font-family: "Rajdhani", sans-serif;
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