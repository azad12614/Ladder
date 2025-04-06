// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:5000",
        target: "https://ladder-backend.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
