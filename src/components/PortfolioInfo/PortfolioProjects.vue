<template>
  <portfolio-list
    title="Projects"
    :type="type"
    :level="level"
    :columns="columns"
    :displayColumns="displayColumns"
    :tableData="tableData"
    :loadCentralInfo="loadCentralInfo"
    :addItems="addItems"
    :saveItem="saveItem"
    :deleteItem="deleteItem"
    @add-complete="addComplete"
  >
    <template #default="{ item }">
      <td>{{ item.name }}</td>
      <td>{{ item.description }}</td>
    </template>
    <template #form="{ item }">
      <td>
        <base-input v-model="item.name" class="input-group-alternative" />
      </td>
      <td>
        <textarea
          class="form-control form-control-alternative"
          rows="5"
          placeholder="Write a large text here ..."
          v-model="item.description"
        ></textarea>
      </td>
    </template>
  </portfolio-list>
</template>
<script>
import API from "@/lib/api";
import PortfolioList from "@/components/PortfolioList.vue";

export default {
  name: "portfolio-projects",
  props: {
    portfolioId: {
      type: Number,
      description: "Portfolio ID"
    },
    type: {
      type: String,
      description: "view or add. 포폴 조회/수정에 사용되는지 추가에 사용되는지",
      default: "view"
    },
    level: {
      type: Number,
      description: "add 타입에서 상단 진행도에 표시할 단계"
    },
    tableData: {
      type: Array,
      description: "리스트에 표시할 데이터",
      default: () => []
    }
  },
  data() {
    return {
      displayColumns: ["이름", "설명"],
      columns: ["name", "description"]
    };
  },
  methods: {
    async loadCentralInfo() {
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
    async addItems(data) {
      try {
        const { projects } = await API.create()
          .auth()
          .post()
          .url(`/portfolios/${this.portfolioId}/projects`)
          .data({ projects: data })
          .build();

        this.$emit("update", {
          type: "projects",
          data: projects.concat(this.tableData)
        });

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    async saveItem(data) {
      try {
        const { project } = await API.create()
          .auth()
          .put()
          .url(`/portfolios/${this.portfolioId}/projects/${data.id}`)
          .data(data)
          .build();

        this.$emit("update", {
          type: "projects",
          data: this.tableData.map(item => {
            if (item.id !== project.id) return item;
            return project;
          })
        });
      } catch (err) {
        alert(err.message);
      }
    },
    async deleteItem(id) {
      try {
        await API.create()
          .auth()
          .delete()
          .url(`/portfolios/${this.portfolioId}/projects/${id}`)
          .build();

        this.$emit("update", {
          type: "projects",
          data: this.tableData.filter(item => item.id !== id)
        });
      } catch (err) {
        alert(err.message);
      }
    },
    addComplete() {
      this.$emit("add-complete");
    }
  },
  components: { PortfolioList }
};
</script>
<style></style>
