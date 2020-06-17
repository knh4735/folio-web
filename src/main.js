import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArgonDashboard from "./plugins/argon-dashboard";

Vue.config.productionTip = false;
Vue.use(ArgonDashboard);

new Vue({
  router,
  store,
  render: h => h(App),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Folio";
      }
    }
  }
}).$mount("#app");
