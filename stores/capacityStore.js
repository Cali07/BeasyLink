import { defineStore } from "pinia";

export const useCapacityStore = defineStore("capacity", {
  state: () => ({
    facilities: [
      { id: "c-1", name: "Plant A", throughput: 120, utilization: 0.6 },
      { id: "c-2", name: "Plant B", throughput: 80, utilization: 0.4 },
    ],
  }),
  getters: {
    averageUtilization(state) {
      if (!state.facilities.length) return 0;
      const total = state.facilities.reduce((sum, f) => sum + f.utilization, 0);
      return Math.round((total / state.facilities.length) * 100);
    },
  },
  actions: {
    rebalance() {
      console.log("Rebalance capacity (mock)");
    },
  },
});
