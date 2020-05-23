<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <div class="main-content">
      <dashboard-navbar></dashboard-navbar>

      <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-7">
        <!-- Card stats -->
        <div class="row">
          <div class="col">
            <a href="/profile">
              <stats-card
                type="gradient-green"
                sub-title="내 정보"
                icon="ni ni-badge"
                class="mb-4 mb-xl-0"
              >
              </stats-card>
            </a>
          </div>
          <div class="col">
            <a href="/projects">
              <stats-card
                type="gradient-red"
                sub-title="내 프로젝트"
                icon="ni ni-active-40"
                class="mb-4 mb-xl-0"
              >
              </stats-card>
            </a>
          </div>
          <div class="col">
            <a href="/skills">
              <stats-card
                type="gradient-orange"
                sub-title="내 기술 스택"
                icon="ni ni-chart-pie-35"
                class="mb-4 mb-xl-0"
              >
              </stats-card>
            </a>
          </div>
          <div class="col">
            <a href="/educations">
              <stats-card
                type="gradient-green"
                sub-title="내 학력"
                icon="ni ni-money-coins"
                class="mb-4 mb-xl-0"
              >
              </stats-card>
            </a>
          </div>
          <div class="col">
            <a href="/careers">
              <stats-card
                type="gradient-info"
                sub-title="내 경력"
                icon="ni ni-chart-bar-32"
                class="mb-4 mb-xl-0"
              >
              </stats-card>
            </a>
          </div>
        </div>
      </base-header>
      <div>
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  }
};
</script>
<style lang="scss"></style>
