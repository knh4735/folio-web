<template>
  <div class="card shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" @click.native="openForm"
            >추가</base-button
          >
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
          <tr v-if="addFlag">
            <slot name="form" :item="newData">
              <td
                v-for="(column, index) in colsWithValue(newData)"
                :key="index"
              >
                <base-input
                  v-model="newData[column]"
                  class="input-group-alternative"
                />
              </td>
            </slot>
            <td>
              <base-button
                size="sm"
                type="success"
                outline
                @click.native="addRow"
                >저장</base-button
              >
              <base-button
                size="sm"
                type="warning"
                outline
                @click.native="cancelAddRow"
                >취소</base-button
              >
            </td>
          </tr>

          <tr v-for="(item, index) in tableData" :key="index">
            <slot :item="item" v-if="!edit[item.id]">
              <td v-for="(column, index) in colsWithValue(item)" :key="index">
                {{ itemValue(item, column) }}
              </td>
            </slot>

            <slot v-else name="form" :item="data[item.id]">
              <td v-for="(column, index) in colsWithValue(item)" :key="index">
                <base-input
                  v-model="data[item.id][column]"
                  class="input-group-alternative"
                />
              </td>
            </slot>
            <td>
              <div v-if="!edit[item.id]">
                <base-button
                  size="sm"
                  type="primary"
                  outline
                  @click.native="editRow(item.id)"
                  >수정</base-button
                >
                <base-button
                  size="sm"
                  type="danger"
                  outline
                  @click.native="deleteRow(item.id)"
                  >삭제</base-button
                >
              </div>
              <div v-else>
                <base-button
                  size="sm"
                  type="success"
                  outline
                  @click.native="saveRow(item.id)"
                  >저장</base-button
                >
                <base-button
                  size="sm"
                  type="warning"
                  outline
                  @click.native="cancelEditRow(item.id)"
                  >취소</base-button
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { copyObject } from "@/lib/util";

export default {
  name: "list",
  props: {
    title: String,
    displayColumns: Array,
    columns: Array,
    tableData: Array,
    deleteItem: {
      type: Function,
      default: function(id) {
        console.log(id);
      }
    },
    saveItem: {
      type: Function,
      default: function(data) {
        console.log(data);
      }
    },
    addItem: {
      type: Function,
      default: function(data) {
        console.log(data);
      }
    },
    validateInput: {
      type: Function,
      default: function(data) {
        console.log(data);
        return true;
      }
    }
  },
  watch: {
    tableData: function() {
      const init = this.tableData.reduce(
        (init, item) => {
          init.data[item.id] = copyObject(item);
          init.edit[item.id] = false;
          return init;
        },
        { data: {}, edit: {} }
      );

      this.data = init.data;
      this.edit = init.edit;
    }
  },
  data() {
    const init = this.tableData.reduce(
      (init, item) => {
        init.data[item.id] = copyObject(item);
        init.edit[item.id] = false;
        return init;
      },
      { data: {}, edit: {} }
    );

    return {
      ...init,
      newData: this.initNewData(),
      addFlag: false
    };
  },
  computed: {
    colsWithValue() {
      return row => {
        return this.columns.filter(column => this.hasValue(row, column));
      };
    }
  },
  methods: {
    openForm: function() {
      if (this.addFlag) return;
      this.addFlag = true;
    },
    addRow: async function() {
      if (!this.validateInput(this.newData)) return;
      await this.addItem(this.newData);
      this.newData = this.initNewData();
      this.addFlag = false;
    },
    cancelAddRow: function() {
      this.newData = this.initNewData();
      this.addFlag = false;
    },
    deleteRow: function(itemId) {
      this.deleteItem(itemId);
    },
    saveRow: function(itemId) {
      if (!this.validateInput(this.newData)) return;
      this.saveItem(this.data[itemId]);
      this.edit[itemId] = false;
    },
    editRow: function(itemId) {
      this.edit[itemId] = true;
    },
    cancelEditRow: function(itemId) {
      this.edit[itemId] = false;
    },
    initNewData() {
      return this.columns.reduce((form, key) => {
        form[key] = undefined;
        return form;
      }, {});
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
};
</script>
<style></style>
