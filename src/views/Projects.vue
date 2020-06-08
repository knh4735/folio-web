<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <list
            title="내 프로젝트"
            v-if="isReady"
            :columns="columns"
            :displayColumns="displayColumns"
            :tableData="tableData"
            :addItem="addItem"
            :saveItem="saveItem"
            :deleteItem="deleteItem"
            :validateInput="validateInput"
          >
            <template #default="{ item }">
              <td>{{ item.name }}</td>
              <td style=" white-space: pre-wrap;">
                {{ item.description }}
              </td>
            </template>
            <template #form="{ item }">
              <td>
                <base-input
                  v-model="item.name"
                  class="input-group-alternative"
                />
              </td>
              <td>
                <textarea
                  class="form-control form-control-alternative"
                  rows="5"
                  placeholder="프로젝트 상세설명"
                  v-model="item.description"
                ></textarea>
              </td>
            </template>
          </list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from "@/components/List";
import API from "@/lib/api";

export default {
  name: "projects",
  data() {
    return {
      displayColumns: ["이름", "설명"],
      columns: ["name", "description"],
      tableData: [],
      isReady: false
    };
  },
  async mounted() {
    this.tableData = await this.loadData();
    this.isReady = true;
  },
  methods: {
    loadData: async function() {
      try {
        const { projects } = await API.create()
          .auth()
          .get()
          .url(`/projects`)
          .build();
        return projects;
      } catch (err) {
        alert(err.message);
      }
    },
    addItem: async function(data) {
      try {
        const { project } = await API.create()
          .auth()
          .post()
          .url(`/projects`)
          .data(data)
          .build();

        this.tableData = [project].concat(this.tableData);

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    saveItem: async function(data) {
      try {
        const { project } = await API.create()
          .auth()
          .put()
          .url(`/projects/${data.id}`)
          .data(data)
          .build();

        this.tableData = this.tableData.map(item => {
          if (item.id !== project.id) return item;
          return project;
        });

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    deleteItem: async function(id) {
      try {
        await API.create()
          .auth()
          .delete()
          .url(`/projects/${id}`)
          .build();

        this.tableData = this.tableData.filter(item => item.id !== id);
      } catch (err) {
        alert(err.message);
      }
    },
    validateInput: function(data) {
      console.log(data);
      return true;
    }
  },
  components: {
    List
  }
};
</script>
<style></style>
