<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <list
            title="내 경력"
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
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
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
  name: "careers",
  data() {
    return {
      displayColumns: ["이름", "입사일", "퇴사일", "설명"],
      columns: ["name", "start_date", "end_date", "description"],
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
    addItem: async function(data) {
      try {
        const { career } = await API.create()
          .auth()
          .post()
          .url(`/careers`)
          .data(data)
          .build();

        this.tableData = [career].concat(this.tableData);

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    saveItem: async function(data) {
      try {
        const { career } = await API.create()
          .auth()
          .put()
          .url(`/careers/${data.id}`)
          .data(data)
          .build();

        this.tableData = this.tableData.map(item => {
          if (item.id !== career.id) return item;
          return career;
        });
      } catch (err) {
        alert(err.message);
      }
    },
    deleteItem: async function(id) {
      try {
        await API.create()
          .auth()
          .delete()
          .url(`/careers/${id}`)
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
