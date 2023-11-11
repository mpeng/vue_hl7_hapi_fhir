<template>
  <div v-if="currentDocument" class="edit-form">
    <h4>Document</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentDocument.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentDocument.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDocument.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="btn btn-success"
      v-if="currentDocument.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="btn btn-success"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="btn btn-failure"
      @click="deleteDocument"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-info"
      @click="updateDocument"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Document</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "document",
  data() {
    return {
      currentDocument: null,
      message: ''
    };
  },
  methods: {
    getDocument(id) {
      DataService.get(id)
        .then(response => {
          this.currentDocument = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentDocument.id,
        title: this.currentDocument.title,
        description: this.currentDocument.description,
        published: status
      };

      DataService.update(this.currentDocument.id, data)
        .then(response => {
          console.log(response.data);
          this.currentDocument.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateDocument() {
      DataService.update(this.currentDocument.id, this.currentDocument)
        .then(response => {
          console.log(response.data);
          this.message = 'The document was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteDocument() {
      DataService.delete(this.currentDocument.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "documents" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getDocument(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  min-width: 600px;
  margin: auto;
}
.btn {
  margin-right: 10px;
}
</style>
