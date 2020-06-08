<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div v-if="isReady">
            <div sylte="text-align:left;">
              <tabs :fill="false" circle>
                <tab-pane>
                  <span slot="title" class="nav-link-icon d-block"
                    ><i class="ni ni-bullet-list-67"></i
                  ></span>
                  <div class="view-vertical">
                    <h2>{{ portfolio.title }}</h2>
                    <card>
                      <h5 class="heading-section text-muted mb-4">개인 정보</h5>
                      <div class="pl-lg-4">
                        <div class="row">
                          <div class="col">
                            <label class="form-control-label"
                              >이름 : <span>{{ portfolio.name }} </span></label
                            >
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <label class="form-control-label"
                              >생년월일 :
                              <span>{{ portfolio.birthday }}</span></label
                            >
                          </div>
                          <div class="col">
                            <label class="form-control-label"
                              >성별 : <span>{{ portfolio.gender }}</span></label
                            >
                          </div>
                        </div>
                      </div>
                      <hr calss="my-4" />
                      <div class="pl-lg-4">
                        <div class="row">
                          <div class="col">
                            <label class="form-control-label"
                              >이메일 :
                              <span>{{ portfolio.email }} </span></label
                            >
                          </div>
                          <div class="col">
                            <label class="form-control-label"
                              >휴대폰 번호 :
                              <span>{{ portfolio.mobile }}</span></label
                            >
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <label class="form-control-label"
                              >주소 :
                              <span>{{ portfolio.address }}</span></label
                            >
                          </div>
                        </div>
                      </div>
                    </card>

                    <card>
                      <h5 class="heading-section text-muted mb-4">학력</h5>
                      <div>
                        <table
                          class="tablesorter table edu align-items-center table-flush"
                        >
                          <tbody>
                            <tr
                              v-for="edu in portfolio.educations"
                              :key="edu.id"
                            >
                              <td>
                                {{ edu.name }}
                              </td>
                              <td>입학일자 : {{ edu.start_date }}</td>
                              <td>졸업일자 : {{ edu.end_date }}</td>
                              <td>{{ edu.status }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </card>

                    <card :headerClasses="career_card">
                      <h5 class="heading-section text-muted mb-2">경력</h5>
                      <div>
                        <table
                          class="tablesorter table career align-items-center table-flush"
                        >
                          <tbody>
                            <div
                              class="car-element"
                              v-for="car in portfolio.careers"
                              :key="car.id"
                            >
                              <tr>
                                <td style="width:300px;">
                                  {{ car.name }}
                                </td>
                                <td>입사일자 : {{ car.start_date }}</td>
                                <td>퇴사일자 : {{ car.end_date }}</td>
                              </tr>
                              <tr>
                                <td
                                  colspan="3"
                                  style="white-space:pre-wrap"
                                  v-if="car.description"
                                >
                                  {{ car.description }}
                                </td>
                              </tr>
                            </div>
                          </tbody>
                        </table>
                      </div>
                    </card>

                    <card :headerClasses="project_card">
                      <h5 class="heading-section text-muted mb-2">프로젝트</h5>
                      <div>
                        <table
                          class="tablesorter table career align-items-center table-flush"
                        >
                          <tbody>
                            <div
                              class="car-element"
                              v-for="proj in portfolio.projects"
                              :key="proj.id"
                            >
                              <tr>
                                <td style="width:300px;">
                                  {{ proj.name }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="white-space:pre-wrap"
                                  v-if="proj.description"
                                >
                                  {{ proj.description }}
                                </td>
                              </tr>
                            </div>
                          </tbody>
                        </table>
                      </div>
                    </card>
                  </div>
                </tab-pane>

                <tab-pane>
                  <span slot="title" class="nav-link-icon d-block"
                    ><i class="ni ni-album-2"></i
                  ></span>

                  <div>
                    <card> </card>
                  </div>
                </tab-pane>
              </tabs>
            </div>
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
<style>
.card-body {
  padding: 10px;
}

.view-vertical {
  width: 21cm;
  min-height: 29.7cm;
  padding: 1cm;
  margin: 1cm auto;
  border-radius: 5px;
  /*background: white;*/
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.heading-section,
.heading-small {
  color: #5e72e4 !important;
}

.table.edu td {
  border: none;
}

.car-element {
  border: 1px solid #eeeeee;
  margin: 15px 0;
}
.career_card {
  padding: 10px;
  border: none;
}

.card {
  margin-bottom: 40px;
}

.view-vertical @page {
  size: A4-landscape;
  margin: 0;
}
@media print {
  .view-vertical {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}
</style>
