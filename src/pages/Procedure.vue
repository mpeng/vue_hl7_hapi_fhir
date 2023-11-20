<template>
  <div class="overflow-auto">

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
    name: "Procedure",
    data() {
      return {
        perPage: 12,
        currentPage: 1,
        items: [

        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    },

    methods: {
      getAllPatients() {
        const resourceType = JSON.stringify({ "resourceType": "Procedure" });
        console.log("getPatientsPagination is called with ", resourceType);
        FhirService.getListByResourceType(resourceType)
          .then(response => {
            let entry = response.data.data.entry;
            let op = [];

            for (let i = 0; i < entry.length; i++) {
              let e = entry[i];
              console.log( e );
              if ( e.resource.id  ) {
                //console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
                op.push(
                  { id: `${e.resource.id}`,
                    status: `${e.resource.status}`,
                    code: `${e.resource.code.coding[0]}.code}`,
                    display: `${e.resource.code.coding[0]}.display}`
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

  .pageIndex {
    margin-top: 00px;
    color: green;
    font-size: 16px;
    font-weight: bolder;
    font-family: emoji;
  }
</style>
