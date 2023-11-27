<template>
  <div>

    <div class="row">
      <div class="col-12">
        <ECharts />
      </div>
      <div class="col-12">
        <LifeExpectancy />
      </div>

    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import ECharts from './ECharts.vue';
import LifeExpectancy from './LifeExpectancy.vue';
import Chartist from "chartist";
export default {
  components: {
    StatsCard,
    ChartCard,
    ECharts,
    LifeExpectancy
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Capacity",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Revenue",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar",
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "11:00AM",
            "1:00PM",
            "3:00PM",
            "5:00PM",
            "7:00PM",
            "9:00PM",
            "11:00PM",
            "1:00AM",
            "3:00AM",
            "5:00AM",
            "7:00AM",
          ],
          series: [
            [487, 385, 490, 562, 594, 626, 698, 895, 952, 490, 562, 594, 626],
            [267, 152, 193, 240, 387, 435, 535, 642, 744, 152, 193, 240, 387],
            [123, 113, 67, 108, 190, 239, 307, 410, 410, 190, 239, 307, 410],
          ],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795],
            [330, 293, 180, 580, 303, 853, 600, 364, 698, 910, 236, 595],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6],
        },
        options: {},
      },
    };
  },
};
</script>
<style></style>
