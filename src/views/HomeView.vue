<script setup>
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
  <div class="max-w-screen-xl mx-auto pt-48">
    <Vue3Lottie :animation-data="ContainerShip" :width="200" class="-mb-10" />

    <div class="mt-14 text-center">
      <div class="mb-3 text-slate-600">
        Please Enter job number to get report
      </div>
      <input
        type="text"
        class="w-1/2 px-5 py-4 text-slate-700 rounded border-0 shadow text-lg placeholder-slate-300 transition hover:shadow-lg focus:ring-2 focus:ring-brand-blue"
        placeholder="Job Number"
        v-model="keyword"
        @keyup.enter="search"
      />

      <div class="mt-8">
        <button
          @click="search"
          class="px-5 py-3 rounded bg-brand-blue text-white text-sm shadow-md uppercase"
        >
          Get Report
        </button>
      </div>
    </div>
  </div>
</template>
