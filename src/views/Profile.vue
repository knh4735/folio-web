<template>
  <div class="content">
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-6 order-xl-1 center">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">내 정보</h3>
                </div>
              </div>
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

            <div class="form-group input-group-alternative mb-3 input-group">
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
                <option :value="null">성별</option>
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
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="save">
                저장
              </base-button>
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
  components: { flatPicker, InputWarning },
  data: function() {
    return this.initData();
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
    save: async function() {
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
    initData: function() {
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
  }
};
</script>
<style></style>
