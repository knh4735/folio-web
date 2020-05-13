import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
// import Logout from '../views/Logout.vue'
import Register from "../views/Register.vue";
import store from "../store";
import API from "../lib/api";

Vue.use(VueRouter);

const logout = (to, from, next) => {
  store.commit("destroySession");
  alert("ㅂㅂ");
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    // component: Logout
    beforeEnter: logout
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 인증
router.beforeEach(async (to, from, next) => {
  if (to.name === "Login" || to.name === "Register") {
    if (store.state.user) {
      alert("이미 로그인데스");
      return next(from);
    }
    return next();
  }

  if (store.state.user) return next();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || storedUser.expiresAt > new Date()) {
    alert("로그인 필요");
    return next("/login");
  }

  try {
    const {
      data: {
        data: { user, session }
      }
    } = await API.create()
      .post()
      .url(`/sessions`)
      // .data({ token: storedUser.token })
      .data({
        username: "test123",
        password: "test1234"
      })
      .build();

    store.commit("createSession", { user, session });

    return next();
  } catch (error) {
    return next("/login");
  }
});

export default router;
