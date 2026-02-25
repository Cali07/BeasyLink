<template>
  <div>
    <v-btn color="primary" variant="elevated" @click="dialog = true">
      <v-icon start>mdi-creation</v-icon>
      Generate pattern
    </v-btn>

    <v-dialog v-model="dialog" max-width="760">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          Pattern assistant
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="productType"
                :items="productTypes"
                item-title="title"
                item-value="value"
                label="Product type"
                variant="outlined"
                density="comfortable"
                @update:modelValue="syncWidthOption"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="widthOption"
                :items="widthOptions"
                item-title="label"
                item-value="value"
                label="Width (beads)"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="lengthOption"
                :items="lengthOptions"
                item-title="label"
                item-value="value"
                label="Length (beads)"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <v-textarea
            v-model="inspirationText"
            label="Inspiration text"
            variant="outlined"
            density="comfortable"
            rows="3"
          />

          <v-file-input
            v-model="imageFiles"
            label="Inspiration images"
            variant="outlined"
            density="comfortable"
            multiple
            accept="image/*"
            prepend-icon="mdi-image"
          />

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            class="mt-4"
          >
            {{ errorMessage }}
          </v-alert>

          <v-textarea
            v-if="assistantOutput"
            v-model="assistantOutput"
            class="mt-4"
            label="Assistant output"
            variant="outlined"
            rows="10"
            readonly
          />
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Close</v-btn>
          <v-btn color="primary" :loading="loading" @click="handleGenerate">
            Generate
          </v-btn>
          <v-btn
            v-if="parsedPattern"
            color="secondary"
            variant="elevated"
            @click="applyPattern"
          >
            Apply to grid
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { generatePatternAssistant, buildPatternPrompt } from "~/utils/patternAssistant";
import { useBeadographerStore } from "~/stores/beadographerStore";

const widthOptionsByType = {
  BR: [
    { label: "Slim (12-28)", value: 20 },
    { label: "Classic (29-44)", value: 36 },
    { label: "Broadband (45-60)", value: 52 },
  ],
  NF: [{ label: "Classic (16)", value: 16 }],
  ER: [
    { label: "Broadband (24)", value: 24 },
    { label: "Classic (21-24)", value: 22 },
  ],
};

const lengthOptions = [
  { label: "Short (60)", value: 60 },
  { label: "Standard (80)", value: 80 },
  { label: "Long (100)", value: 100 },
  { label: "Extra (120)", value: 120 },
];

export default {
  name: "PatternAssistantDialog",
  data() {
    return {
      dialog: false,
      loading: false,
      errorMessage: "",
      assistantOutput: "",
      parsedPattern: null,
      productType: "BR",
      widthOption: 20,
      lengthOption: 80,
      inspirationText: "",
      imageFiles: [],
      productTypes: [
        { title: "BR", value: "BR" },
        { title: "NF", value: "NF" },
        { title: "ER", value: "ER" },
      ],
      lengthOptions,
    };
  },
  computed: {
    widthOptions() {
      return widthOptionsByType[this.productType] || [];
    },
  },
  methods: {
    syncWidthOption() {
      const first = this.widthOptions[0];
      this.widthOption = first ? first.value : null;
    },
    async handleGenerate() {
      this.loading = true;
      this.errorMessage = "";
      this.assistantOutput = "";
      this.parsedPattern = null;

      try {
        const images = await Promise.all(
          (this.imageFiles || []).map((file) => this.readFileAsDataUrl(file))
        );

        const widthLabel =
          this.widthOptions.find((opt) => opt.value === this.widthOption)?.label || "";
        const lengthLabel =
          this.lengthOptions.find((opt) => opt.value === this.lengthOption)?.label || "";

        const prompt = buildPatternPrompt({
          productType: this.productType,
          widthLabel,
          widthCount: this.widthOption,
          lengthLabel,
          heightCount: this.lengthOption,
          inspirationText: this.inspirationText,
        });

        const result = await generatePatternAssistant({
          prompt,
          images,
        });

        this.assistantOutput = result?.raw || "";
        this.parsedPattern = this.safeParseJson(this.assistantOutput);
      } catch (error) {
        this.errorMessage = error?.message || "Failed to generate pattern.";
      } finally {
        this.loading = false;
      }
    },
    applyPattern() {
      if (!this.parsedPattern) return;
      const store = useBeadographerStore();
      try {
        store.importFromJson(this.parsedPattern);
      } catch (error) {
        this.errorMessage = error?.message || "Failed to apply pattern.";
      }
    },
    safeParseJson(text) {
      try {
        return JSON.parse(text);
      } catch (error) {
        return null;
      }
    },
    readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>
