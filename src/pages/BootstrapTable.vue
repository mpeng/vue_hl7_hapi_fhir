<template>
  <div>
    <div>
      <b-table striped hover :items="items"></b-table>
    </div>

  </div>
</template>

<style>
  body {
    padding: 1rem;
  }
</style>

<script>

  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';

  export default {
    name: "BootstrapTable",
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        name: "BootstrapVue",
        show: true
      };
    },
    watch: {
      show(newVal) {
        console.log(`Alert is now ${newVal ? "visible" : "hidden"}`);
      }
    },
    methods: {
      toggle() {
        console.log("Toggle button clicked");
        this.show = !this.show;
      },
      dismissed() {
        console.log("Alert dismissed");
      }
    }
  };
</script>
