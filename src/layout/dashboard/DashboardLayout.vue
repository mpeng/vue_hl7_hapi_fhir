<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!--
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />
        <sidebar-link to="/stats" name="User Profile" icon="ti-user" />
        -->

        <sidebar-link
          to="/patient-Tab-View"
          name="Patient Tab View"
          icon="ti-layout-tab-window"
        />

        <sidebar-link
          to="/organizations-list"
          name="Organizations"
          icon="ti-layout-grid4"
        />

        <sidebar-link
          to="/codeSystem"
          name="CodeSystem"
          icon="ti-shortcode"
        />

        <sidebar-link
          to="/observation"
          name="Observation"
          icon="ti-microphone-alt"
        />

        <sidebar-link
          to="/procedure"
          name="Procedure"
          icon=" ti-bell"
        />

        <sidebar-link
          to="/explanationOfBenefit"
          name="ExplanationOfBenefit"
          icon="ti-anchor"
        />

        <sidebar-link
          to="/practitioner"
          name="Practitioner"
          icon="ti-stamp"
        />

        <sidebar-link
          to="/documents"
          name="Browse documents"
          icon="ti-files"
        />

        <sidebar-link
          to="/add"
          name="Add a document"
          icon="ti-upload"
        />

        <sidebar-link
          to="/BootstrapTable"
          name="BootstrapTable"
          icon="ti-gallery"
        />

      </template>

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

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
