<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div v-if="isReady">
            <base-button
              v-print="'#print-view'"
              id="print-btn"
              type="primary"
              icon="ni ni-book-bookmark"
              size="lg"
              rounded
            ></base-button>
            <div sylte="text-align:left;">
              <div>
                <tabs :fill="false" circle>
                  <tab-pane>
                    <span slot="title" class="nav-link-icon d-block"
                      ><i class="ni ni-bullet-list-67"></i
                    ></span>
                    <div class="view-vertical">
                      <h2 class="title">{{ portfolio.title }}</h2>
                      <card>
                        <h5 class="heading-section text-muted mb-4">
                          개인 정보
                        </h5>
                        <div class="pl-lg-4">
                          <div class="row">
                            <div class="col">
                              <label class="form-control-label"
                                >이름 :
                                <span>{{ portfolio.name }} </span></label
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
                                >성별 :
                                <span>{{ portfolio.gender }}</span></label
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

                      <card>
                        <h5 class="heading-section text-muted mb-4">
                          기술 스택
                        </h5>
                        <div>
                          <table
                            class="tablesorter table edu align-items-center table-flush"
                          >
                            <tbody>
                              <tr
                                v-for="skill in portfolio.skills"
                                :key="skill.id"
                              >
                                <td>
                                  {{ skill.name }}
                                </td>
                                <td>숙련도 : {{ skill.level }} / 5</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </card>

                      <card :headerClasses="project_card">
                        <h5 class="heading-section text-muted mb-2">
                          프로젝트
                        </h5>
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

                    <div class="view-horizontal">
                      <h2 class="title">{{ portfolio.title }}</h2>
                      <div class="row">
                        <div class="col-6">
                          <card>
                            <h5 class="heading-section text-muted mb-4">
                              개인 정보
                            </h5>
                            <div class="pl-lg-4">
                              <div class="row">
                                <div class="col">
                                  <label class="form-control-label"
                                    >이름 :
                                    <span>{{ portfolio.name }} </span></label
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
                                    >성별 :
                                    <span>{{ portfolio.gender }}</span></label
                                  >
                                </div>
                              </div>
                            </div>
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
                        </div>
                        <div class="col-6">
                          <card>
                            <h5 class="heading-section text-muted mb-4">
                              학력
                            </h5>
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
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <card>
                            <h5 class="heading-section text-muted mb-4">
                              기술 스택
                            </h5>
                            <div>
                              <table
                                class="tablesorter table edu align-items-center table-flush"
                              >
                                <tbody>
                                  <tr
                                    v-for="skill in portfolio.skills"
                                    :key="skill.id"
                                  >
                                    <td>
                                      {{ skill.name }}
                                    </td>
                                    <td>숙련도 : {{ skill.level }} / 5</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </card>
                        </div>
                        <div class="col-6">
                          <card :headerClasses="career_card">
                            <h5 class="heading-section text-muted mb-2">
                              경력
                            </h5>
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
                        </div>
                      </div>
                      <div class="col-12">
                        <card :headerClasses="project_card">
                          <h5 class="heading-section text-muted mb-2">
                            프로젝트
                          </h5>
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
                                    <td>
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
                    </div>
                  </tab-pane>
                </tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";
import Vue from "vue";
import Print from "vue-print-nb";

Vue.use(Print);

export default {
  name: "portfolio-view",
  props: {
    code: String,
    type: {
      type: String,
      description: "포트폴리오 템플릿 타입",
      default: ""
    }
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
    console.log(this.type);
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
    },
    print() {
      this.$htmlToPaper("print-view");
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
}

.view-vertical .heading-section,
.heading-small {
  color: #5e72e4 !important;
}

.view-vertical .table.edu td {
  border: none;
}

.view-vertical .car-element {
  border: 1px solid #eeeeee;
  margin: 15px 0;
}
.view-vertical .career_card {
  padding: 10px;
  border: none;
}

.view-vertical .card {
  margin-bottom: 40px;
}

.view-vertical @page {
  size: A4-landscape;
  margin: 0;
}

.view-horizontal {
  padding-top: 40px;
}

.view-horizontal .title {
  text-align: center;
  color: #5603ad;
  font-size: 20px;
}

.view-horizontal .card {
  padding: 0.5cm;
  margin: 1cm auto;
  border-radius: 5px;
  /*background: white;*/
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

.view-horizontal .heading-section,
.heading-small {
  color: #5e72e4 !important;
}
.view-horizontal .table.edu td {
  border: none;
}

.view-horizontal .form-control-label {
  font-size: 15px !important;
}

.view-horizontal .table td {
  font-size: 15px !important;
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

#print-btn {
  position: fixed;
  bottom: 10%;
  right: 10%;
}
</style>
