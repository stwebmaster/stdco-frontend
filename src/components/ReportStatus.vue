<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const props = defineProps(["status"]);
const status = ref(1);

// Waiting for Plan = 1
// In Transit = 2
// On the last Connection = 3
// Arrived = 4

const statusLabel: object = {
  "Waiting for Plan": 1,
  "In Transit": 2,
  "On the last Connection": 3,
  Arrived: 4,
};

// @ts-ignore
status.value = statusLabel[props.status];
</script>

<template>
  <div class="flex h-20 items-center border-b border-t px-3 md:px-0">
    <div class="relative flex max-h-full w-1/4 items-center">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            class="text-center text-xs font-bold text-brand-blue md:text-left md:text-base"
          >
            Waiting for Plan
          </div>
          <CheckIcon class="ml-2 hidden w-5 text-brand-blue md:block" />
        </div>
      </div>
      <img
        src="@/assets/img/right-chevron.webp"
        class="ml-auto hidden h-20 opacity-5 md:block"
        alt=""
      />
    </div>
    <div class="relative flex max-h-full w-1/4 items-center">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            class="text-xs md:text-base"
            :class="{
              'font-bold text-brand-blue': status >= 2,
              'text-slate-600': status < 2,
            }"
          >
            In Transit
          </div>
          <CheckIcon
            v-if="status >= 2"
            class="ml-2 hidden w-5 text-brand-blue md:block"
          />
        </div>
      </div>
      <img
        src="@/assets/img/right-chevron.webp"
        class="ml-auto hidden h-20 opacity-5 md:block"
        alt=""
      />
    </div>
    <div class="relative flex max-h-full w-1/4 items-center">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            class="text-xs md:text-base"
            :class="{
              'font-bold text-brand-blue': status >= 3,
              'text-slate-600': status < 3,
            }"
          >
            On the last Connection
          </div>
          <CheckIcon
            v-if="status >= 3"
            class="ml-2 hidden w-5 text-brand-blue md:block"
          />
        </div>
      </div>
      <img
        src="@/assets/img/right-chevron.webp"
        class="ml-auto hidden h-20 opacity-5 md:block"
        alt=""
      />
    </div>
    <div class="relative flex max-h-full w-1/4 items-center">
      <div class="flex-1">
        <div class="flex justify-center">
          <div
            class="text-xs md:text-base"
            :class="{
              'font-bold text-brand-blue': status >= 4,
              'text-slate-600': status < 4,
            }"
          >
            Arrived
          </div>
          <CheckIcon
            v-if="status >= 4"
            class="ml-2 hidden w-5 text-brand-blue md:block"
          />
        </div>
      </div>
    </div>
  </div>
</template>
