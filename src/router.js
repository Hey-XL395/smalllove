import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/Land",
      name: "Land",
      component: () => import("./views/Land.vue")
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      // 重定向
      path: "/Home",
      redirect: "/"
    },
    {
      path: "/Published",
      name: "Published",
      component: () => import("./views/Published.vue")
    },
    {
      path: "/Statistics",
      name: "Statistics",
      component: () => import("./views/Statistics.vue")
    },
    {
      path: "/Push",
      name: "Push",
      component: () => import("./views/Push.vue")
    },
    {
      path: "/Label",
      name: "Label",
      component: () => import("./views/Label.vue")
    },
    {
      path: "/Export",
      name: "Export",
      component: () => import("./views/Export.vue")
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/Label",
      name: "Label",
      component: () => import("./views/Label.vue")
    },
    {
      path: "/PictureUpload",
      name: "PictureUpload",
      component: () => import("./views/PictureUpload.vue")
    },
    {
      path: "/SignOut",
      name: "SignOut",
      component: () => import("./views/SignOut.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === "/Land" || to.path === "/Register") {
    next();
  } else {
    if (localStorage.user) {
      next();
    } else {
      next({ path: "/Land" });
    }
  }
});
export default router;
