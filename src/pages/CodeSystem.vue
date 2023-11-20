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
    name: "CodeSystem",
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
          "resourceType": "CodeSystem",
          "count": 100,
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
                //console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
                op.push(
                  {id: `${e.resource.id}`,
                    content: `${ e.resource.content }`,
                    code: `${ e.resource.concept ? e.resource.concept[0].code : "N.A." }`,
                    display: `${ e.resource.concept ? e.resource.concept[0].display : "N.A." }`,
                    definition: `${ e.resource.concept ? e.resource.concept[0].definition : "N.A." }`,

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
