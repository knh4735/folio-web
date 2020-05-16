<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <div class="ml-lg-auto"></div>
    <base-button
      tag="a"
      href="/logout"
      type="secondary"
      size="sm"
      icon="ni ni-button-power"
    >
      로그아웃
    </base-button>
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false
    };
  }
};
</script>
