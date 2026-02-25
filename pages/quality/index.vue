<template>
  <div>
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">Quality</h1>
        <p class="text-body-1 text-medium-emphasis">
          QA controls, audits, and scorecards for releases.
        </p>
      </v-col>
    </v-row>
    <ComingSoon title="Quality module" subtitle="Coming soon." />
  </div>
</template>

<script>
definePageMeta({
  layout: "mila",
});

import ComingSoon from "~/components/ComingSoon.vue";

export default {
  name: "QualityPage",
  components: { ComingSoon },
};
</script>
