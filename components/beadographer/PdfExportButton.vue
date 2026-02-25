<template>
  <v-btn color="primary" variant="elevated" @click="exportPdf">
    <v-icon start>mdi-file-pdf-box</v-icon>
    Export PDF
  </v-btn>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "PdfExportButton",
  computed: {
    ...mapStores(useBeadographerStore),
  },
  methods: {
    async exportPdf() {
      await this.beadographerStore.generatePDF();
    },
  },
};
</script>
