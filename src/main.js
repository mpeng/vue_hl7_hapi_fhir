import Vue from "vue";
import App from "./App";
import router from "./router/index";
import PaperDashboard from "./plugins/paperDashboard";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/app.scss';
import mixins from "./components/mixins";

Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.mixin(mixins);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
