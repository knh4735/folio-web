<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";

export default {
  name: "portfolio",
  data() {
    return {
      portfolio: undefined,
      isReady: false
    };
  },
  async mounted() {
    const id = Number(this.$route.params.id);

    this.portfolio = await this.loadData(id);
    this.isReady = true;
  },
  methods: {
    loadData: async id => {
      try {
        const { portfolio } = await API.create()
          .auth()
          .get()
          .url(`/portfolios/${id}`)
          .build();

        console.log(portfolio);

        return portfolio;
      } catch (err) {
        alert(err.message);
      }
    }
  }
};
</script>
<style></style>
