<template>
  <card
    shadow
    type="secondary"
    class="portfolio-profile"
    :bodyClasses="{ 'bg-white': type === 'view' && !editFlag }"
  >
    <div slot="header" class="bg-white border-0 row">
      <div class="col align-items-center display-flex">
        <h3 class="mb-0">기본 정보</h3>
      </div>
      <base-progress
        v-if="type === 'add'"
        class="col-xl-1"
        type="success"
        striped
        animated
        :showPercentage="false"
        :height="8"
        :value="(level - 1) * 20"
      >
        <template #label>{{ level }} / 5</template>
      </base-progress>
      <div class="col text-right">
        <div v-if="type === 'view'">
          <div v-if="!editFlag">
            <base-button type="primary" size="sm" @click.native="edit"
              >수정</base-button
            >
          </div>
          <div v-else>
            <base-button type="success" size="sm" @click.native="savePortfolio"
              >저장</base-button
            >
            <base-button type="secondary" size="sm" @click.native="cancelEdit"
              >취소</base-button
            >
          </div>
        </div>
      </div>
    </div>

    <h6 class="heading-small text-muted mb-4">포트폴리오 정보</h6>
    <div class="pl-lg-4 ">
      <div class="row mb-4">
        <div class="col">
          <label class="form-control-label">포트폴리오 제목</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.title }}</div>
          <div v-else>
            <base-input
              v-model="portfolio.title"
              placeholder="폴리오"
              input-classes="form-control form-control-alternative"
              :valid="isValid.title"
              @change="validateInput"
            />
            <input-warning
              v-if="isInvalid.title"
              text="제목은 500자 이내로 입력해주세요."
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label class="form-control-label">설명</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.memo }}</div>
          <div v-else>
            <textarea
              v-model="portfolio.memo"
              class="form-control form-control-alternative"
              rows="5"
              placeholder=""
              @change="validateInput"
            ></textarea>

            <input-warning
              v-if="isInvalid.memo"
              text="설명은 5000자 이내로 입력해주세요."
            />
          </div>
        </div>
      </div>
    </div>
    <hr class="my-4" />

    <h6 class="heading-small text-muted mb-4">사용자 정보</h6>
    <div class="pl-lg-4">
      <div class="row">
        <div class="col">
          <label class="form-control-label">이름</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.name }}</div>
          <div v-else>
            <base-input
              v-model="portfolio.name"
              placeholder="폴리오"
              input-classes="form-control-alternative"
              :valid="isValid.name"
              @change="validateInput"
            />
            <input-warning
              v-if="isInvalid.name"
              text="이름은 100자 이내로 입력해주세요."
            />
          </div>
        </div>
        <div class="col">
          <label class="form-control-label">생년월일</label>
          <div v-if="type === 'view' && !editFlag">
            {{ portfolio.birthday }}
          </div>
          <div v-else>
            <base-input
              class="input-group-alternative mb-3"
              :valid="isValid.birthday"
              @blur="validateBirthday"
            >
              <flat-picker
                v-model="portfolio.birthday"
                slot-scope="{ focus, blur }"
                :config="{ allowInput: true, wrap: true }"
                class="form-control datepicker"
                placeholder="생년월일"
                @on-open="focus"
                @on-close="blur"
              />
            </base-input>

            <input-warning
              v-if="isInvalid.birthday"
              text="유효하지 않은 생년월일입니다."
            />
          </div>
        </div>
        <div class="col">
          <label class="form-control-label">성별</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.gender }}</div>
          <div v-else>
            <div class="form-group input-group-alternative mb-3 input-group">
              <select
                class="form-control"
                v-model="portfolio.gender"
                label="성별"
                style="flex:1; padding-left: 0;"
                :valid="isValid.gender"
                @change="validateInput"
              >
                <option :value="null">성별</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </div>

            <input-warning
              v-if="isInvalid.gender"
              text="유효하지 않은 성별입니다."
            />
          </div>
        </div>
      </div>
    </div>
    <hr class="my-4" />

    <h6 class="heading-small text-muted mb-4">연락처</h6>
    <div class="pl-lg-4">
      <div class="row">
        <div class="col">
          <label class="form-control-label">이메일 주소</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.email }}</div>
          <div v-else>
            <base-input
              v-model="portfolio.email"
              type="email"
              input-classes="form-control-alternative"
              placeholder="folio@folio.com"
              :valid="isValid.email"
              @change="validateInput"
            />

            <input-warning
              v-if="isInvalid.email"
              text="이메일 주소 형식에 맞게 입력해주세요."
            />
          </div>
        </div>
        <div class="col">
          <label class="form-control-label">휴대폰 번호</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.mobile }}</div>
          <div v-else>
            <base-input
              v-model="portfolio.mobile"
              type="number"
              input-classes="form-control-alternative"
              placeholder="010-1234-5678"
              :valid="isValid.mobile"
              @change="validateInput"
            />

            <input-warning
              v-if="isInvalid.mobile"
              text="전화번호는 100자 이내로 입력해주세요."
            />
          </div>
        </div>
        <div class="col">
          <label class="form-control-label">주소</label>
          <div v-if="type === 'view' && !editFlag">{{ portfolio.address }}</div>
          <div v-else>
            <base-input
              v-model="portfolio.address"
              input-classes="form-control-alternative"
              placeholder="서울특별시 성북구 안암동 안암로 145"
              :valid="isValid.address"
              @change="validateInput"
            />

            <input-warning
              v-if="isInvalid.address"
              text="주소는 1000자 이내로 입력해주세요."
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 포폴 추가시 버튼 -->
    <div v-if="type === 'add'" class="btn-save-profile">
      <base-button
        type="primary"
        @click.native="addPortfolio"
        :disabled="!isInvalid"
        >저장 후 다음</base-button
      >
    </div>
  </card>
</template>
<script>
import API from "@/lib/api";
import store from "@/store";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import InputWarning from "@/components/InputWarning.vue";

const gender = ["남자", "여자", null];
const userProps = ["name", "birthday", "gender", "email", "mobile", "address"];
const portfolioProps = ["title", "memo"];
const totalProps = userProps.concat(portfolioProps);

export default {
  name: "portfolio-profile",
  props: {
    type: {
      type: String,
      description:
        "view / edit /add. 포폴 조회/수정/추가 중 어떤 것에 사용되는지",
      default: "view"
    },
    level: {
      type: Number,
      description: "add 타입에서 상단 진행도에 표시할 단계",
      default: 1
    },
    orgData: {
      type: Object,
      description: "포트폴리오 데이터",
      default: () => {
        return totalProps.reduce((ret, key) => {
          return {
            ...ret,
            [key]: undefined
          };
        });
      }
    }
  },
  data() {
    return {
      ...this.initData(),
      editFlag: false
    };
  },
  computed: {
    isInvalid() {
      return totalProps.reduce((ret, key) => {
        ret[key] = this.isValid[key] !== undefined && !this.isValid[key];
        return ret;
      }, {});
    }
  },
  methods: {
    edit() {
      this.editFlag = true;
    },

    async savePortfolio() {
      try {
        this.validateInput();
        const isInvalid = Object.keys(this.isValid).some(key => {
          return this.isValid[key] === false;
        });
        if (isInvalid) return;

        const isSame = totalProps.every(
          key => this.orgData[key] === this.portfolio[key]
        );
        if (isSame) {
          alert("변동 사항이 없습니다.");
          return;
        }

        const { portfolio } = await API.create()
          .put()
          .auth()
          .url(`/portfolios/${this.orgData.id}`)
          .data(this.portfolio)
          .build();

        this.$emit("update", {
          type: "profile",
          data: portfolio
        });

        this.editFlag = false;

        alert("저장되었습니다.");
      } catch (error) {
        alert(error.message);
      }
    },

    cancelEdit() {
      const { portfolio, isValid } = this.initData();
      this.portfolio = portfolio;
      this.isValid = isValid;

      this.editFlag = false;
    },

    async addPortfolio() {
      try {
        this.validateInput();
        const isInvalid = Object.keys(this.isValid).some(key => {
          if (key === "title") return !this.isValid[key];

          return this.isValid[key] === false;
        });
        if (isInvalid) return;

        const { portfolio } = await API.create()
          .post()
          .auth()
          .url(`/portfolios`)
          .data(this.portfolio)
          .build();

        this.$emit("add-complete", portfolio);

        return true;
      } catch (error) {
        alert(error.message);
        return false;
      }
    },

    validateBirthday(payload) {
      if (payload.length === 0) this.portfolio.birthday = "";
      else this.portfolio.birthday = payload[0];
      this.validateInput();
    },

    validateInput() {
      const portfolio =
        this.type === "view" ? this.orgData : this.initData().portfolio;

      if (this.portfolio.title !== portfolio.title) {
        this.isValid.title =
          this.portfolio.title.length > 0 && this.portfolio.title.length <= 500;
      } else this.isValid.title = undefined;

      if (this.portfolio.memo !== portfolio.memo) {
        this.isValid.memo = this.portfolio.memo.length <= 5000;
      } else this.isValid.memo = undefined;

      if (this.portfolio.name !== portfolio.name) {
        this.isValid.name = this.portfolio.name.length <= 100;
      } else this.isValid.name = undefined;

      if (
        this.portfolio.birthday !== "" &&
        this.portfolio.birthday !== portfolio.birthday
      ) {
        const birthday = new Date(this.portfolio.birthday);
        this.isValid.birthday = !isNaN(birthday) && birthday < new Date();
      } else this.isValid.birthday = undefined;

      if (this.portfolio.gender !== portfolio.gender) {
        this.isValid.gender = gender.indexOf(this.portfolio.gender) !== -1;
      } else this.isValid.gender = undefined;

      if (this.portfolio.email !== portfolio.email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isValid.email =
          re.test(this.portfolio.email) && this.portfolio.email.length <= 500;
      } else this.isValid.email = undefined;

      if (this.portfolio.mobile !== portfolio.mobile) {
        this.isValid.mobile = this.portfolio.mobile.length <= 100;
      } else this.isValid.mobile = undefined;

      if (this.portfolio.address !== portfolio.address) {
        this.isValid.address = this.portfolio.address.length <= 1000;
      } else this.isValid.address = undefined;
    },

    initData() {
      const data = userProps.reduce(
        (data, prop) => {
          return {
            portfolio: {
              ...data.portfolio,
              [prop]:
                this.type === "view"
                  ? this.orgData[prop]
                  : store.state.user[prop]
            },
            isValid: {
              ...data.isValid,
              [prop]: undefined
            }
          };
        },
        { portfolio: {}, isValid: {} }
      );

      return portfolioProps.reduce((data, prop) => {
        return {
          portfolio: {
            ...data.portfolio,
            [prop]: this.type === "view" ? this.orgData[prop] : undefined
          },
          isValid: {
            ...data.isValid,
            [prop]: undefined
          }
        };
      }, data);
    }
  },
  components: { flatPicker, InputWarning }
};
</script>
<style>
.portfolio-profile {
  margin-bottom: 30px;
}

.display-flex {
  display: flex;
}

.btn-save-profile {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
