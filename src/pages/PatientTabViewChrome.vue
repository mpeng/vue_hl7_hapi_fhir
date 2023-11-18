<template>

  <div class="content">
    <vue-tabs-chrome  ref="tab" :minHiddenWidth="120" v-model="tab" :tabs="tabs"  />
    <div class="tabStyle">
      <PatientList />
    </div>
  </div>
</template>




<script>




  import Vue from 'vue'
  import VueTabsChrome from 'vue-tabs-chrome'
  import PatientList from './PatientsList.vue'

  export default {
    name: "patient-Tab-View-Chrome",
    components: {
      VueTabsChrome,
      PatientList
    },
    data() {
      return {
        tab: 'google',
        tabs: [
          {
            label: 'Health Information',
            key: 'tab1',
            closable: false,
            favicon: "ti-files"
          },
          {
            label: 'Grants & Funding',
            key: 'tab2',
            closable: false
          },
          {
            label: 'News & Events',
            key: 'tab3',
            closable: false
          },
          {
            label: 'Research & Training',
            key: 'tab4',
            closable: false
          },
          {
            label: 'Institutes',
            key: 'tab5',
            closable: false
          },
          {
            label: 'About Us',
            key: 'tab6',
            closable: false
          }
        ]
      }
    }
  }
</script>

<style>
  .tabStyle {
    margin-top: 30px;
  }
</style>
