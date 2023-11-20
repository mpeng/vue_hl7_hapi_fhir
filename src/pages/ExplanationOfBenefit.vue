<template>
  <div class="overflow-auto">

    <div class="content">
      <vue-tabs-chrome  ref="tab" :minHiddenWidth="120" v-model="tab" :tabs="tabs"  @contextnav="handleClick" />

      <div class="tabStyle">
        <div v-if="this.whichTab == 'tab1'">
          <h6 class="space">{{this.tabLabel}}</h6>
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

      </div>
    </div>

    <b-table
      striped hover
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>

    <div class="same_line_even_space">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      size="sm"
    ></b-pagination>

      <label class="mt-3">Page: <strong class="pageIndex">{{ currentPage }}</strong></label>
    </div>

  </div>
</template>

<script>
  import { ref } from 'vue'
  import VueTabsChrome from 'vue-tabs-chrome';
  import FhirService from "../services/FhirService";
  import moment from "moment";

  const FORMAT = "MMM D, yyyy";

  function isNumber(string){
    if(typeof string === "string"){
      return(!isNaN(string));
    }
    return false;
  };


  export default {
    name: "ExplanationOfBenefit",
    components: {
      VueTabsChrome
    },
    data() {
      return {
        perPage: 12,
        currentPage: 1,
        items: [

        ],
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
    computed: {
      rows() {
        return this.items.length
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

      getAllPatients() {
        const resourceType = JSON.stringify({
          "resourceType": "ExplanationOfBenefit",
          "count": 50,
          "offset": 0
        });
        console.log("getPatientsPagination is called with ", resourceType);
        FhirService.getListByResourceTypePage(resourceType)
          .then(response => {
            let entry = response.data.data.entry;
            let op = [];

            for (let i = 0; i < entry.length; i++) {
              let e = entry[i];
              //console.log( e );
              if ( e.resource.contained && e.resource.contained.length > 0 ) {
                //console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
                op.push(
                  { id: `${e.resource.id}`,
                    resourceType: `${ this.capitalizeFirstLetter(e.resource.contained[0].resourceType) }`,
                    type: `${ this.capitalizeFirstLetter(e.resource.contained[0].id) }`,
                    status: `${ this.capitalizeFirstLetter(e.resource.contained[0].status) }`,
                    intent: `${ this.capitalizeFirstLetter(e.resource.contained[0].intent) }`
                  }
                );
              }
            }
            this.items = op;
          }).catch(e => {
          console.log(e);
          this.items = [];
        });
      },
    },
    mounted() {
      this.getAllPatients();
    },
  }
</script>

<style>
  .same_line_even_space {
    display: flex;
    justify-content: space-between;
  }
</style>
