<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <list
            title="Skills"
            v-if="isReady"
            :columns="columns"
            :displayColumns="displayColumns"
            :tableData="tableData"
            :addItem="addItem"
            :saveItem="saveItem"
            :deleteItem="deleteItem"
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
  name: "skills",
  data() {
    return {
      displayColumns: ["이름", "숙련도"],
      columns: ["name", "level"],
      tableData: [],
      isReady: false
    };
  },
  async mounted() {
    this.tableData = await this.loadData();
    this.isReady = true;
  },
  methods: {
    loadData: async () => {
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
    addItem: async function(data) {
      data.level = data.level || 3;
      try {
        const { skill } = await API.create()
          .auth()
          .post()
          .url(`/skills`)
          .data(data)
          .build();

        this.tableData = [skill].concat(this.tableData);

        return true;
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    saveItem: async function(data) {
      try {
        const { skill } = await API.create()
          .auth()
          .put()
          .url(`/skills/${data.id}`)
          .data(data)
          .build();

        this.tableData = this.tableData.map(item => {
          if (item.id !== skill.id) return item;
          return skill;
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
          .url(`/skills/${id}`)
          .build();

        this.tableData = this.tableData.filter(item => item.id !== id);
      } catch (err) {
        alert(err.message);
      }
    }
  },
  components: {
    List
  }
};
</script>
<style>
.noUi-horizontal {
  height: 7px;
}
.progress-wrapper {
  padding-top: 0;
}
.table td .progress {
  width: 100%;
}
</style>
