<template>
  <div class="submit-form">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Documents List</h4>
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
        <h4>Document</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentDocument.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentDocument.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentDocument.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/documents/' + currentDocument.id" class="btn btn-info">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Document</p>
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
      title: ""
    };
  },
  methods: {
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
  margin-top: 100px;
  margin-bottom: 300px;
  border: 5px none;
  text-align: left;
}

</style>
