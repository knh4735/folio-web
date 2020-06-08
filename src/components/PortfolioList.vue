<template>
  <div class="card shadow portfolio-list">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">
            {{ title }}
          </h3>
        </div>

        <base-progress
          v-if="type === 'add'"
          class="col-xl-1"
          type="success"
          striped
          animated
          :showPercentage="false"
          :height="8"
          :value="(level - 1) * 20"
        >
          <template #label>{{ level }} / 5</template>
        </base-progress>

        <div class="col text-right">
          <base-button type="info" size="sm" @click.native="openModal"
            >가져오기</base-button
          >
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
          <tr v-for="(item, index) in newData" :key="`newItem_${index}`">
            <slot name="form" :item="item">
              <td v-for="(column, index) in colsWithValue(item)" :key="index">
                <base-input
                  v-model="item[column]"
                  class="input-group-alternative"
                />
              </td>
            </slot>
            <td>
              <base-button
                size="sm"
                type="success"
                outline
                @click.native="addRow(index)"
                v-if="type === 'view'"
                >저장</base-button
              >
              <base-button
                size="sm"
                type="warning"
                outline
                @click.native="cancelAddRow(index)"
                >취소</base-button
              >
            </td>
          </tr>

          <tr v-if="tableData.length + newData.length === 0">
            <td class="empty-row" :colspan="columns.length + 1">
              내용이 없습니다.
            </td>
          </tr>

          <tr v-for="(item, index) in tableData" :key="`item_${index}`">
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

    <!-- 포폴 추가시 버튼 -->
    <div v-if="type === 'add'" class="btn-save-list">
      <base-button
        type="primary"
        @click.native="saveRows"
        :disabled="newData.length === 0"
        >저장 후 다음</base-button
      >
      <base-button type="secondary" @click.native="skip">넘어가기</base-button>
    </div>

    <modal :show.sync="modalFlag" modalClasses="col-md-auto">
      <template slot="header">
        <h5 class="modal-title">{{ title }} 가져오기</h5>
      </template>
      <div>
        <table class="tablesorter table align-items-center table-flush">
          <thead class="thead-light">
            <tr>
              <slot name="columns" :columns="displayColumns">
                <th v-for="column in displayColumns" :key="column">
                  {{ column }}
                </th>
              </slot>
            </tr>
          </thead>
          <tbody class="list">
            <tr
              v-for="(item, index) in centralInfo"
              :key="index"
              :class="{ active: centralInfoFlag[index] }"
              @click="toggleCentralInfoFlag(index)"
            >
              <slot :item="item">
                <td v-for="(column, index) in colsWithValue(item)" :key="index">
                  {{ itemValue(item, column) }}
                </td>
              </slot>
            </tr>
          </tbody>
        </table>
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="closeModal">취소</base-button>
        <base-button type="primary" @click="addRows">추가</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { copyObject } from "@/lib/util";

export default {
  name: "portfolio-list",
  props: {
    title: String,
    type: {
      type: String,
      description: "view or add. 포폴 조회/수정에 사용되는지 추가에 사용되는지",
      default: "view"
    },
    displayColumns: Array,
    columns: Array,
    tableData: Array,
    level: {
      type: Number,
      description: "add 타입에서 상단 진행도에 표시할 단계"
    },
    loadCentralInfo: {
      type: Function,
      description: "중앙 정보를 반환하는 함수",
      default: () => {}
    },
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
    addItems: {
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
      modalFlag: false,
      newData: [],
      centralInfo: [],
      centralInfoFlag: []
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
    /* ----------------------------뷰 관련 동작---------------------------- */
    async openModal() {
      if (this.modalFlag) return;

      if (this.centralInfo.length === 0)
        this.centralInfo = await this.loadCentralInfo();

      this.centralInfoFlag = this.centralInfo.map(() => false);
      this.modalFlag = true;
    },

    closeModal() {
      this.modalFlag = false;
    },

    openForm() {
      this.newData = [this.initNewData()].concat(this.newData);
    },

    addRows() {
      const newData = this.centralInfoFlag.reduce((data, value, index) => {
        if (!value) return data;
        return data.concat(copyObject(this.centralInfo[index]));
      }, []);

      this.newData = newData.concat(this.newData);
      this.modalFlag = false;
    },

    /* ----------------------------데이터 관련 동작---------------------------- */
    async addRow(index) {
      if (!this.validateInput(this.newData[index])) return;

      const isAdded = await this.addItems([this.newData[index]]);
      if (isAdded === false) return;

      this.newData = this.newData.filter((val, idx) => idx !== index);
    },

    cancelAddRow(index) {
      this.newData = this.newData.filter((val, idx) => idx !== index);
    },

    deleteRow(itemId) {
      this.deleteItem(itemId);
    },

    async saveRow(itemId) {
      if (!this.validateInput(this.newData)) return;

      const isSaved = await this.saveItem(this.data[itemId]);
      if (isSaved === false) return;

      this.edit[itemId] = false;
    },

    editRow(itemId) {
      this.edit[itemId] = true;
    },

    cancelEditRow(itemId) {
      this.edit[itemId] = false;
    },

    initNewData() {
      return this.columns.reduce((form, key) => {
        form[key] = undefined;
        return form;
      }, {});
    },

    /* ----------------------------신규 포폴 추가 관련 동작---------------------------- */
    async saveRows() {
      if (this.newData.some(data => !this.validateInput(data))) return;

      const isAdded = await this.addItems(this.newData);
      if (isAdded === false) return;

      this.$emit("add-complete");
    },

    skip() {
      this.$emit("add-complete");
    },

    /* ----------------------------기타 기능 관련---------------------------- */
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },

    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    toggleCentralInfoFlag(index) {
      this.centralInfoFlag = this.centralInfoFlag.map((value, idx) => {
        if (idx === index) return !value;
        return value;
      });
    }
  }
};
</script>
<style>
.portfolio-list {
  margin-bottom: 30px;
}

.card-header .progress {
  margin-bottom: 0;
}

.card-header .progress-label {
  margin: 0 auto;
}

.btn-save-list {
  margin: 20px auto;
}

.modal-dialog {
  max-width: 80%;
}

.modal-dialog tbody.list tr {
  cursor: pointer;
}

.modal-dialog tbody.list tr.active {
  background: linear-gradient(87deg, #2dce8936 0, #2dcecc38 100%) !important;
}
</style>
