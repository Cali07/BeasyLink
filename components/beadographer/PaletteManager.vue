<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Palette Manager</h3>
        <div class="text-body-2 text-medium-emphasis">
          Manage bead colors and symbols. Click to select.
        </div>
      </div>
      <v-btn color="primary" @click="dialog = true">
        <v-icon start>mdi-plus</v-icon>
        Add Color
      </v-btn>
    </div>

    <v-row>
      <v-col
        v-for="color in beadographerStore.palette"
        :key="color.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="pa-4 position-relative"
          :elevation="color.id === beadographerStore.selectedColorId ? 6 : 1"
          :color="color.id === beadographerStore.selectedColorId ? 'primary-lighten-5' : 'white'"
          @click="beadographerStore.setSelectedColor(color.id)"
        >
          <v-btn
            icon="mdi-close"
            variant="text"
            color="grey"
            size="small"
            class="position-absolute"
            style="top: 8px; right: 8px"
            @click.stop="removeColor(color.id)"
          />
          <div class="d-flex align-center mb-3">
            <v-avatar size="46" :color="color.hex">
              <span class="text-subtitle-1 font-weight-bold">
                {{ color.symbol }}
              </span>
            </v-avatar>
            <div class="ml-3">
              <div class="font-weight-bold text-body-1">{{ color.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ color.hex }}</div>
            </div>
          </div>
          <v-chip
            size="small"
            color="primary"
            variant="tonal"
            class="mr-2"
            label
          >
            Symbol: {{ color.symbol }}
          </v-chip>
          <v-chip size="small" variant="outlined" label>
            Click to select
          </v-chip>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="520">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          Add palette color
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newColor.name"
                label="Name"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newColor.hex"
                label="Hex color"
                variant="outlined"
                prepend-inner-icon="mdi-palette"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newColor.symbol"
                label="Symbol (A-Z / 0-9)"
                variant="outlined"
                maxlength="3"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="addColor">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "PaletteManager",
  data() {
    return {
      dialog: false,
      newColor: {
        name: "",
        hex: "#cccccc",
        symbol: "X",
      },
    };
  },
  computed: {
    ...mapStores(useBeadographerStore),
  },
  methods: {
    addColor() {
      if (!this.newColor.name || !this.newColor.symbol) return;
      this.beadographerStore.addColor({
        name: this.newColor.name,
        hex: this.newColor.hex,
        symbol: this.newColor.symbol.toUpperCase(),
      });
      this.dialog = false;
      this.newColor = { name: "", hex: "#cccccc", symbol: "X" };
    },
    removeColor(id) {
      this.beadographerStore.removeColor(id);
    },
  },
};
</script>
