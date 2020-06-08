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

    <modal :show.sync="modalFlag" modalClasses="col-md-auto">
      <template slot="header">
        <h5 class="modal-title">포트폴리오 공유 링크</h5>
      </template>
      <div>
        {{ code }}
      </div>
      <template slot="footer">
        <base-button
          type="primary"
          v-clipboard:copy="code"
          v-clipboard:success="onCopy"
          >복사하기</base-button
        >
        <base-button type="secondary" @click="modalFlag = false"
          >닫기</base-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

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
      isReady: false,
      modalFlag: false
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
      if (this.portfolio.public_code !== "") {
        this.modalFlag = true;
        return;
      }

      try {
        const { code } = await API.create()
          .auth()
          .post()
          .url(`/portfolios/${this.portfolioId}/share`)
          .build();

        this.portfolio.public_code = code;
        this.modalFlag = true;
      } catch (err) {
        alert(err.message);
      }
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
    },
    onCopy() {
      this.$notify({
        type: "info",
        title: "공유 링크가 복사됬습니다."
      });
    }
  },
  computed: {
    code() {
      if (!this.portfolio || this.portfolio.public_code === "")
        return "코드가 없습니다.";

      return `${window.location.origin}/portfolios/view/${this.portfolio.public_code}`;
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
