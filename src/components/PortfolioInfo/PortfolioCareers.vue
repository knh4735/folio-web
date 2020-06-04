<template>
  <portfolio-list
    title="Careers"
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
    <template #form="{ item }">
      <td>
        <base-input v-model="item.name" class="input-group-alternative" />
      </td>
      <td>
        <base-input class="input-group-alternative">
          <flat-picker
            v-model="item.start_date"
            slot-scope="{ focus, blur }"
            :config="{ allowInput: true, wrap: true }"
            class="form-control datepicker"
            @on-open="focus"
            @on-close="blur"
          />
        </base-input>
      </td>
      <td>
        <base-input class="input-group-alternative">
          <flat-picker
            v-model="item.end_date"
            slot-scope="{ focus, blur }"
            :config="{ allowInput: true, wrap: true }"
            class="form-control datepicker"
            @on-open="focus"
            @on-close="blur"
          />
        </base-input>
      </td>
      <td>
        <textarea
          class="form-control form-control-alternative"
          rows="3"
          placeholder="Write a large text here ..."
          v-model="item.description"
        ></textarea>
      </td>
    </template>
  </portfolio-list>
</template>
<script>
import API from "@/lib/api";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import PortfolioList from "@/components/PortfolioList.vue";

export default {
  name: "portfolio-careers",
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
      displayColumns: ["이름", "입사일", "퇴사일", "설명"],
      columns: ["name", "start_date", "end_date", "description"]
    };
  },
  methods: {
    async loadCentralInfo() {
      try {
        const { careers } = await API.create()
          .auth()
          .get()
          .url(`/careers`)
          .build();

        return careers;
      } catch (err) {
        alert(err.message);
      }
    },
    async addItems(data) {
      try {
        const { careers } = await API.create()
          .auth()
          .post()
          .url(`/portfolios/${this.portfolioId}/careers`)
          .data({ careers: data })
          .build();

        this.$emit("update", {
          type: "careers",
          data: careers.concat(this.tableData)
        });

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    async saveItem(data) {
      try {
        const { career } = await API.create()
          .auth()
          .put()
          .url(`/portfolios/${this.portfolioId}/careers/${data.id}`)
          .data(data)
          .build();

        this.$emit("update", {
          type: "careers",
          data: this.tableData.map(item => {
            if (item.id !== career.id) return item;
            return career;
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
          .url(`/portfolios/${this.portfolioId}/careers/${id}`)
          .build();

        this.$emit("update", {
          type: "careers",
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
  components: { PortfolioList, flatPicker }
};
</script>
<style></style>
