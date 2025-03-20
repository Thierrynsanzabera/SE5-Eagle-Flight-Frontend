<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh">
    <v-card class="pa-6" width="400">
      <v-card-title class="text-center text-h5">Login</v-card-title>

      <!-- User Role Selection -->
      <div v-if="!userRole">
        <v-btn block color="primary" @click="selectUserRole('student')" class="mb-2">
          Student Login
        </v-btn>
        <v-btn block color="secondary" @click="selectUserRole('admin')">
          Admin Login
        </v-btn>
      </div>

      <!-- New Student Registration -->
      <div v-else-if="isNewStudent">
        <v-card-subtitle class="text-center">Complete Your Registration</v-card-subtitle>

        <v-text-field label="OC ID" v-model="studentInfo.ocID" outlined class="mb-2" />
        <v-text-field label="Enrollment Year" v-model="studentInfo.enrollmentYear" outlined class="mb-2" type="number" />

        <v-select
          label="Major"
          v-model="studentInfo.majorId"
          :items="majors"
          item-title="name"
          item-value="id"
          outlined
          class="mb-2"
        />

        <v-btn block color="success" @click="completeRegistration" :loading="loading">
          Submit & Continue
        </v-btn>
      </div>

      <!-- Google Social Login -->
      <div v-else>
        <SocialLogin @login-success="handleLoginSuccess" />
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import SocialLogin from "../components/SocialLogin.vue";

const router = useRouter();
const userRole = ref(null);
const isNewStudent = ref(false);
const loading = ref(false);
const userEmail = ref("");
const studentInfo = ref({
  ocID: "",
  enrollmentYear: "",
  majorId: null,
});
const majors = ref([]);

const selectUserRole = async (role) => {
  userRole.value = role;
};

// Fetch available majors from database
const fetchMajors = async () => {
  try {
    const response = await axios.get("/api/majors");
    majors.value = response.data;
  } catch (error) {
    console.error("Error fetching majors:", error);
  }
};

// Handle login success
const handleLoginSuccess = async () => {
  try {
    const response = await axios.get("/api/get-user");

    if (response.data) {
      userEmail.value = response.data.email;

      if (userRole.value === "student") {
        await checkStudentStatus(response.data.id);
      } else {
        router.push("/home"); // Admin logs in directly
      }
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
};

// Check if student exists in the database
const checkStudentStatus = async (userId) => {
  try {
    const response = await axios.get(`/api/check-student?userId=${userId}`);

    if (!response.data.exists) {
      isNewStudent.value = true;
      await fetchMajors(); // Fetch majors only if registration is needed
    } else {
      router.push("/home");
    }
  } catch (error) {
    console.error("Error checking student status:", error);
  }
};

// Complete student registration
const completeRegistration = async () => {
  try {
    loading.value = true;
    await axios.post("/api/register-student", {
      userId: userEmail.value, // Assuming userId is available from backend
      ocID: studentInfo.value.ocID,
      enrollmentYear: studentInfo.value.enrollmentYear,
      majorId: studentInfo.value.majorId,
    });

    router.push("/home");
  } catch (error) {
    console.error("Error registering student:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMajors();
});
</script>