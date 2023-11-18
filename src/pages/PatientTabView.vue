<template>

  <div class="content">
    <vue-tabs-chrome  ref="tab" :minHiddenWidth="120" v-model="tab" :tabs="tabs"  @contextnav="handleClick" />

    <div class="tabStyle">
      <div v-if="this.whichTab == 'tab1'">
        <h6 class="space">{{this.tabLabel}}</h6>
        <PatientList />
      </div>
      <div v-else-if="this.whichTab == 'tab2'">
        <h6 class="space">{{this.tabLabel}}</h6>
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
  import OrganizationList from './OrganizationsList.vue';

  import { ref } from 'vue'

  export default {
    name: "patient-Tab-View",
    components: {
      VueTabsChrome,
      PatientList,
      OrganizationList
    },
    data() {
      return {
        awesome: ref(true),
        whichTab: ref('tab1'),
        tabLabel: ref('Home'),
        tab: 'google',
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

        let location = tab.url || ''

        if (!location) {
          return ''
        }

        if (!location.startsWith('http://') && !location.startsWith('https://')) {
          location = 'https://' + location
        }

        this.location = location
      }
    },

    methods: {
      addTab () {
        let item = 'tab' + Date.now()
        let newTabs = [
          {
            label: 'New Tab',
            key: item
          }
        ]
        this.$refs.tab.addTab(...newTabs)
        this.tab = item
        this.location = ''
      },
      removeTab () {
        this.$refs.tab.removeTab(this.tab)
      },
      handleClick (e, tab, i) {
        console.log(e, tab, i)
      },
      handleSearch () {
        let { location } = this
        let label = capitalize(location.split('.').slice(-2)[0])
        let favicon = ''
        if (location.includes('.')) {
          if (!location.startsWith('http://') && !location.startsWith('https://')) {
            location = 'https://' + location
          }
        } else {
          location = `https://www.bing.com/search?q=${encodeURIComponent(location)}`
          label = 'Bing'
          favicon = 'https://bing.com/favicon.ico'
        }

        if (!favicon) {
          favicon = location + '/favicon.ico'
        }

        let tab = this.getCurrTab()
        tab.label = label
        tab.url = location
        tab.favicon = favicon

        // this.tab = key
        this.$refs.location.blur()

        this.tabs.splice()
      },
      getCurrTab () {
        return this.tabs.find(item => item.key === this.tab)
      },
      handleNavClick (msg) {
        alert(msg)
      },
      handleCollection () {
        alert('😆')
      },
      handleMore () {
        alert('🤗')
      },
      handleFullscreen () {
        this.$refs.content.requestFullscreen()
      }
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
  }
</style>
