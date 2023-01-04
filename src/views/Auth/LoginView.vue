<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { email, required } from "@vee-validate/rules";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

let auth = useAuthStore();
const router = useRouter();
const toast = useToast();
const form = ref();
const isSubmitting = ref(false);

defineRule("required", required);
defineRule("email", email);

const handleSubmit = async (values: any) => {
  isSubmitting.value = true;
  try {
    await auth.login(values);
    isSubmitting.value = false;

    if (auth.redirectRoute) {
      await router.push(auth.redirectRoute);
      auth.redirectRoute = null;
    } else {
      await router.push({ name: "home" });
    }
  } catch (err: any) {
    isSubmitting.value = false;
    if (err.response?.status === 422) {
      form.value.setErrors(err.response.data.errors);
    } else {
      toast.error(err.response?.data?.message);
    }
  }
};
</script>

<template>
  <div class="mb-0 rounded-t px-6 py-6">
    <div class="mb-3 px-4 text-left">
      <h1 class="text-2xl font-bold text-slate-500">Sign in</h1>
      <hr class="mt-4 border-slate-200" />
    </div>
  </div>
  <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
    <Form ref="form" @submit="handleSubmit">
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
      <div class="relative mb-3 w-full">
        <div class="flex items-center justify-between">
          <label
            class="mb-2 block text-xs font-bold uppercase text-slate-600"
            for="password"
          >
            Password
          </label>
          <RouterLink to="/forgot-password" class="mb-2 text-sm text-sky-500">
            Forgot?
          </RouterLink>
        </div>
        <Field
          id="password"
          name="password"
          type="password"
          rules="required"
          class="w-full rounded border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
          placeholder="Password"
          autocomplete="current-password"
        />
        <ErrorMessage class="text-sm text-red-500" name="password" />
      </div>
      <div>
        <label class="inline-flex cursor-pointer items-center">
          <Field
            name="remember_me"
            :value="false"
            type="checkbox"
            class="form-checkbox ml-1 h-5 w-5 rounded border-0 bg-slate-200 text-slate-700 transition-all duration-150 ease-linear"
          />
          <span class="ml-2 text-sm font-semibold text-slate-600">
            Remember me
          </span>
        </label>
      </div>
      <div class="mt-6 text-center">
        <button
          :class="{ 'opacity-50': isSubmitting }"
          class="mr-1 mb-1 w-full rounded bg-brand-blue px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600"
          type="submit"
          :disabled="isSubmitting"
        >
          Sign In
        </button>
      </div>
    </Form>
  </div>
</template>
