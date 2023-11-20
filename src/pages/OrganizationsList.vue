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
    name: "Practitioner",
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
          "resourceType": "Organization",
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
              if ( e.resource.name  ) {
                //console.log(entry[i].resource.name[0].family, entry[i].resource.name[0].given[0]);
                op.push(
                  {id: `${e.resource.id}`,
                    name: `${ this.capitalizeFirstLetter(e.resource.name) }`,
                    first_name: `${ e.resource.name[0].given ? this.capitalizeFirstLetter(e.resource.name[0].given[0]) : "N.A." }`,
                    address: `${ e.resource.address ?
                      ( e.resource.address[0].line ? e.resource.address[0].line[0] + " " : "" ) + e.resource.address[0].city + " " + e.resource.address[0].state
                      + " " + e.resource.address[0].postalCode : "N.A." }`,
                    phone: `${ e.resource.telecom ? e.resource.telecom[0].value : "N.A." }`,
                    fax: `${ e.resource.telecom && e.resource.telecom.length > 1 ? e.resource.telecom[1].value : "N.A." }`,
                    contact: `${ e.resource.contact ? e.resource.contact[0].name.family +
                      (e.resource.contact[0].name.given ? " " + e.resource.contact[0].name.given[0] : "" ) : "N.A." }`
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
