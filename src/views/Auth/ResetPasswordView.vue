<script setup lang="ts">
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { required } from "@vee-validate/rules";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const form = ref();
const isSubmitting = ref(false);

defineRule("required", required);

const handleSubmit = async (values) => {
  isSubmitting.value = true;

  try {
    const params = { token: route.query.token, ...values };
    await axios.post("/reset-password", params);
    await router.push({ name: "login" });

    isSubmitting.value = false;
  } catch (err) {
    isSubmitting.value = false;

    if (err.response?.status === 422) {
      form.value.setErrors(err.response.data.errors);
    } else {
      alert(err.response?.data?.message);
      throw err;
    }
  }
};
</script>

<template>
  <div class="mb-0 rounded-t px-6 py-6">
    <div class="mb-3 px-4 text-left">
      <h6 class="text-2xl font-bold text-slate-500">Reset Password</h6>
      <hr class="border-b-1 mt-3 border-slate-200" />
    </div>
  </div>
  <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
    <Form ref="form" @submit="handleSubmit">
      <div class="relative mb-6 w-full">
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
          placeholder="email"
          disabled
          :value="route.query.email"
          autocomplete="username"
          class="w-full rounded border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
        />
        <ErrorMessage class="text-sm text-red-500" name="email" />
      </div>

      <div class="relative mb-6 w-full">
        <label
          class="mb-2 block text-xs font-bold uppercase text-slate-600"
          for="password"
        >
          New Password
        </label>
        <Field
          id="password"
          name="password"
          type="password"
          rules="required"
          placeholder="Password"
          autocomplete="new-password"
          class="w-full rounded border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
        />
        <ErrorMessage class="text-sm text-red-500" name="password" />
      </div>

      <div class="relative mb-6 w-full">
        <label
          class="mb-2 block text-xs font-bold uppercase text-slate-600"
          for="password_confirmation"
        >
          Password Confirmation
        </label>
        <Field
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          rules="required"
          class="w-full rounded border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
          placeholder="Password Confirmation"
          autocomplete="new-password"
        />
        <ErrorMessage
          class="text-sm text-red-500"
          name="password_confirmation"
        />
      </div>

      <div class="mt-6 text-center">
        <button
          :class="{ 'opacity-50': isSubmitting }"
          class="mr-1 mb-1 w-full rounded bg-slate-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600"
          type="submit"
          :disabled="isSubmitting"
        >
          Reset Password
        </button>
      </div>
    </Form>
  </div>
</template>
