import { defineStore } from "pinia";

export const useQualityStore = defineStore("quality", {
  state: () => ({
    audits: [
      { id: "q-1", title: "Batch QA - Alpha", score: 92 },
      { id: "q-2", title: "Supplier review", score: 88 },
    ],
    issues: [
      { id: "i-1", summary: "Color variance check", status: "open" },
      { id: "i-2", summary: "Bead size tolerance", status: "closed" },
    ],
  }),
  getters: {
    openIssues(state) {
      return state.issues.filter((i) => i.status === "open");
    },
  },
  actions: {
    logAudit(note) {
      console.log("Quality audit logged:", note);
    },
  },
});
