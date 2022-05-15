import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      code: 0,
    };
  },
  actions: {
    async login() {
      const data = await axios.get("/a.json");
      let code = data.data.code;
      this.updateCode(code);
    },
    updateCode(code) {
      this.code = code;
    },
  },
});
