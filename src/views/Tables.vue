<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table title="Light Table"></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from "./Tables/ProjectsTable";
import API from "@/lib/api";

export default {
  name: "tables",
  data: async function() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const data = await API.create()
      .headers({ Authorization: storedUser.token })
      .get()
      .url(`/portfolios`)
      .build();

    console.log(data);
    return data;
  },
  components: {
    ProjectsTable
  }
};
</script>
<style></style>
