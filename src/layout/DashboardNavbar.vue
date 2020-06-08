<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <div class="ml-lg-auto"></div>
    <base-button
      v-show="isUser"
      tag="a"
      href="/logout"
      type="danger"
      size="lg"
      icon="ni ni-button-power"
    >
    </base-button>
    <base-button
      v-show="!isUser"
      tag="a"
      href="/login"
      type="info"
      size="sm"
      icon="ni ni-circle-08"
    >
      로그인/회원가입
    </base-button>
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false
    };
  },
  props: {
    isUser: {
      type: Boolean,
      description: "로그인한 사용자인지",
      default: true
    }
  }
};
</script>
<style>
a.text-white:hover,
a.text-white:focus {
  color: #fff !important;
}
</style>
