<template>

  <div>
    <div class="inline">
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
        <div class="col-md-6">
          <ul class="list-group">
            <li class="list-group-item2"
                :class="{ active: index == currentIndex }"
                v-for="(name, index) in names"
                :key="index"
                @click="setActiveDocument(name, index)"
            >
              {{ name.given[0] }} {{ name.family }}
            </li>
          </ul>
        </div>
    </div>

  <div class="row">
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

    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <paper-table
            type="hover"
            :title="patientTable.title"
            :sub-title="patientTable.subTitle"
            :data="patientTable.data"
            :columns="patientTable.columns"
          >
          </paper-table>
        </div>
      </card>
    </div>
  </div>

    <button class="btn btn-icon" @click="getSelectedRows()">Get Selected Rows</button>
    <ag-grid-vue style="height: 500px;margin-top: 10px;"
                 class="ag-theme-alpine"
                 :columnDefs="columnDefs"
                 :rowData="rowData"
                 :autoGroupColumnDef="autoGroupColumnDef"
                 @grid-ready="onGridReady">
    </ag-grid-vue>

  </div>
</template>
<script>
import { PaperTable } from "@/components";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

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

const patientColumns = ["Id", "FamilyName", "GivenName", "FullUrl"];
let patientData = [
  {
    id: 592825,
    familyname: "Cushing",
    givenname: "Caleb",
    fullurl: "https://hapi.fhir.org/baseR4/Patient/592841",
  }];

import DataService from "../services/DataService";
import HapiService from "../services/HapiService";
import FhirService from "../services/FhirService";

export default {
  name: "patients-list",
  components: {
    PaperTable,
    AgGridVue,
  },

  beforeMount() {
    this.columnDefs = [
      { field: 'make', sortable: true, filter: true, checkboxSelection: true },
      { field: 'model', sortable: true, filter: true },
      { field: 'price', sortable: true, filter: true }
    ];

    /*
    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxster", price: 72000},
    ];
     */

    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  },
  data() {
    return {
      documents: [],
      names: [],
      message: "",
      currentDocument: null,
      currentIndex: -1,
      title: "",
      id: "",
      table1: {
        title: "Patients Table",
        subTitle: "",
        columns: [...tableColumns],
        data: [...tableData],
      },
      patientTable: {
        title: "Patients Table",
        subTitle: "Hello",
        columns: [...patientColumns],
        data: [...patientData],
      },
      columnDefs: null,
      rowData: null,
      gridApi: null,
      columnApi: null,
      rowSelection: 'multiple',
      autoGroupColumnDef: {
        headerName: 'Model',
        field: 'model',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true
        }
      }
    };
  },
  created() {
    this.rowSelection = 'multiple';
  },
  methods: {

    onGridReady(params) {
          this.gridApi = params.api;
          this.columnApi = params.columnApi;
    },
    getSelectedRows() {
          const selectedNodes = this.gridApi.getSelectedNodes();
          const selectedData = selectedNodes.map( node => node.data );
          const selectedDataStringPresentation = selectedData.map( data => `${data.make} ${data.model}`).join(', ');
          alert(`Selected nodes: ${selectedDataStringPresentation}`);
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

    searchID() {
      HapiService.getPatientWithID(this.id)
        .then(response => {
          //this.document.id = response.data.id;
          console.log("====HapiService.getPatientWithID() BEGIN ====");
          console.log(response);
          console.log("------------");
          console.log(response.data);
          if (response.data.status == 500) {
            this.message = response.data.data;
            console.log("Here1", this.message);
          } else if (response.status == 200) {
            this.names = response.data.name;
            console.log("Here2", this.names);
          }
          console.log( "-----Name Begin-------" );

          console.log( "-----Name End-------" );
          console.log( "====HapiService.getPatientWithID() END ====");
          //this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });




      FhirService.getPatients()
        .then(response => {
          //this.document.id = response.data.id;
          console.log("====FhirService.getPatients() BEGIN ====");

          console.log(response.data.data.entry.length);
          console.log(response.data.data.entry);
          console.log(response.data.data.entry[0].fullUrl);
          console.log(response.data.data.entry[0].resource.name[0].family);

          let entry = response.data.data.entry;
          let op = [];


          for (let i = 0; i < entry.length; i++) {
            let e = entry[i];
            if ( e.resource.name && e.resource.name.length > 0 ) {
              console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
              op.push(
                {id: `${e.resource.id}`,
                  familyname: `${ e.resource.name[0].family }`,
                  givenname: `${ e.resource.name[0].given[0] }`,
                  fullurl: `${ e.fullUrl }` }
              );
            }
          }

          patientData = op;

          console.log(op)
          console.log( "====FhirService.getPatients() END ====");
        })
        .catch(e => {
          console.log(e);
        });
    },


  },
  mounted() {
    this.retrieveDocuments();
  }
};
</script>
<style>
  @import "~ag-grid-community/styles/ag-grid.css";
  @import "~ag-grid-community/styles/ag-theme-alpine.css";

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

  .list-group-item2 {
    margin-top: 5px;
    margin-bottom: 15px;
    background-color: #000;
    position: relative;
    display: block;
    color: #fff;
    font-family: cursive;
    font-size: larger;
    padding: 0.75rem 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    text-align: center;
    border-radius: 10px;
  }
  .input-group {
    width: 60%;
  }
  .inline {
    display:inline-block;
  }

</style>
