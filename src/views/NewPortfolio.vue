<template>
  <div class="content new-portfolio">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <transition name="slide" mode="out-in">
            <portfolio-profile
              v-if="view === 'profile'"
              type="add"
              :level="level"
              @add-complete="addComplete"
            />

            <portfolio-projects
              v-if="view === 'projects'"
              type="add"
              :level="level"
              :portfolioId="portfolioId"
              @add-complete="addComplete"
            />

            <portfolio-skills
              v-else-if="view === 'skills'"
              type="add"
              :level="level"
              :portfolioId="portfolioId"
              @add-complete="addComplete"
            />

            <portfolio-educations
              v-else-if="view === 'educations'"
              type="add"
              :level="level"
              :portfolioId="portfolioId"
              @add-complete="addComplete"
            />

            <portfolio-careers
              v-else-if="view === 'careers'"
              type="add"
              :level="level"
              :portfolioId="portfolioId"
              @add-complete="addComplete"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import PortfolioProfile from "@/components/PortfolioInfo/PortfolioProfile.vue";
import PortfolioSkills from "@/components/PortfolioInfo/PortfolioSkills.vue";
import PortfolioProjects from "@/components/PortfolioInfo/PortfolioProjects.vue";
import PortfolioEducations from "@/components/PortfolioInfo/PortfolioEducations.vue";
import PortfolioCareers from "@/components/PortfolioInfo/PortfolioCareers.vue";

export default {
  name: "new-portfolio",
  data() {
    return {
      portfolioId: undefined,
      level: 1,
      views: [
        undefined,
        "profile",
        "projects",
        "skills",
        "educations",
        "careers"
      ]
    };
  },
  computed: {
    view() {
      return this.views[this.level];
    }
  },
  components: {
    PortfolioProfile,
    PortfolioProjects,
    PortfolioSkills,
    PortfolioEducations,
    PortfolioCareers
  },
  methods: {
    addComplete(portfolio) {
      if (this.level === 5) {
        router.push(`/portfolios/${this.portfolioId}`);
        return;
      }

      if (this.level === 1) this.portfolioId = portfolio.id;

      this.level += 1;
      window.scrollTo(0, 0);
    }
  }
};
</script>
<style>
div.text-center {
  margin: 0 auto;
  text-align: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s;
}

.slide-enter {
  transform: translateX(120%);
}

.slide-leave,
.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-120%);
}
</style>
