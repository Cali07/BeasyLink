<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn color="primary" variant="outlined" v-bind="props">
        <v-icon start>mdi-file-export</v-icon>
        Export JSON
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="downloadJson">
        <v-list-item-title>
          <v-icon start color="primary">mdi-download</v-icon>
          Download file
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="copyJson">
        <v-list-item-title>
          <v-icon start color="primary">mdi-content-copy</v-icon>
          Copy to clipboard
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "JsonExportButton",
  computed: {
    ...mapStores(useBeadographerStore),
  },
  methods: {
    downloadJson() {
      const payload = this.beadographerStore.exportToJson();
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${payload.name || "pattern"}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    async copyJson() {
      const payload = this.beadographerStore.exportToJson();
      try {
        await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      } catch (e) {
        console.error("Clipboard copy failed", e);
      }
    },
  },
};
</script>
