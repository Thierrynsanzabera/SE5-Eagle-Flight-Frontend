import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BuilderView from "../views/BuilderView.vue";
import LoginView from "../views/LoginView.vue";
import SavedResumeView from "@/views/SavedResumeView.vue";
import MyInfoView from "@/views/MyInfoView.vue";
import AdminView from "@/views/AdminView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: HomeView,
    },{
      path: "/adminView",
      name: "adminView",
      component: AdminView
    },
    {
      path: "/build",
      name: "build",
      component: BuilderView,
      props: true,
    },
    {
      path:"/build/saved/:id", 
      name: "saved",
      component: SavedResumeView,
      props: true,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: BuilderView,
      props: true,
    },
    {
      path: "/myInfo",
      name: "myInfo",
      component: MyInfoView,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

export default router;
