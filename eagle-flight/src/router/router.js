import { createRouter, createWebHistory } from "vue-router";

import TestPage from '../views/TestPage.vue';
import HomeView from "../views/HomeView.vue";
// import BuilderView from "../views/BuilderView.vue";
import LoginView from "../views/LoginView.vue";
// import SavedResumeView from "@/views/SavedResumeView.vue";
// import MyInfoView from "@/views/MyInfoView.vue";
// import AdminView from "@/views/AdminView.vue";
import AccountInformation from '../views/AccountInformation.vue';
import PointShop from '../views/PointShop.vue';
import StudentSetup from "@/views/StudentSetup.vue";
import EditPlanView from '../views/EditPlanView.vue';


const routes = [
  { path: '/', component: HomeView },
  { path: '/account-information', component: AccountInformation},
  { path: '/point-shop', component: PointShop},
  { path: '/login', component: LoginView},
  { path: '/student-setup', component:StudentSetup}
  { path: '/edit-plan', component: EditPlanView},
  { path: '/test', component: TestPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/",
//       alias: "/home",
//       name: "home",
//       component: HomeView,
//     },{
//       path: "/adminView",
//       name: "adminView",
//       component: AdminView
//     },
//     {
//       path: "/build",
//       name: "build",
//       component: BuilderView,
//       props: true,
//     },
//     {
//       path:"/build/saved/:id",
//       name: "saved",
//       component: SavedResumeView,
//       props: true,
//     },
//     {
//       path: "/edit/:id",
//       name: "edit",
//       component: BuilderView,
//       props: true,
//     },
//     {
//       path: "/myInfo",
//       name: "myInfo",
//       component: MyInfoView,
//       props: true,
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: LoginView,
//     },
//     {
//       path: '/account-information',
//       name: 'AccountInformation',
//       component: AccountInformation
//     }
//   ],
// });

// export default router;
