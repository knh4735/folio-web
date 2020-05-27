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
                  <base-button type="primary" size="sm">추가</base-button>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="tablesorter table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <slot name="columns" :columns="displayColumns">
                      <th v-for="column in displayColumns" :key="column">
                        {{ column }}
                      </th>
                    </slot>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="list">
                  <tr
                    v-for="(item, index) in tableData"
                    :key="index"
                    @click="link(item.id)"
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
// import router from "@/router";

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
    link(id) {
      console.log(id);
      // router.push(`/portfolios/${id}`);
    }
  }
};
</script>
<style></style>
