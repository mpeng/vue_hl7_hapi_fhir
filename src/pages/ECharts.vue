<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import VChart, { THEME_KEY } from 'vue-echarts';
  import { ref, defineComponent } from 'vue';

  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  ]);

  export default defineComponent({
    name: 'ECharts',
    components: {
      VChart,
    },
    provide: {
      [THEME_KEY]: 'default',
    },
    setup() {
      const option = ref({
        title: {
          text: 'Leading causes of death in U.S. 2021',
          left: 'center',
          textStyle: {
            color: '#c97526',
            fontSize: 16,
            fontWeight: 'normal',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          textStyle: {
            color: '#9cc106',
            fontSize: 11
          },
        },
        legend: {
          padding: 40,
          orient: 'vertical',
          left: 'left',
          data: ['Heart disease', 'Cancer', 'COVID-19', 'Accidents', 'Stroke',
            'Chronic lower respiratory diseases', 'Alzheimer’s disease',
            'Diabetes', 'Chronic liver disease and cirrhosis', 'Kidney disease' ],
        },
        series: [
          {
            name: 'Leading causes of death in U.S.',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 695547, name: 'Heart disease' },
              { value: 605213, name: 'Cancer' },
              { value: 416893, name: 'COVID-19' },
              { value: 224935, name: 'Accidents' },
              { value: 162890, name: 'Stroke' },
              { value: 142342, name: 'Chronic lower respiratory diseases' },
              { value: 119399, name: 'Alzheimer’s disease' },
              { value: 103294, name: 'Diabetes' },
              { value: 56585, name: 'Chronic liver disease and cirrhosis' },
              { value: 54358, name: 'Kidney disease' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });

      return { option };
    },
  });
</script>

<style scoped>
  .chart {
    height: 90vh;
    width: 90%;
  }
</style>
