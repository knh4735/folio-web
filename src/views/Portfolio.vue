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

          <div class="text-right">
            <base-button type="info" size="sm" @click.native="sharePortfolio"
              >포트폴리오 공유하기</base-button
            >
            <base-button
              type="danger"
              outline
              size="sm"
              @click.native="deletePortfolio"
              >포트폴리오 삭제하기</base-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";
import router from "@/router";
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
    async loadData(id) {
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
    },

    async sharePortfolio() {
      alert("빨리 만들어라 조현규");
    },

    async deletePortfolio() {
      const reallyDelete = confirm("정말 삭제하시겠습니까?");
      if (!reallyDelete) return;

      try {
        await API.create()
          .auth()
          .delete()
          .url(`/portfolios/${this.portfolioId}`)
          .build();

        router.push(`/`);
      } catch (err) {
        alert(err.message);
      }
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
