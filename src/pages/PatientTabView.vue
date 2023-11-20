<template>

  <div class="content">
    <vue-tabs-chrome  ref="tab" :minHiddenWidth="120" v-model="tab" :tabs="tabs"  @contextnav="handleClick" />

    <div class="tabStyle">
      <div v-if="this.whichTab == 'tab1'">
        <h6 class="space">{{this.tabLabel}}</h6>
        <Patient />
      </div>
      <div v-else-if="this.whichTab == 'tab2'">
        <h6 class="space">{{this.tabLabel}}</h6>
        <PatientList />
      </div>
      <div v-else-if="this.whichTab == 'tab3'">
        <h6 class="space">{{this.tabLabel}}</h6>
      </div>
      <div v-else-if="this.whichTab == 'tab4'">
        <h6 class="space">{{this.tabLabel}}</h6>
      </div>
      <div v-else-if="this.whichTab == 'tab5'">
        <h6 class="space">{{this.tabLabel}}</h6>
      </div>
      <div v-else>
        <h6 class="space">{{this.tabLabel}}</h6>
        <OrganizationList />
      </div>
    </div>
  </div>
</template>


<script>

  import Vue from 'vue';
  import VueTabsChrome from 'vue-tabs-chrome';
  import PatientList from './PatientsList.vue';
  import Practitioner from './Practitioner.vue';
  import Patient from './Patient.vue';
  import OrganizationList from './OrganizationsList.vue';

  import { ref } from 'vue'

  export default {
    name: "patient-Tab-View",
    components: {
      VueTabsChrome,
      PatientList,
      Practitioner,
      Patient,
      OrganizationList
    },
    data() {
      return {
        awesome: ref(true),
        whichTab: ref('tab1'),
        tabLabel: ref('Health Information'),
        tab: 'tab1',
        tabs: [
          {
            label: 'Health Information',
            key: 'tab1',
            closable: false
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
    },
    mounted () {
      this.tab = 'tab1'
    },
    computed: {
      url () {
        console.log( "url - Hello" );
        let currTab = this.tabs.find(item => item.key === this.tab)
        let url = ''
        if (currTab) {
          url = currTab.url || ''
        }
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url
        }
        return url
      }
    },
    watch: {
      tab () {
        console.log( "tab - Hello" );
        let tab = this.getCurrTab()
        console.log( "tab - Hello currentTab is ", tab, tab.key );
        this.whichTab = tab.key;
        this.tabLabel = tab.label;
        console.log( "current tab is ", this.whichTab, this.tabLabel );
      }
    },

    methods: {

      handleClick (e, tab, i) {
        console.log(e, tab, i)
      },

      getCurrTab () {
        return this.tabs.find(item => item.key === this.tab)
      },
    }
  }
</script>

<style>
  .tabStyle {
    margin-top: 30px;
  }

  .vue-tabs-chrome {
    padding-top: 10px;
    background-color: #f8f8f8;
    position: relative;
    color: #000;
    font-family: 'themify';
    font-size: 15px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .vue-tabs-chrome .tabs-footer {
    height: 0px;
    background-color: #dee2e6;
  }

  .space {
    margin-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
</style>
