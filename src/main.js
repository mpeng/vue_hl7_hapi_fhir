import Vue from "vue";
import App from "./App";
import router from "./router/index";
import PaperDashboard from "./plugins/paperDashboard";

Vue.use(PaperDashboard);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
