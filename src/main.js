import Vue from "vue";
import App from "./App";
import router from "./router/index";
import PaperDashboard from "./plugins/paperDashboard";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/app.scss';
import mixins from "./components/mixins";
import VueTabsChrome from 'vue-tabs-chrome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { faUserSecret, faUser, faEnvelope, faClock,
  faUserDoctor, faCalendarDays, faNotesMedical,
  faPeopleArrows, faPrescription, faKitMedical, faVirusCovid } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);
library.add(faUser);
library.add(faEnvelope);
library.add(faClock);
library.add(faUserDoctor);
library.add(faCalendarDays);
library.add(faNotesMedical);
library.add(faPeopleArrows);
library.add(faPrescription);
library.add(faKitMedical);
library.add(faVirusCovid);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueTabsChrome);
Vue.use(VueSidebarMenu);
Vue.mixin(mixins);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
