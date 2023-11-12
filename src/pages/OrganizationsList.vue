<template>
  <div class="row">
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <paper-table
            type="hover"
            :title="table2.title"
            :sub-title="table2.subTitle"
            :data="table2.data"
            :columns="table2.columns"
          >
          </paper-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Organization", "Revenue", "Country", "City"];
const tableData = [
  {
    id: 1,
    organization: "Dakota Rice",
    revenue: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 2,
    organization: "Minerva Hooper",
    revenue: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 3,
    organization: "Sage Rodriguez",
    revenue: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 4,
    organization: "Philip Chaney",
    revenue: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 5,
    organization: "Doris Greene",
    revenue: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 6,
    organization: "Dakota Rice",
    revenue: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 7,
    organization: "Minerva Hooper",
    revenue: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 8,
    organization: "Sage Rodriguez",
    revenue: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 9,
    organization: "Philip Chaney",
    revenue: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 10,
    organization: "Doris Greene",
    revenue: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },

  {
    id: 11,
    organization: "Dakota Rice",
    revenue: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 12,
    organization: "Minerva Hooper",
    revenue: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 13,
    organization: "Sage Rodriguez",
    revenue: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 14,
    organization: "Philip Chaney",
    revenue: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 15,
    organization: "Doris Greene",
    revenue: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
  {
    id: 16,
    organization: "Dakota Rice",
    revenue: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 17,
    organization: "Minerva Hooper",
    revenue: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
  },
  {
    id: 18,
    organization: "Sage Rodriguez",
    revenue: "$56,142",
    country: "Netherlands",
    city: "Baileux",
  },
  {
    id: 19,
    organization: "Philip Chaney",
    revenue: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
  },
  {
    id: 20,
    organization: "Doris Greene",
    revenue: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
  },
];

export default {
  components: {
    PaperTable,
  },
  data() {
    return {

      table2: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
};
</script>
<style></style>
