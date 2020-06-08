<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div v-if="isReady">
            {{ JSON.stringify(portfolio) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";

export default {
  name: "portfolio-view",
  props: {
    code: String
  },
  data() {
    return {
      portfolio: undefined,
      isReady: false
    };
  },
  async mounted() {
    this.portfolio = await this.loadData(this.code);
    this.isReady = true;
  },
  methods: {
    async loadData(code) {
      try {
        const { portfolio } = await API.create()
          .get()
          .url(`/portfolios/share/${code}`)
          .build();

        return portfolio;
      } catch (err) {
        alert(err.message);
      }
    }
  },
  components: {}
};
</script>
<style></style>
