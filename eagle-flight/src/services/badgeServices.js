// src/services/badgeServices.js
import { ref, onMounted } from 'vue';
import apiClient from "./services.js";

export function getBadges() {
  const badges = ref([]);
  const dialog = ref(false);
  const selectedBadge = ref({ name: '', description: '' });

  const fetchBadges = async () => {
    try {
      const response = await apiClient.get('http://localhost:3013/badge');
      badges.value = response.data;
      console.log("Fetched badges:", badges.value);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  onMounted(fetchBadges);

  const openBadgeDialog = (badge) => {
    selectedBadge.value = badge;
    dialog.value = true;
  };

  return {
    badges,
    dialog,
    selectedBadge,
    openBadgeDialog,
    fetchBadges,
  };
}