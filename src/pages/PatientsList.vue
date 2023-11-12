<template>

  <div class="row">


    <div class="submit-form">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by ID"
                 v-model="id"/>
          <div class="input-group-append">
            <button class="btn btn-icon" type="button"
                    @click="searchID"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <paper-table
            type="hover"
            :title="table1.title"
            :sub-title="table1.subTitle"
            :data="table1.data"
            :columns="table1.columns"
          >
          </paper-table>
        </div>
      </card>
    </div>

  </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Name", "Salary", "Country", "City"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 6,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 7,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 8,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 9,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 10,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 11,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 12,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 13,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 14,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 15,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 16,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 17,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 18,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 19,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 20,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
];

import DataService from "../services/DataService";
import HapiService from "../services/HapiService";

export default {
  name: "patients-list",
  components: {
    PaperTable,
  },
  data() {
    return {
      documents: [],
      currentDocument: null,
      currentIndex: -1,
      title: "",
      id: "",
      table1: {
        title: "Patients Table",
        subTitle: "",
        columns: [...tableColumns],
        data: [...tableData],
      }
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

    searchID() {
      HapiService.getPatientWithID(this.id)
        .then(response => {
          //this.document.id = response.data.id;
          console.log( "====HapiService.getPatientWithID() BEGIN ====");
          console.log(response);
          console.log( "------------" );
          console.log(response.data);
          console.log( "====HapiService.getPatientWithID() END ====");
          //this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    testPatietnts() {
      HapiService.getPatient()
        .then(response => {
          //this.document.id = response.data.id;
          console.log( "====HapiService.getPatient() BEGIN ====");
          console.log(response);
          console.log( "------------" );
          console.log(response.data);
          console.log( "====HapiService.getPatient() END ====");
          //this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });


      HapiService.getPatientEntity()
        .then(response => {
          //this.document.id = response.data.id;
          console.log( "====HapiService.getPatientEntity() BEGIN ====");
          console.log(response);
          console.log( "------------" );
          console.log(response.data);
          console.log( "====HapiService.getPatientEntity() END ====");
          //this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });

      HapiService.getPatientWithID(34596971)
        .then(response => {
          //this.document.id = response.data.id;
          console.log( "====HapiService.getPatientWithID() BEGIN ====");
          console.log(response);
          console.log( "------------" );
          console.log(response.data);
          console.log( "====HapiService.getPatientWithID() END ====");
          //this.submitted = true;
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
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 10px;
    border: 5px none;
    text-align: left;
  }

  .input-group {
    width: 60%;
  }

</style>
