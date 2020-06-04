<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card
            shadow
            type="secondary"
            class="profile"
            :bodyClasses="{ 'bg-white': !editFlag }"
          >
            <div slot="header" class="bg-white border-0 row">
              <div class="col align-items-center display-flex">
                <h3 class="mb-0">내 정보</h3>
              </div>
              <div class="col text-right">
                <div v-if="!editFlag">
                  <base-button type="primary" size="sm" @click.native="edit"
                    >수정</base-button
                  >
                </div>
                <div v-else>
                  <base-button
                    type="success"
                    size="sm"
                    @click.native="saveProfile"
                    >저장</base-button
                  >
                  <base-button
                    type="secondary"
                    size="sm"
                    @click.native="cancelEdit"
                    >취소</base-button
                  >
                </div>
              </div>
            </div>

            <h6 class="heading-small text-muted mb-4">사용자 정보</h6>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col">
                  <label class="form-control-label">이름</label>
                  <div v-if="!editFlag">{{ user.name }}</div>
                  <div v-else>
                    <base-input
                      v-model="user.name"
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
                  <div v-if="!editFlag">
                    {{ user.birthday }}
                  </div>
                  <div v-else>
                    <base-input
                      class="input-group-alternative mb-3"
                      :valid="isValid.birthday"
                      @blur="validateBirthday"
                    >
                      <flat-picker
                        v-model="user.birthday"
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
                  <div v-if="!editFlag">
                    {{ user.gender }}
                  </div>
                  <div v-else>
                    <div
                      class="form-group input-group-alternative mb-3 input-group"
                    >
                      <select
                        class="form-control"
                        v-model="user.gender"
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
                  <div v-if="!editFlag">
                    {{ user.email }}
                  </div>
                  <div v-else>
                    <base-input
                      v-model="user.email"
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
                  <div v-if="!editFlag">
                    {{ user.mobile }}
                  </div>
                  <div v-else>
                    <base-input
                      v-model="user.mobile"
                      type="tel"
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
                  <div v-if="!editFlag">
                    {{ user.address }}
                  </div>
                  <div v-else>
                    <base-input
                      v-model="user.address"
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
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";
import store from "@/store";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import InputWarning from "@/components/InputWarning.vue";

const gender = ["남자", "여자", null];
const userProps = ["name", "birthday", "gender", "email", "mobile", "address"];

export default {
  name: "profile",
  data: function() {
    return {
      ...this.initData(),
      editFlag: false
    };
  },
  computed: {
    isInvalid: function() {
      return userProps.reduce((ret, key) => {
        ret[key] = this.isValid[key] !== undefined && !this.isValid[key];
        return ret;
      }, {});
    }
  },
  methods: {
    edit() {
      this.editFlag = true;
    },

    cancelEdit() {
      const { user, isValid } = this.initData();
      this.user = user;
      this.isValid = isValid;

      this.editFlag = false;
    },

    async saveProfile() {
      console.log(this.user);
      try {
        this.validateInput();
        const isInvalid = Object.keys(this.isValid).some(
          key => this.isValid[key] === false
        );
        if (isInvalid) return;

        const isSame = userProps.every(
          key => store.state.user[key] === this.user[key]
        );
        if (isSame) {
          alert("변동 사항이 없습니다.");
          return;
        }

        const { user } = await API.create()
          .put()
          .auth()
          .url(`/users/${store.state.user.id}`)
          .data(this.user)
          .build();

        store.commit("createSession", user);
        const { user: updatedUser, isValid } = this.initData();
        this.user = updatedUser;
        this.isValid = isValid;

        alert("저장되었습니다.");

        this.editFlag = false;
      } catch (error) {
        alert(error.message);
      }
    },

    validateBirthday(payload) {
      if (payload.length === 0) this.user.birthday = "";
      else this.user.birthday = payload[0];
      this.validateInput();
    },

    validateInput() {
      const { user } = store.state;

      if (this.user.name !== user.name) {
        this.isValid.name = this.user.name.length <= 100;
      } else this.isValid.name = undefined;

      if (this.user.birthday !== "" && this.user.birthday !== user.birthday) {
        const birthday = new Date(this.user.birthday);
        this.isValid.birthday = !isNaN(birthday) && birthday < new Date();
      } else this.isValid.birthday = undefined;

      if (this.user.gender !== user.gender) {
        this.isValid.gender = gender.indexOf(this.user.gender) !== -1;
      } else this.isValid.gender = undefined;

      if (this.user.email !== user.email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isValid.email =
          re.test(this.user.email) && this.user.email.length <= 500;
      } else this.isValid.email = undefined;

      if (this.user.mobile !== user.mobile) {
        this.isValid.mobile = this.user.mobile.length <= 100;
      } else this.isValid.mobile = undefined;

      if (this.user.address !== user.address) {
        this.isValid.address = this.user.address.length <= 1000;
      } else this.isValid.address = undefined;
    },

    initData() {
      return userProps.reduce(
        (data, prop) => {
          return {
            user: {
              ...data.user,
              [prop]: store.state.user[prop]
            },
            isValid: {
              ...data.isValid,
              [prop]: undefined
            }
          };
        },
        { user: {}, isValid: {} }
      );
    }
  },
  components: { flatPicker, InputWarning }
};
</script>
<style>
.display-flex {
  display: flex;
}

.btn-save-profile {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
