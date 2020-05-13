<template>
  <div class="login">
    ID <input type="text" name="username" v-model="username" /><br />
    PW <input type="password" name="password" v-model="password" /><br />
    <button v-on:click="register">REGISTER</button>
  </div>
</template>

<script>
import API from "@/lib/api";
import store from "@/store";
import router from "@/router";

export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    register: async function() {
      try {
        const {
          data: {
            data: { user, session }
          }
        } = await API.create()
          .post()
          .url(`/users`)
          .data({
            username: this.username,
            password: this.password
          })
          .build();

        store.commit("createSession", { user, session });

        router.push("/");
      } catch (error) {
        console.log(error);
        alert("에러발생");
      }
    }
  }
};
</script>
