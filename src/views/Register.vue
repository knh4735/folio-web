<template>
  <div class="row justify-content-center">
    <div class="col-lg-12 col-md">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form">
            <div class="row">
              <div class="col justify-content-center d-flex-column">
                <div class="text-center text-muted mb-4">
                  <small>필수 정보</small>
                </div>
                <base-input
                  v-model="user.username"
                  class="input-group-alternative mb-3"
                  placeholder="아이디"
                  addon-left-icon="ni ni-single-02"
                  :valid="isValid.username"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.username"
                  text="아이디는 영문과 숫자가 포함되며, 6~12자 입니다."
                />

                <base-input
                  v-model="user.password"
                  class="input-group-alternative mb-3"
                  placeholder="비밀번호"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  :valid="isValid.password"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.password"
                  text="비밀번호는 공백없이 8자 이상이어야 합니다."
                />

                <base-input
                  v-model="passwordCheck"
                  class="input-group-alternative mb-3"
                  placeholder="비밀번호 확인"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  :valid="isValid.passwordCheck"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.passwordCheck"
                  text="비밀번호가 일치하지 않습니다."
                />
              </div>

              <div class="col">
                <div class="text-center text-muted mb-4">
                  <small
                    >선택 정보 (포트폴리오의 기본 정보로 사용할 수
                    있습니다)</small
                  >
                </div>

                <base-input
                  v-model="user.name"
                  class="input-group-alternative mb-3"
                  placeholder="이름"
                  addon-left-icon="ni ni-badge"
                  :valid="isValid.name"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.name"
                  text="이름은 100자 이내로 입력해주세요."
                />

                <base-input
                  class="input-group-alternative mb-3"
                  addon-left-icon="ni ni-calendar-grid-58"
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

                <div
                  class="form-group input-group-alternative mb-3 input-group"
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <slot name="addonLeft">
                        <i class="ni ni-favourite-28"></i>
                      </slot>
                    </span>
                  </div>
                  <select
                    class="form-control"
                    v-model="user.gender"
                    style="flex:1; padding-left: 0;"
                    :valid="isValid.gender"
                    @change="validateInput"
                  >
                    <option :value="undefined">성별</option>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                  </select>
                </div>

                <input-warning
                  v-if="isInvalid.gender"
                  text="유효하지 않은 성별입니다."
                />

                <base-input
                  v-model="user.email"
                  type="email"
                  class="input-group-alternative mb-3"
                  placeholder="이메일 주소"
                  addon-left-icon="ni ni-email-83"
                  :valid="isValid.email"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.email"
                  text="이메일 주소 형식에 맞게 입력해주세요."
                />

                <base-input
                  v-model="user.mobile"
                  type="number"
                  class="input-group-alternative mb-3"
                  placeholder="휴대폰 번호"
                  addon-left-icon="ni ni-mobile-button"
                  :valid="isValid.mobile"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.mobile"
                  text="전화번호는 100자 이내로 입력해주세요."
                />

                <base-input
                  v-model="user.address"
                  class="input-group-alternative mb-3"
                  placeholder="주소"
                  addon-left-icon="ni ni-square-pin"
                  :valid="isValid.address"
                  @change="validateInput"
                />

                <input-warning
                  v-if="isInvalid.address"
                  text="주소는 1000자 이내로 입력해주세요."
                />
              </div>
            </div>

            <div class="row my-4">
              <div class="col-12">
                <!-- <base-checkbox class="custom-control-alternative">
                  <span class="text-muted"
                    >I agree with the <a href="#!">Privacy Policy</a></span
                  >
                </base-checkbox> -->
              </div>
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="register">
                가입하기
              </base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <!-- <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div> -->
        <div class="col-12 text-right">
          <router-link to="/login" class="text-light">
            <small>계정이 있으신가요?</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/lib/api";
import store from "@/store";
import router from "@/router";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import InputWarning from "@/components/InputWarning.vue";

const gender = ["남자", "여자"];

export default {
  name: "Register",
  components: { flatPicker, InputWarning },
  data: function() {
    return {
      passwordCheck: "",
      user: {
        username: "",
        password: "",
        name: "",
        birthday: "",
        gender: undefined,
        email: "",
        mobile: "",
        address: ""
      },
      isValid: {
        username: undefined,
        password: undefined,
        passwordCheck: undefined,
        name: undefined,
        birthday: undefined,
        gender: undefined,
        email: undefined,
        mobile: undefined,
        address: undefined
      }
    };
  },
  computed: {
    isInvalid: function() {
      return Object.keys(this.isValid).reduce((ret, key) => {
        ret[key] = this.isValid[key] !== undefined && !this.isValid[key];
        return ret;
      }, {});
    }
  },
  methods: {
    register: async function() {
      try {
        this.validateInput();
        const isValid = Object.keys(this.isValid).reduce((flag, key) => {
          if (
            key === "username" ||
            key === "password" ||
            key == "passwordCheck"
          )
            return flag && this.isValid[key];

          return flag && this.isValid[key] !== false;
        }, true);
        if (!isValid) return;

        const { user, session } = await API.create()
          .post()
          .url(`/users`)
          .data(this.user)
          .build();

        store.commit("createSession", user);
        localStorage.setItem("user", JSON.stringify(session));

        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    validateBirthday: function(payload) {
      if (payload.length === 0) this.user.birthday = "";
      else this.user.birthday = payload[0];
      this.validateInput();
    },
    validateInput: function() {
      if (this.user.username !== "") {
        const re = /^[a-z]+[a-z0-9]{0,13}$/;
        this.isValid.username =
          re.test(this.user.username) &&
          this.user.username.length >= 6 &&
          this.user.username.length <= 12;
      }

      if (this.user.password !== "") {
        this.isValid.password =
          this.user.password.length >= 8 &&
          this.user.password.indexOf(" ") === -1;
      }

      if (this.passwordCheck !== "" && this.user.password !== "") {
        this.isValid.passwordCheck = this.passwordCheck === this.user.password;
      } else this.isValid.passwordCheck = undefined;

      if (this.user.name !== "") {
        this.isValid.name = this.user.name.length <= 100;
      } else this.isValid.name = undefined;

      if (this.user.birthday !== "") {
        const birthday = new Date(this.user.birthday);
        this.isValid.birthday = !isNaN(birthday) && birthday < new Date();
      } else this.isValid.birthday = undefined;

      if (this.user.gender !== undefined) {
        this.isValid.gender = gender.indexOf(this.user.gender) !== -1;
      } else this.isValid.gender = undefined;

      if (this.user.email !== "") {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isValid.email =
          re.test(this.user.email) && this.user.email.length <= 500;
      } else this.isValid.email = undefined;

      if (this.user.mobile !== "") {
        this.isValid.mobile = this.user.mobile.length <= 100;
      } else this.isValid.mobile = undefined;

      if (this.user.address !== "") {
        this.isValid.address = this.user.address.length <= 1000;
      } else this.isValid.address = undefined;
    }
  }
};
</script>
<style></style>
