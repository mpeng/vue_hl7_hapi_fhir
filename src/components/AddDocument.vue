<template>
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
</template>

<script>
import DataService from "../services/DataService";
import HapiService from "../services/HapiService";

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
      submitted: false
    };
  },
  methods: {
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
