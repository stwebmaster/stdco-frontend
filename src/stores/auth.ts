import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      isLoggedIn: false,
      user: null,
      redirectRoute: null,
    };
  },

  actions: {
    async csrf() {
      await axios.get("/sanctum/csrf-cookie");
    },

    async getUserInfo() {
      try {
        const { data: userInfo } = await axios.get("/api/user");
        this.user = userInfo;
        this.isLoggedIn = true;
      } catch (e) {
        this.user = null;
        this.isLoggedIn = false;
      }
    },

    async logout() {
      await axios.post("/logout");
      this.user = null;
      this.isLoggedIn = false;
    },

    async login({ email, password }: any) {
      try {
        await this.csrf();
        const response = await axios.post("/login", { email, password });
        await this.getUserInfo();
        return response;
      } catch (error: any) {
        console.log("Error at login: ", error.message);
        throw error;
      }
    },

    async forgotPassword(email: string) {
      try {
        await this.csrf();
        return await axios.post("/forgot-password", email);
      } catch (error: any) {
        console.log("Error at forgot password: ", error.message);
        throw error;
      }
    },

    async register(fields: Object) {
      try {
        await this.csrf();
        const response = await axios.post("/register", fields);
        await this.getUserInfo();
        return response;
      } catch (error: any) {
        console.log("Error at register: ", error.message);
        throw error;
      }
    },
  },
});
