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
      type="danger"
      size="lg"
      icon="ni ni-button-power"
    >
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
<style>
a.text-white:hover,
a.text-white:focus {
  color: #fff !important;
}
</style>
