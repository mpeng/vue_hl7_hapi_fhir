<template>



  <div class="submit-form">

    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-success" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <p />

      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(document, index) in documents"
          :key="index"
          @click="setActiveDocument(document, index)"
        >
          {{ document.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDocuments">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentDocument">
        <p />
        <div>
          <label><strong>Title: </strong>{{ currentDocument.title }}</label>
        </div>
        <div>
          <label><strong>Description: </strong>{{ currentDocument.description }}</label>
        </div>
        <div>
          <label><strong>Status: </strong> {{ currentDocument.published ? "Published" : "Pending" }}</label>
        </div>

        <router-link :to="'/documents/' + currentDocument.id" class="btn btn-info">Edit</router-link>
      </div>

    </div>
  </div>

</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "documents-list",
  data() {
    return {
      documents: [],
      currentDocument: null,
      currentIndex: -1,
      title: "",
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
    retrieveDocuments() {
      DataService.getAll()
        .then(response => {
          this.documents = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDocuments();
      this.currentDocument = null;
      this.currentIndex = -1;
    },

    setActiveDocument(document, index) {
      this.currentDocument = document;
      this.currentIndex = document ? index : -1;
    },

    removeAllDocuments() {
      DataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      DataService.findByTitle(this.title)
        .then(response => {
          this.documents = response.data;
          this.setActiveDocument(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveDocuments();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.submit-form {
  min-width: 600px;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: 10px;
  border: 5px none;
  text-align: left;
}

.input-group {
  width: 60%;
}

</style>
