<script setup>
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/vue/24/solid";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  const result = confirm("Are you sure you wanrt to log out?");
  if (result) {
    await auth.logout();
    router.push({ name: "login" });
  }
};
</script>

<template>
  <nav
    class="relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto"
  >
    <div
      class="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch"
    >
      <div
        class="absolute top-0 left-0 right-0 z-40 hidden h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none"
      >
        <img src="@/assets/logo.svg" class="w-24 mx-auto" />

        <div
          class="mt-4 flex items-center text-sm uppercase text-slate-500 border p-1 rounded-lg"
        >
          <span class="mr-2 rounded-full bg-slate-100 p-3">
            <UserIcon class="h-5 w-5" />
          </span>
          {{ auth.user.name }}
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
