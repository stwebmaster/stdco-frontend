<script setup lang="ts">
import ContainerShip from "@/assets/Container_Ship_Final_Comp.json";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const keyword = ref();
const router = useRouter();
const route = useRoute();
const toast = useToast();

if (route.query.verified) {
  toast.success("Email verified successfully.");
}

const search = () => {
  if (!keyword.value || keyword.value === "") return;

  router.push({
    name: "report",
    params: {
      id: keyword.value,
    },
  });
};
</script>

<template>
  <div class="mx-auto max-w-screen-xl pt-48">
    <Vue3Lottie :animation-data="ContainerShip" :width="200" class="-mb-10" />

    <div class="mt-14 text-center">
      <div class="mb-3 text-slate-600">
        Please Enter job number to get report
      </div>
      <input
        type="text"
        class="mx-5 w-4/5 rounded border-0 px-5 py-4 text-lg text-slate-700 placeholder-slate-300 shadow transition hover:shadow-lg focus:ring-2 focus:ring-brand-blue md:mx-0 md:w-1/2"
        placeholder="Job Number"
        v-model="keyword"
        @keyup.enter="search"
      />

      <div class="mt-8">
        <button
          @click="search"
          class="rounded bg-brand-blue px-5 py-3 text-sm uppercase text-white shadow-md"
        >
          Get Report
        </button>
      </div>
    </div>
  </div>
</template>
