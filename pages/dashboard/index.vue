<template>
  <div class="dashboard-wrap">
    <ComingSoon
      title="Milaliso dashboard"
      subtitle="Insights and studio operations are on the way."
    />
  </div>
</template>

<script>
import ComingSoon from "~/components/ComingSoon.vue";

export default {
  name: "DashboardIndex",
  layout: "mila",
  components: {
    ComingSoon,
  },
};
</script>

<style scoped>
.dashboard-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
</style>
