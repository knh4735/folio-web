<template>
  <div class="login">
    ID <input v-model="username" type="text" name="username" /><br />
    PW <input v-model="password" type="password" name="password" /><br />
    <button @click="login">
      LOGIN
    </button>
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
    login: async function() {
      try {
        const { user, session } = await API.create()
          .post()
          .url(`/sessions`)
          .data({
            username: this.username,
            password: this.password
          })
          .build();

        store.commit("createSession", { user, session });
        localStorage.setItem("user", JSON.stringify(session));

        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>
