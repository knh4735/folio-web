import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import store from "../store";
import API from "../lib/api";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "tables",
      component: DashboardLayout,
      children: [
        {
          path: "/icons",
          name: "icons",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Icons.vue")
        },
        {
          path: "/profile",
          name: "profile",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/UserProfile.vue")
        },
        {
          path: "/tables",
          name: "tables",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Tables.vue")
        },
        {
          path: "/careers",
          name: "careers",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Careers.vue")
        },
        {
          path: "/skills",
          name: "skills",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Skills.vue")
        }
      ]
    },
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Login.vue")
        },
        {
          path: "/logout",
          name: "logout",
          beforeEnter: (to, from, next) => {
            store.commit("destroySession");
            localStorage.removeItem("user");
            alert("ㅂㅂ");
            next("/login");
          }
        },
        {
          path: "/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Register.vue")
        }
      ]
    }
  ]
});

const hasValidToken = async (isToLogin = false) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.expiresAt > new Date()) {
      if (!isToLogin) alert("로그인 필요");
      return false;
    }

    const { user } = await API.create()
      .post()
      .url(`/users/profile`)
      .headers({ Authorization: storedUser.token })
      .build();

    store.commit("createSession", user);

    return true;
  } catch (error) {
    store.commit("destroySession");
    localStorage.removeItem("user");
    return false;
  }
};

// 인증
router.beforeEach(async (to, from, next) => {
  if (to.name === "login" || to.name === "register") {
    if (from.name === "login" || from.name === "register") return next();

    if (store.state.user || (await hasValidToken(true))) {
      alert("이미 로그인데스");
      return next(from);
    }

    return next();
  }

  if (store.state.user || (await hasValidToken())) return next();

  return next("/login");
});

export default router;
