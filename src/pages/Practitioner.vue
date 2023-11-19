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

    <label class="mt-3">Current Page: {{ currentPage }}</label>
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
    name: "Practitioner",
    data() {
      return {
        perPage: 10,
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
        console.log("getPatientsPagination is called");
        FhirService.getPatientsPagination(20, 0)
        //FhirService.getPatientsByBirthdayPageCount(200, 0)
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
                    last_name: `${ capitalizeFirstLetter(e.resource.name[0].family) }`,
                    first_name: `${ e.resource.name[0].given ? capitalizeFirstLetter(e.resource.name[0].given[0]) : "N.A." }`,
                    gender: `${ e.resource.gender ? capitalizeFirstLetter(e.resource.gender) : "N.A." }`,
                    birthday: `${ e.resource.birthDate ? moment(e.resource.birthDate).format(FORMAT) : "N.A." }`
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
