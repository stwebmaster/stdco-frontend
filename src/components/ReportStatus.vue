<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const props = defineProps(["status"]);
const status = ref(1);

// Waiting for Plan = 1
// In Transit = 2
// On the last Connection = 3
// Arrived = 4

const statusLabel = {
  "Waiting for Plan": 1,
  "In Transit": 2,
  "On the last Connection": 3,
  Arrived: 4,
};

status.value = statusLabel[props.status];
</script>

<template>
  <div class="flex items-center h-20 border-b border-t">
    <div class="flex items-center w-1/4 max-h-full relative">
      <div class="flex-1">
        <div class="flex justify-center">
          <div class="text-brand-blue font-bold">Waiting for Plan</div>
          <CheckIcon class="w-5 ml-2 text-brand-blue" />
        </div>
      </div>
      <img
        src="@/assets/img/right-chevron.webp"
        class="h-20 opacity-5 ml-auto"
        alt=""
      />
    </div>
    <div class="flex items-center w-1/4 max-h-full relative">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            :class="{
              'text-brand-blue font-bold': status >= 2,
              'text-slate-600': status < 2,
            }"
          >
            In Transit
          </div>
          <CheckIcon v-if="status >= 2" class="w-5 ml-2 text-brand-blue" />
        </div>
      </div>
      <img
        src="@/assets/img/right-chevron.webp"
        class="h-20 opacity-5 ml-auto"
        alt=""
      />
    </div>
    <div class="flex items-center w-1/4 max-h-full relative">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            :class="{
              'text-brand-blue font-bold': status >= 3,
              'text-slate-600': status < 3,
            }"
          >
            On the last Connection
          </div>
          <CheckIcon v-if="status >= 3" class="w-5 ml-2 text-brand-blue" />
        </div>
      </div>
      <img
        src="@/assets/img/right-chevron.webp"
        class="h-20 opacity-5 ml-auto"
        alt=""
      />
    </div>
    <div class="flex items-center w-1/4 max-h-full relative">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            :class="{
              'text-brand-blue font-bold': status >= 4,
              'text-slate-600': status < 4,
            }"
          >
            Arrived
          </div>
          <CheckIcon v-if="status >= 4" class="w-5 ml-2 text-brand-blue" />
        </div>
      </div>
    </div>
  </div>
</template>
