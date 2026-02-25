<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-3">
      <div>
        <div class="text-subtitle-1 font-weight-bold">{{ pattern.name }}</div>
        <div class="text-caption text-medium-emphasis">
          {{ pattern.description || "No description" }}
        </div>
      </div>
      <v-chip size="small" color="primary" variant="tonal">
        {{ formattedDate }}
      </v-chip>
    </div>
    <div class="mb-3">
      <v-chip
        v-for="tag in tagList"
        :key="tag"
        size="small"
        color="grey-lighten-3"
        class="mr-1 mb-1"
      >
        {{ tag }}
      </v-chip>
    </div>
    <div class="d-flex ga-2">
      <v-btn color="primary" variant="elevated" @click="$emit('load', pattern.id)">
        <v-icon start>mdi-folder-open</v-icon>
        Load
      </v-btn>
      <v-btn variant="outlined" color="error" @click="$emit('delete', pattern.id)">
        <v-icon start>mdi-delete</v-icon>
        Delete
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PatternCard",
  props: {
    pattern: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tagList() {
      return (this.pattern.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    },
    formattedDate() {
      return this.pattern.createdAt
        ? new Date(this.pattern.createdAt).toLocaleDateString()
        : "Draft";
    },
  },
};
</script>
