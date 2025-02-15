<template>
  <v-app>
    <router-view />

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-item @click="navigate('')">Home</v-list-item>
        <v-list-item @click="navigate('account-information')">Account Information</v-list-item>
        <v-list-item @click="navigate('')">Personality Test</v-list-item>
        <v-list-item @click="navigate('')">Schedule a Meeting</v-list-item>
        <v-list-item @click="navigate('')">Resume Builder</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="header-title">Eagle Flight</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="user-info">
        <template v-if="isLoggedIn">
          <div class="points-badge">
            <div>Points: {{ user.points }}</div>
            <div>Badge: {{ user.badge }}</div>
          </div>
          <v-text-field class="name-field" v-model="user.name" readonly></v-text-field>
          <v-avatar size="48">
            <img :src="user.avatar" alt="User avatar" />
          </v-avatar>
        </template>
        <v-btn v-else variant="plain" @click="navigate('login')">Login</v-btn>
      </div>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      isLoggedIn: false,
      user: {
        name: 'First Name',
        points: 0,
        badge: 'None',
        avatar: 'https://via.placeholder.com/48'
      }
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
    logout() {
      this.isLoggedIn = false;
      this.user = {
        name: 'First Name',
        points: 0,
        badge: 'None',
        avatar: 'https://via.placeholder.com/48'
      };
    }
  }
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
</style>