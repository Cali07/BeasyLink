<template>
  <v-dialog v-model="open" max-width="650">
    <template #activator="{ props }">
      <v-btn color="primary" variant="tonal" v-bind="props">
        <v-icon start>mdi-file-import</v-icon>
        Import JSON
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Import pattern from JSON
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          border="start"
          class="mb-3"
        >
          {{ error }}
        </v-alert>

        <v-file-input
          label="Upload .json file"
          accept=".json,application/json"
          variant="outlined"
          prepend-icon="mdi-upload"
          @change="onFileChange"
        />

        <v-textarea
          v-model="jsonText"
          class="mt-3"
          label="Paste JSON"
          variant="outlined"
          auto-grow
          rows="6"
        />

        <div class="mt-4">
          <div class="text-subtitle-1 font-weight-bold mb-2">Preview</div>
          <v-alert variant="tonal" type="info" border="start">
            <div>Name: {{ preview.name || "—" }}</div>
            <div>Description: {{ preview.desc || "—" }}</div>
            <div>Palette colors: {{ preview.paletteCount }}</div>
            <div>Grid: {{ preview.heightCount }} x {{ preview.widthCount }}</div>
          </v-alert>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="open = false">Cancel</v-btn>
        <v-btn variant="tonal" color="primary" @click="validateJson">
          Validate
        </v-btn>
        <v-btn color="primary" :disabled="!parsed" @click="importJson">
          Import
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "JsonImportDialog",
  data() {
    return {
      open: false,
      jsonText: "",
      parsed: null,
      error: "",
    };
  },
  computed: {
    ...mapStores(useBeadographerStore),
    preview() {
      return {
        name: this.parsed?.name,
        desc: this.parsed?.desc,
        paletteCount: this.parsed?.palette?.length || 0,
        widthCount: this.parsed?.widthCount || 0,
        heightCount: this.parsed?.heightCount || 0,
      };
    },
  },
  methods: {
    onFileChange(fileList) {
      const file = Array.isArray(fileList) ? fileList[0] : fileList;
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.jsonText = e.target.result || "";
      };
      reader.readAsText(file);
    },
    validateJson() {
      this.error = "";
      this.parsed = null;
      if (!this.jsonText.trim()) {
        this.error = "Please paste JSON or upload a file.";
        return;
      }
      try {
        const parsed = JSON.parse(this.jsonText);
        const required = ["name", "desc", "palette", "beadString", "widthCount", "heightCount"];
        required.forEach((key) => {
          if (!Object.prototype.hasOwnProperty.call(parsed, key)) {
            throw new Error(`Missing key: ${key}`);
          }
        });
        this.parsed = parsed;
      } catch (e) {
        this.error = e.message || "Invalid JSON";
      }
    },
    importJson() {
      if (!this.parsed) {
        this.validateJson();
        if (!this.parsed) return;
      }
      try {
        this.beadographerStore.importFromJson(this.parsed);
        this.open = false;
      } catch (e) {
        this.error = e.message || "Import failed";
      }
    },
  },
};
</script>
