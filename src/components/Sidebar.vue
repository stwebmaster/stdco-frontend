<script setup lang="ts">
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  LockClosedIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/vue/24/solid";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const auth = useAuthStore();
const router = useRouter();
const showMenu = ref(false);

const logout = async () => {
  const result = confirm("Are you sure you wanrt to log out?");
  if (result) {
    await auth.logout();
    router.push({ name: "login" });
  }
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <nav
    class="relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto"
  >
    <div
      class="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch"
    >
      <button class="rounded-md border p-1 md:hidden" @click="showMenu = true">
        <Bars3Icon class="w-8 text-slate-600" />
      </button>
      <div
        :class="{ block: showMenu, hidden: !showMenu }"
        class="absolute top-0 left-0 right-0 z-40 mx-2 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded bg-white p-5 shadow md:relative md:mx-0 md:mt-4 md:flex md:flex-col md:items-stretch md:p-0 md:opacity-100 md:shadow-none"
      >
        <div class="md:hidden">
          <button
            class="rounded-md border p-1 md:hidden"
            @click="showMenu = false"
          >
            <XMarkIcon class="w-8 text-slate-600" />
          </button>
        </div>

        <img src="@/assets/logo.svg" class="mx-auto w-24" />

        <div
          class="mt-4 flex items-center rounded-lg border p-1 text-sm uppercase text-slate-500"
        >
          <span class="mr-2 rounded-full bg-slate-100 p-3">
            <UserIcon class="h-5 w-5" />
          </span>
          {{ auth?.user?.name }}
        </div>

        <hr class="my-4 md:min-w-full" />

        <h6
          class="block pt-1 pb-4 text-xs font-bold uppercase text-slate-500 no-underline md:min-w-full"
        >
          Profile Actions
        </h6>
        <ul class="flex list-none flex-col md:min-w-full md:flex-col">
          <li class="items-center">
            <RouterLink
              to="/"
              class="flex items-center py-3 text-xs font-bold uppercase text-slate-700 hover:text-slate-500"
            >
              <HomeIcon class="mr-2 h-4 w-4 text-sm text-slate-300" />
              Dashboard
            </RouterLink>
          </li>
          <li class="items-center">
            <RouterLink
              to="/change-password"
              class="block flex items-center py-3 text-xs font-bold uppercase text-slate-700 hover:text-slate-500"
            >
              <LockClosedIcon class="mr-2 h-5 w-5 text-sm text-slate-300" />
              Change Password
            </RouterLink>
          </li>
          <li class="items-center">
            <RouterLink
              to="/profile"
              class="block flex items-center py-3 text-xs font-bold uppercase text-slate-700 hover:text-slate-500"
            >
              <UserIcon class="mr-2 h-5 w-5 text-sm text-slate-300" />
              Update Profile
            </RouterLink>
          </li>
          <li class="items-center">
            <a
              href="#"
              @click.prevent="logout"
              class="block flex items-center py-3 text-xs font-bold uppercase text-slate-700 hover:text-slate-500"
            >
              <ArrowLeftOnRectangleIcon
                class="mr-2 h-5 w-5 text-sm text-slate-300"
              />
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
