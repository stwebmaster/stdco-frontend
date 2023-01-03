<script setup lang="ts">
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { required } from "@vee-validate/rules";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

const toast = useToast();
const form = ref();
const auth = useAuthStore();

defineRule("required", required);

const handleSubmit = async (values) => {
  try {
    await axios.put("/user/password", values);
    form.value.resetForm();
    toast.success("Password changed successfully.");
  } catch (err) {
    if (err.response?.status === 422) {
      form.value.setErrors(err.response.data.errors);
    } else {
      alert(err.response?.data?.message);
    }
  }
};
</script>

<template>
  <div class="pt-24 pb-5">
    <div class="mx-auto max-w-screen-sm rounded bg-slate-100 shadow-lg">
      <div class="mb-0 rounded-t bg-white px-6 py-6">
        <div>
          <h6 class="text-xl font-bold text-slate-700">Change Password</h6>
        </div>
      </div>

      <div class="p-6">
        <Form ref="form" @submit="handleSubmit">
          <input type="hidden" :value="auth.user.email" name="username" />

          <div class="relative mb-5 w-full">
            <label
              class="mb-2 block text-xs font-bold uppercase text-slate-600"
              for="current_password"
            >
              Current Password
            </label>
            <Field
              id="current_password"
              name="current_password"
              type="password"
              rules="required"
              class="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              placeholder="current password"
              autocomplete="current-password"
            />
            <ErrorMessage
              class="text-sm text-red-500"
              name="current_password"
            />
          </div>

          <div class="relative mb-5 w-full">
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
              placeholder="new password"
              autocomplete="new-password"
              class="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            />
            <ErrorMessage class="text-sm text-red-500" name="password" />
          </div>

          <div class="relative mb-5 w-full">
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
              placeholder="password confirmation"
              autocomplete="new-password"
              class="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            />
            <ErrorMessage
              class="text-sm text-red-500"
              name="password_confirmation"
            />
          </div>

          <div class="mt-8">
            <button
              class="mr-1 rounded bg-teal-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-teal-600 hover:shadow-md focus:outline-none active:bg-teal-600"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
