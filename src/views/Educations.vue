<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <list
            title="Educations"
            v-if="isReady"
            :columns="columns"
            :displayColumns="displayColumns"
            :tableData="tableData"
            :addItem="addItem"
            :saveItem="saveItem"
            :deleteItem="deleteItem"
            :validateInput="validateInput"
          >
            <template #form="{ item }">
              <td>
                <base-input
                  v-model="item.name"
                  class="input-group-alternative"
                />
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
                <div
                  class="form-group input-group-alternative mb-3 input-group"
                >
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
          </list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from "@/components/List";
import API from "@/lib/api";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "educations",
  data() {
    return {
      displayColumns: ["학교명", "입학일자", "졸업일자", "졸업구분"],
      columns: ["name", "start_date", "end_date", "status"],
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
    addItem: async function(data) {
      try {
        const { education } = await API.create()
          .auth()
          .post()
          .url(`/educations`)
          .data(data)
          .build();

        this.tableData = [education].concat(this.tableData);

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    saveItem: async function(data) {
      try {
        const { education } = await API.create()
          .auth()
          .put()
          .url(`/educations/${data.id}`)
          .data(data)
          .build();

        this.tableData = this.tableData.map(item => {
          if (item.id !== education.id) return item;
          return education;
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
          .url(`/educations/${id}`)
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
    List,
    flatPicker
  }
};
</script>
<style></style>
