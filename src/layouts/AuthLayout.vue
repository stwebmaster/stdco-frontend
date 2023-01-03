<template>
  <div class="bg-white min-h-screen">
    <div class="flex items-center">
      <div class="bg-auth flex-1 min-h-screen"></div>
      <div class="w-full max-w-xl">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.bg-auth {
  background: url("@/assets/img/bg.jpg");
  background-size: cover;
}
</style>
