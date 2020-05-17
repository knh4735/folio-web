<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form">
            <div class="text-center text-muted mb-4"></div>
            <base-input
              class="input-group-alternative mb-3"
              placeholder="아이디"
              addon-left-icon="ni ni-email-83"
              v-model="user.username"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="비밀번호"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="user.password"
            >
            </base-input>
            <!-- <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox> -->
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="login"
                >로그인</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <!-- <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div> -->
        <div class="col-12 text-right">
          <router-link to="/register" class="text-light">
            <small>계정이 없으신가요?</small>
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
  name: "login",
  data: function() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login: async function() {
      if (this.user.username === "" || this.user.password === "") {
        alert("아이디, 비밀번호를 정확히 입력해주세요.");
        return;
      }

      try {
        const { user, session } = await API.create()
          .post()
          .url(`/sessions`)
          .data(this.user)
          .build();

        store.commit("createSession", user);
        localStorage.setItem("user", JSON.stringify(session));

        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>
<style></style>
