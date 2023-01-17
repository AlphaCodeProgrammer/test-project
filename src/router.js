import { createRouter, createWebHistory } from "vue-router";
import store from "./store/store";

// routes file
import TheDashboard from "./components/TheDashboard.vue";
import SignUp from "./components/SignPage/SignUp";
import SignIn from "./components/SignPage/SignIn";
import PageNotFound from "./components/ReusableComponents/PageNotFound";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: TheDashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      component: SignUp,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/signin",
      component: SignIn,
      meta: {
        requiresGuest: true,
      },
    },
    { path: "/:pageNotFound(.*)", component: PageNotFound },
    // if there was not any page in url redirect to PageNotFound component
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  // if (to.meta.requiresAuth && !store.getters.didUserLoggedIn) {
  //   next("/signin");
  // } else if (to.meta.requiresAuth && store.getters.didUserLoggedIn) {
  //   next("/");
  // } else {
  //   next();
  // }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.didUserLoggedIn) {
      // Redirect to the Login Page
      next("/signin");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.didUserLoggedIn) {
      // Redirect to the Login Page
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
