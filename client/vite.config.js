import path from "path";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    build: {
      sourcemap: true, // Enable source maps
      rollupOptions: {
        output: {
          sourcemap: true, // Ensure Rollup generates source maps
        },
      },
    },
  },
});
