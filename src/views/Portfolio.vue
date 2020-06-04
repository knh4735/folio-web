<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <portfolio-profile
            v-if="isReady"
            :orgData="portfolio"
            @update="update"
          />

          <portfolio-projects
            v-if="isReady"
            :portfolioId="portfolioId"
            :tableData="portfolio.projects"
            @update="update"
          />

          <portfolio-skills
            v-if="isReady"
            :portfolioId="portfolioId"
            :tableData="portfolio.skills"
            @update="update"
          />

          <portfolio-educations
            v-if="isReady"
            :portfolioId="portfolioId"
            :tableData="portfolio.educations"
            @update="update"
          />

          <portfolio-careers
            v-if="isReady"
            :portfolioId="portfolioId"
            :tableData="portfolio.careers"
            @update="update"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";
import PortfolioProfile from "@/components/PortfolioInfo/PortfolioProfile.vue";
import PortfolioSkills from "@/components/PortfolioInfo/PortfolioSkills.vue";
import PortfolioProjects from "@/components/PortfolioInfo/PortfolioProjects.vue";
import PortfolioEducations from "@/components/PortfolioInfo/PortfolioEducations.vue";
import PortfolioCareers from "@/components/PortfolioInfo/PortfolioCareers.vue";

export default {
  name: "portfolio",
  data() {
    const id = Number(this.$route.params.id);

    return {
      displayColumns: ["이름", "숙련도"],
      columns: ["name", "level"],
      portfolioId: id,
      portfolio: undefined,
      isReady: false
    };
  },
  async mounted() {
    this.portfolio = await this.loadData(this.portfolioId);
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

        return portfolio;
      } catch (err) {
        alert(err.message);
      }
    },
    update({ type, data }) {
      if (type === "profile") {
        this.portfolio = {
          ...this.portfolio,
          ...data
        };
        return;
      }

      this.portfolio[type] = data;
    }
  },
  components: {
    PortfolioProfile,
    PortfolioSkills,
    PortfolioProjects,
    PortfolioEducations,
    PortfolioCareers
  }
};
</script>
<style></style>
