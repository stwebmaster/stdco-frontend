<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { email, required } from "@vee-validate/rules";
import { ref } from "vue";

let auth = useAuthStore();
const form = ref();
const sentSuccessfully = ref(false);
const isSubmitting = ref(false);

defineRule("required", required);
defineRule("email", email);

const handleSubmit = async (values: object) => {
  isSubmitting.value = true;
  try {
    await auth.forgotPassword(values);
    sentSuccessfully.value = true;
    isSubmitting.value = false;
  } catch (err: any) {
    isSubmitting.value = false;
    if (err.response?.status === 422) {
      form.value.setErrors(err.response.data.errors);
    } else {
      alert(err.response?.data?.message);
    }
  }
};
</script>

<template>
  <div class="mb-0 rounded-t px-6 py-6">
    <div class="mb-3 px-4 text-left">
      <h1 class="text-2xl font-bold text-slate-500">Forgot Password</h1>
      <hr class="mt-3 border-slate-300" />
    </div>
  </div>
  <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
    <Form ref="form" @submit="handleSubmit">
      <div
        class="mb-5 rounded bg-teal-500 px-3 py-2 text-sm text-white"
        v-if="sentSuccessfully"
      >
        Reset link sent to your Email.
      </div>

      <div class="relative mb-8 w-full">
        <label
          class="mb-2 block text-xs font-bold uppercase text-slate-600"
          for="email"
        >
          Email
        </label>
        <Field
          id="email"
          name="email"
          type="email"
          rules="required|email"
          class="w-full rounded border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
          placeholder="Email"
          autocomplete="username"
        />
        <ErrorMessage class="text-sm text-red-500" name="email" />
      </div>

      <div class="mt-6 text-center">
        <button
          :class="{ 'opacity-50': isSubmitting }"
          class="mr-1 mb-1 w-full rounded bg-brand-blue px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600"
          type="submit"
          :disabled="isSubmitting"
        >
          Send Reset Link
        </button>
      </div>
    </Form>
  </div>
</template>
