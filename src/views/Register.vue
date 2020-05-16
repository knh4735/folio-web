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
                  class="input-group-alternative mb-3"
                  placeholder="아이디"
                  addon-left-icon="ni ni-single-02"
                  v-model="user.username"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="비밀번호"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="user.password"
                  @change="checkPassword"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="비밀번호 확인"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="passwordCheck"
                  @change="checkPassword"
                >
                </base-input>

                <div class="text-muted font-italic" v-if="isPasswordSame === 1">
                  <small>
                    <span class="text-warning font-weight-700"
                      >비밀번호가 일치하지 않습니다.</span
                    >
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="text-center text-muted mb-4">
                  <small
                    >선택 정보 (포트폴리오의 기본 정보로 사용할 수
                    있습니다)</small
                  >
                </div>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="이름"
                  addon-left-icon="ni ni-badge"
                  v-model="user.name"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="생년월일"
                  addon-left-icon="ni ni-calendar-grid-58"
                  v-model="user.birthday"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="성별"
                  addon-left-icon="ni ni-favourite-28"
                  v-model="user.gender"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="이메일 주소"
                  addon-left-icon="ni ni-email-83"
                  v-model="user.email"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="휴대폰 번호"
                  addon-left-icon="ni ni-mobile-button"
                  v-model="user.mobile"
                >
                </base-input>

                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="주소"
                  addon-left-icon="ni ni-square-pin"
                  v-model="user.address"
                >
                </base-input>

                <div class="text-muted font-italic">
                  <small
                    >password strength:
                    <span class="text-success font-weight-700"
                      >strong</span
                    ></small
                  >
                </div>
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
              <base-button type="primary" class="my-4" @click="register"
                >가입하기</base-button
              >
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

export default {
  name: "register",
  data: function() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        birthday: "",
        gender: "",
        email: "",
        mobile: "",
        address: ""
      },
      passwordCheck: "",
      isPasswordSame: 0 // 0: 둘 중 하나가 빈값 / 1: 다름 / 2: 같음
    };
  },
  methods: {
    register: async function() {
      try {
        const { user, session } = await API.create()
          .post()
          .url(`/users`)
          .data(this.user)
          .build();

        store.commit("createSession", { user, session });
        localStorage.setItem("user", JSON.stringify(session));

        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    checkPassword: function() {
      if (this.passwordCheck === "" || this.user.password === "") {
        this.isPasswordSame = 0;
        return false;
      }

      if (this.passwordCheck !== this.user.password) {
        this.isPasswordSame = 1;
        return false;
      }

      this.isPasswordSame = 2;
      return true;
    }
  }
};
</script>
<style></style>
