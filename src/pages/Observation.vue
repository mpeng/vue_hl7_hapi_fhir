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

  function isNumber(string){
    if(typeof string === "string"){
      return(!isNaN(string));
    }
    return false;
  };


  export default {
    name: "Observation",
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
        const resourceType = JSON.stringify({
          "resourceType": "Observation",
          "count": 20,
          "offset": 0
        });
        console.log("getPatientsPagination is called with ", resourceType);
        FhirService.getListByResourceTypePage(resourceType)
          .then(response => {
            let entry = response.data.data.entry;
            let op = [];

            for (let i = 0; i < entry.length; i++) {
              let e = entry[i];
              console.log( e );
              if ( e.resource.id  ) {
                op.push(
                  { id: `${e.resource.id}`,
                    status: `${e.resource.status}`,
                    categorySystem: `${e.resource.category && e.resource.category.length > 0 ? e.resource.category[0].coding[0].system : ""}`,
                    categoryCode: `${e.resource.category && e.resource.category.length > 0 ? e.resource.category[0].coding[0].code : ""}`,
                    categoryDisplay: `${e.resource.category && e.resource.category.length > 0 ? e.resource.category[0].coding[0].display : ""}`,

                    codeSystem: `${e.resource.code && e.resource.code.coding && e.resource.code.coding.length > 0 ? e.resource.code.coding[0].system : ""}`,
                    codeCode: `${e.resource.code && e.resource.code.coding && e.resource.code.coding.length > 0 ? e.resource.code.coding[0].code : ""}`,
                    codeDisplay: `${e.resource.code && e.resource.code.coding && e.resource.code.coding.length > 0 ? e.resource.code.coding[0].display : ""}`

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
