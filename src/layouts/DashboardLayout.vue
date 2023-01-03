<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useAuthStore } from "@/stores/auth";
import Loading from "@/components/Loading.vue";

const auth = useAuthStore();
</script>

<template>
  <div v-if="auth.isLoggedIn">
    <Sidebar />
    <div class="relative min-h-screen bg-slate-100 md:ml-64">
      <slot></slot>
    </div>
  </div>
  <div v-else class="grid min-h-screen items-center justify-center">
    <Loading />
  </div>
</template>
