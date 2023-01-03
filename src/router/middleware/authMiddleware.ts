import { useAuthStore } from "@/stores/auth";

export default async (to: any, from: any, next: any) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) await auth.getUserInfo();

  let exceptionalRoutes = [
    "login",
    "register",
    "forgot-password",
    "reset-password",
  ];
  let isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name);

  /**
   * IF THE USER IS NOT LOGGED IN
   */
  if (!auth.isLoggedIn) {
    if (isGoingExceptionalRoutes) {
      next(); // The user is not logged in but it's going to exceptional routes ? fine
      return;
    } else {
      next({ name: "login" });
      return;
    } // other routes than exceptional paths => /login
  }

  /**
   * IF THE USER IS LOGGED IN
   */
  if (auth.isLoggedIn && isGoingExceptionalRoutes) {
    next({ name: "home", query: { "redirect-reason": "already logged" } });
  } else {
    next();
  }
};
