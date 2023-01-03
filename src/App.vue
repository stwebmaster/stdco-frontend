<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const route = useRoute();
</script>

<template>
  <component :is="route.meta.layout || DashboardLayout">
    <RouterView />
  </component>
</template>
