// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

// root = resolve(__dirname, "src");
// outDir = resolve(__dirname, "dist");
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        get_involveed: resolve(__dirname, "get-involved/index.html"),
        visit: resolve(__dirname, "visit/index.html"),
        learn: resolve(__dirname, "learn/index.html"),
      },
    },
  },
});
