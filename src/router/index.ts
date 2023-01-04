import { createRouter, createWebHistory } from "vue-router";
import authMiddleware from "@/router/middleware/authMiddleware";
import HomeView from "../views/HomeView.vue";
import ReportView from "@/views/ReportView.vue";
import ChangePasswordView from "@/views/Profile/ChangePasswordView.vue";
import UpdateProfileView from "@/views/Profile/UpdateProfileView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useMenuStore } from "@/stores/menu";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Dashboard",
      },
    },
    {
      path: "/report/:id",
      name: "report",
      component: ReportView,
      meta: {
        title: "Report",
      },
    },
    {
      path: "/change-password",
      name: "change-password",
      component: ChangePasswordView,
      meta: {
        title: "Change Password",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: UpdateProfileView,
      meta: {
        title: "Update Profile",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
        layout: AuthLayout,
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../views/Auth/ForgotPasswordView.vue"),
      meta: {
        title: "Forgot Password",
        layout: AuthLayout,
      },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("../views/Auth/ResetPasswordView.vue"),
      meta: {
        title: "Reset Password",
        layout: AuthLayout,
      },
    },
  ],
});

router.beforeEach(authMiddleware);

router.afterEach(() => {
  const menu = useMenuStore();
  menu.show = false;
});

export default router;
