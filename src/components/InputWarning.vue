<template>
  <div class="text-muted font-italic">
    <small>
      <span class="text-warning font-weight-700">{{ text }}</span>
    </small>
  </div>
</template>
<script>
export default {
  name: "badge",
  props: {
    text: {
      type: String,
      default: "경고 문구",
      description: "Input 검증 실패시 경고 문구"
    }
  }
};
</script>
<style></style>
