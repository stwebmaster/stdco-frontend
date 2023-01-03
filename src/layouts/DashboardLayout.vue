<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div>
    <Sidebar />
    <div class="relative min-h-screen bg-slate-100 md:ml-64">
      <slot></slot>
    </div>
  </div>
</template>
