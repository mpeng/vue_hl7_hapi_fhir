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
        </div>
        <div v-else-if="this.whichTab == 'tab3'">
          <h6 class="space">{{this.tabLabel}}</h6>
        </div>
        <div v-else-if="this.whichTab == 'tab4'">
          <h6 class="space">{{this.tabLabel}}</h6>
        </div>

      </div>
    </div>


  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="document.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="document.description"
          name="description"
        />
      </div>

      <button @click="saveDocument" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDocument">Add</button>
    </div>
  </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import HapiService from "../services/HapiService";
import { ref } from 'vue';

export default {
  name: "add-document",
  data() {
    return {
      document: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false,

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
        }
      ]
    };
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
    saveDocument() {
      var data = {
        title: this.document.title,
        description: this.document.description
      };

      DataService.create(data)
        .then(response => {
          this.document.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newDocument() {
      this.submitted = false;
      this.document = {};
    }
  }
};
</script>

<style>
.submit-form {
  min-width: 600px;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: 10px;
}

.form-group {
  width: 50%;
}

</style>
