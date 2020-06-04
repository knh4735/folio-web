<template>
  <portfolio-list
    title="Skills"
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
      <td>
        <base-progress
          type="success"
          :value="item.level * 20"
          :showPercentage="false"
          :height="10"
          :label="`${item.level}`"
        ></base-progress>
      </td>
    </template>

    <template #form="{ item }">
      <td>
        <base-input
          v-model="item.name"
          placeholder="기술명을 입력해주세요"
          class="input-group-alternative"
        />
      </td>
      <td>
        <base-slider
          v-model="item.level"
          :range="{ min: 1, max: 5 }"
          :required="true"
          :options="{
            step: 1,
            format: {
              to: function(value) {
                return value;
              },
              from: function(value) {
                return value;
              }
            },
            tooltips: [true]
          }"
        >
        </base-slider>
      </td>
    </template>
  </portfolio-list>
</template>
<script>
import API from "@/lib/api";
import PortfolioList from "@/components/PortfolioList.vue";

export default {
  name: "portfolio-skills",
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
      displayColumns: ["이름", "숙련도"],
      columns: ["name", "level"]
    };
  },
  methods: {
    async loadCentralInfo() {
      try {
        const { skills } = await API.create()
          .auth()
          .get()
          .url(`/skills`)
          .build();

        return skills;
      } catch (err) {
        alert(err.message);
      }
    },
    async addItems(data) {
      const newData = data.map(datum => {
        return {
          ...datum,
          level: datum.level || 3
        };
      });

      try {
        const { skills } = await API.create()
          .auth()
          .post()
          .url(`/portfolios/${this.portfolioId}/skills`)
          .data({ skills: newData })
          .build();

        this.$emit("update", {
          type: "skills",
          data: skills.concat(this.tableData)
        });

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    async saveItem(data) {
      try {
        const { skill } = await API.create()
          .auth()
          .put()
          .url(`/portfolios/${this.portfolioId}/skills/${data.id}`)
          .data(data)
          .build();

        this.$emit("update", {
          type: "skills",
          data: this.tableData.map(item => {
            if (item.id !== skill.id) return item;
            return skill;
          })
        });

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    async deleteItem(id) {
      try {
        await API.create()
          .auth()
          .delete()
          .url(`/portfolios/${this.portfolioId}/skills/${id}`)
          .build();

        this.$emit("update", {
          type: "skills",
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
