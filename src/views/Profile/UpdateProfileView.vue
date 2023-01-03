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

const handleSubmit = async (values: Object) => {
  try {
    await axios.put("user/profile-information", values);
    auth.getUserInfo();
    toast.success("Profile Updated.");
  } catch (err: any) {
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
          <h6 class="text-blueGray-700 text-xl font-bold">Profile</h6>
        </div>
      </div>

      <div class="p-6">
        <Form ref="form" @submit="handleSubmit">
          <input type="hidden" :value="auth?.user?.email" name="username" />

          <div class="relative mb-5 w-full">
            <label
              class="mb-2 block text-xs font-bold uppercase text-slate-600"
              for="name"
            >
              Full Name
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              rules="required"
              placeholder="Full Name"
              :value="auth?.user?.name"
              disabled
              class="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            />
            <ErrorMessage class="text-sm text-red-500" name="name" />
          </div>

          <div class="relative mb-5 w-full">
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
              rules="required"
              placeholder="Email"
              :value="auth?.user?.email"
              autocomplete="username"
              class="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            />
            <ErrorMessage class="text-sm text-red-500" name="email" />
          </div>

          <div class="mt-8">
            <button
              class="mr-1 rounded bg-emerald-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-emerald-600 hover:shadow-md focus:outline-none active:bg-emerald-600"
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
