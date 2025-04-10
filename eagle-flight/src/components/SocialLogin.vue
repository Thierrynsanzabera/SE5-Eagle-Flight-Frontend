<script setup>
import { ref, onMounted } from "vue";
import AuthServices from "../services/authServices";
import Utils from "../config/utils.js";
import { useRouter } from "vue-router";
import studentServices from "../services/eagle-flight/studentServices.js";

const router = useRouter();
const user = ref({});

const loginWithGoogle = () => {
  window.handleCredentialResponse = handleCredentialResponse;
  const client = import.meta.env.VITE_APP_CLIENT_ID;
  console.log(client);
  window.google.accounts.id.initialize({
    client_id: client,
    cancel_on_tap_outside: false,
    auto_select: true,
    callback: window.handleCredentialResponse,
  });
  window.google.accounts.id.renderButton(document.getElementById("parent_id"), {
    type: "standard",
    size: "large",
    text: "signup_with",
    width: 360,
  });
};

const handleCredentialResponse = async (response) => {
  let token = {
    credential: response.credential,
  };
  await AuthServices.loginUser(token)
    .then((response) => {
      user.value = response.data;
      Utils.setStore("user", user.value);
      let userId = user.value.userId;
      console.log("userId", userId);
      studentServices.checkIfStudentExists(userId).then((response) => {
        if (response == true)
          router.push({ name: "home" });
        else
          router.push({ name: "studentSetup" });
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

onMounted(() => {
  loginWithGoogle();
});
</script>

<template>
  <div style="color: black;">
    <v-row justify="center">
      <div id="parent_id"></div>
    </v-row>
  </div>
</template>