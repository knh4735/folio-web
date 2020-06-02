<template>
  <portfolio-list
    title="Educations"
    :type="type"
    :columns="columns"
    :displayColumns="displayColumns"
    :tableData="tableData"
    :loadCentralInfo="loadCentralInfo"
    :addItems="addItems"
    :saveItem="saveItem"
    :deleteItem="deleteItem"
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
        <div class="form-group input-group-alternative mb-3 input-group">
          <select
            class="form-control"
            v-model="item.status"
            style="flex:1; padding-left: 0;"
          >
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="졸업예정">졸업예정</option>
            <option value="졸업">졸업</option>
          </select>
        </div>
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
  name: "portfolio-educations",
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
    tableData: Array
  },
  data() {
    return {
      displayColumns: ["학교명", "입학일자", "졸업일자", "졸업구분"],
      columns: ["name", "start_date", "end_date", "status"]
    };
  },
  methods: {
    async loadCentralInfo() {
      try {
        const { educations } = await API.create()
          .auth()
          .get()
          .url(`/educations`)
          .build();

        return educations;
      } catch (err) {
        alert(err.message);
      }
    },
    async addItems(data) {
      try {
        const { educations } = await API.create()
          .auth()
          .post()
          .url(`/portfolios/${this.portfolioId}/educations`)
          .data({ educations: data })
          .build();

        this.$emit("update", {
          type: "educations",
          data: educations.concat(this.tableData)
        });

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    async saveItem(data) {
      try {
        const { education } = await API.create()
          .auth()
          .put()
          .url(`/portfolios/${this.portfolioId}/educations/${data.id}`)
          .data(data)
          .build();

        this.$emit("update", {
          type: "educations",
          data: this.tableData.map(item => {
            if (item.id !== education.id) return item;
            return education;
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
          .url(`/portfolios/${this.portfolioId}/educations/${id}`)
          .build();

        this.$emit("update", {
          type: "educations",
          data: this.tableData.filter(item => item.id !== id)
        });
      } catch (err) {
        alert(err.message);
      }
    }
  },
  components: { PortfolioList, flatPicker }
};
</script>
<style></style>
