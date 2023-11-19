<template>

  <div>
    <div class="inline">
        <div class="submit-form">
          <div class="col-md-8">
            <div class="input-group mb-3 wider">
              <input type="text" class="form-control text-success" placeholder="Search by id or name"
                     v-model="id"/>
              <div class="input-group-append">
                <button class="btn btn-success" type="button"
                        @click="searchPatientByIDOrName"
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


    <!--
    <button class="btn btn-success" @click="getSelectedRows()">Get Selected Rows</button>
    -->
      <ag-grid-vue style="width: 100%; height: 520px;margin-top: 0px;"
                   class="ag-theme-alpine-dark"
                   :enableCellTextSelection="true"
                   :columnDefs="patientColumnDefs"
                   :rowData="patientRowData"
                   :defaultColDef="defaultColDef"
                   :getRowHeight="getRowHeight"
                   :isFullWidthRow="isFullWidthRow"
                   :fullWidthCellRenderer="fullWidthCellRenderer"
                   :autoGroupColumnDef="autoGroupColumnDef"
                   @grid-ready="onGridReady">
      </ag-grid-vue>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>

</template>
<script>


import { ref } from 'vue'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import FullWidthCellRenderer from './fullWidthCellRendererVue.js';
import '../assets/css/style.css';
import DataService from "../services/DataService";
import HapiService from "../services/HapiService";
import FhirService from "../services/FhirService";
import moment from "moment";

const FORMAT = "MMM D, yyyy";

function   capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function isNumber(string){
  if(typeof string === "string"){
    return(!isNaN(string));
  }
  return false;
};

export default {
  name: "PatientList",
  components: {

    AgGridVue,
  },



  beforeMount() {
    this.patientColumnDefs = [
      { field: 'id', sortable: true, filter: true, checkboxSelection: true, minWidth: 20 },
      { field: 'familyName', sortable: true, filter: true, minWidth: 140 },
      { field: 'givenName', sortable: true, filter: true, minWidth: 100 },
      { field: 'gender', sortable: true, filter: true, minWidth: 30 },
      { field: 'birthday', sortable: true, filter: true, minWidth: 130, }
    ];

    this.getAllPatients();

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

      patientColumnDefs: null,
      patientRowData: null,
      getRowHeight: null,
      isFullWidthRow: null,
      fullWidthCellRenderer: null,
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
      },
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
    this.patientRowData = getData();
    this.getRowHeight = (params) => {
      if (isFullWidth(params.data)) {
        return 100;
      }
    };
    this.isFullWidthRow = (params) => {
      return isFullWidth(params.rowNode.data);
    };
    this.fullWidthCellRenderer = 'FullWidthCellRenderer';

  },
  methods: {

    onKeyup(event) {
      /*
      console.log( "onKeyup" );
      if (event.key === "Enter") {
        this.text = this.draft + "";
        this.draft = "";
      } else {
        this.draft += event.key;
      }
       */
    },

    onKeyDown(e){
      //console.log( "onKeyDown" );
      // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        console.log( "Enter detected" );
        this.searchPatientByIDOrName();
      }
    },

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

    getAllPatients() {
      //FhirService.getPatients()
      //FhirService.getPatientsByBirthdayPage()
      FhirService.getPatientsPagination(20, 0)
        .then(response => {
          let entry = response.data.data.entry;
          let op = [];

          for (let i = 0; i < entry.length; i++) {
            let e = entry[i];
            //console.log( e );
            if ( e.resource.name && e.resource.name.length > 0 ) {
              //console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
              op.push(
                {id: `${e.resource.id}`,
                  familyName: `${ capitalizeFirstLetter(e.resource.name[0].family) }`,
                  givenName: `${ e.resource.name[0].given ? capitalizeFirstLetter(e.resource.name[0].given[0]) : "" }`,
                  gender: `${ e.resource.gender ? capitalizeFirstLetter(e.resource.gender) : "N.A." }`,
                  birthday: `${ e.resource.birthDate ? moment(e.resource.birthDate).format(FORMAT) : "N.A." }`
                }
              );
            }
          }
          this.patientRowData = op;
        }).catch(e => {
        console.log(e);
      });
    },

    searchPatientByIDOrName() {
      //console.log( this.id );
      if ( this.id && this.id.trim().length > 0 )
        isNumber(this.id) ? this.searchPatientByID() : this.searchPatientByName();
      else
        this.getAllPatients();
    },

    searchPatientByID() {
      HapiService.getPatientWithID(this.id)
        .then(response => {
          //console.log(response);
          let e = response.data;
          let op = [];

            //console.log( e );
            if ( e.name && e.name.length > 0 ) {
              //console.log(e.name[0].family, e.name[0].given[0]);
              op.push(
                {id: `${e.id}`,
                  familyName: `${ capitalizeFirstLetter(e.name[0].family) }`,
                  givenName: `${ capitalizeFirstLetter(e.name[0].given[0]) }`,
                  gender: `${ e.gender ? capitalizeFirstLetter(e.gender) : "N.A." }`,
                  birthday: `${ e.birthDate ? moment(e.birthDate).format(FORMAT) : "N.A." }`
                }
              );
            }

          this.patientRowData = op;
        }).catch(e => {
          console.log(e);
        });
    },


    searchPatientByName() {
      FhirService.getPatientByName(this.id)
        .then(response => {
          //console.log(response);
          let entry = response.data.data.entry;
          let op = [];

          for (let i = 0; i < entry.length; i++) {
            let e = entry[i];
            //console.log( e );
            if ( e.resource.name && e.resource.name.length > 0 ) {
              //console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
              op.push(
                {id: `${e.resource.id}`,
                  familyName: `${ capitalizeFirstLetter(e.resource.name[0].family) }`,
                  givenName: `${ capitalizeFirstLetter(e.resource.name[0].given[0]) }`,
                  gender: `${ e.resource.gender ? capitalizeFirstLetter(e.resource.gender) : "N.A." }`,
                  birthday: `${ e.resource.birthDate ? moment(e.resource.birthDate).format(FORMAT) : "N.A." }`
                }
              );
            }
          }
          this.patientRowData = op;
        }).catch(e => {
        console.log(e);
      });
    },
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyup);
    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyup);
    document.removeEventListener("keydown", this.onKeyDown);
  },
};

window.isFullWidth = function isFullWidth(data) {
  return true;
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
    width: 80%;
  }

  .input-group-append {
    margin-left: 10px;
  }

  .inline {
    display:inline-block;
  }

  ::placeholder {
    color: red;
    opacity: 1; /* Firefox */
  }

  ::-ms-input-placeholder { /* Edge 12 -18 */
    color: red;
  }

  .justify-content-end  {
    margin-top: 10px;
  }
</style>
