<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">
                    포트폴리오 목록
                  </h3>
                </div>
                <div class="col text-right">
                  <base-button type="primary" size="sm" @click="addItem"
                    >추가</base-button
                  >
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="tablesorter table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th v-for="column in displayColumns" :key="column">
                      {{ column }}
                    </th>
                  </tr>
                </thead>
                <tbody class="list">
                  <tr
                    v-for="(item, index) in tableData"
                    :key="index"
                    @click="link(item)"
                  >
                    <td>{{ item.title }}</td>
                    <td>{{ item.created_at }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";
import router from "@/router";

export default {
  name: "portfolio-list",
  data() {
    return {
      displayColumns: ["제목", "생성일자"],
      columns: ["title", "created_at"],
      tableData: [],
      isReady: false
    };
  },
  async mounted() {
    this.tableData = await this.loadData();
    this.isReady = true;
  },
  methods: {
    loadData: async () => {
      try {
        const { portfolios } = await API.create()
          .auth()
          .get()
          .url(`/portfolios`)
          .build();

        return portfolios;
      } catch (err) {
        alert(err.message);
      }
    },
    link(portfolio) {
      router.push(`/portfolios/${portfolio.id}`);
    },
    addItem() {
      alert("시룬뎁");
    }
  }
};
</script>
<style>
tbody.list tr {
  cursor: pointer;
}
</style>
