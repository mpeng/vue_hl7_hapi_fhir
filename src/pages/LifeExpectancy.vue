<script>
  import { use } from "echarts/core";
  import { ScatterChart } from "echarts/charts";
  import {
    GridComponent,
    TitleComponent,
    LegendComponent
  } from "echarts/components";
  import { shallowRef, defineComponent } from "vue";
  import VChart, { THEME_KEY } from 'vue-echarts';
  import getData from "./scatter";
  use([ScatterChart, GridComponent, TitleComponent, LegendComponent]);

  export default defineComponent({
    name: 'LifeExpectancy',
    components: {
      VChart,
    },
    data() {
      return {
        option: shallowRef(getData()),
      }
    },
  });
</script>

<template>
  <div class="chart-container">
    <v-chart :option="option" autoresize />
  </div>
</template>

<style scoped>
  .chart-container {
    position: relative;
    height: 60vh;
    width: 80%;
    overflow: hidden;
  }
</style>
