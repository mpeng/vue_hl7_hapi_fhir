<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />

        <sidebar-link
          to="/patient-Tab-View"
          name="Patients"
          icon="ti-layout-tab-window"
        />

        <sidebar-link
          to="/organizations-list"
          name="Organizations"
          icon="ti-layout-grid4"
        />

        <sidebar-link
          to="/codeSystem"
          name="Code Systems"
          icon="ti-write"
        />

        <sidebar-link
          to="/observation"
          name="Observations"
          icon="ti-microphone-alt"
        />

        <sidebar-link
          to="/procedure"
          name="Procedures"
          icon="ti-layers-alt"
        />

        <sidebar-link
          to="/explanationOfBenefit"
          name="Explanation of Benefits"
          icon="ti-anchor"
        />

        <sidebar-link
          to="/practitioner"
          name="Practitioners"
          icon="ti-user"
        />

        <!--
        <sidebar-link
          to="/documents"
          name="Browse documents"
          icon="ti-files"
        />

        <sidebar-link
          to="/add"
          name="Add a document"
          icon="ti-jsfiddle"
        />
        <sidebar-link
          to="/chart"
          name="Charts"
          icon="ti-pie-chart"
        />
        <sidebar-link
          to="/lifeExpectancy"
          name="LifeExpectancy"
          icon="ti-bar-chart"
        />
        -->

      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">  </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret);

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
