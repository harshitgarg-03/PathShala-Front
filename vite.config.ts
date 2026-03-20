import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ✅ Important for build + preview
  base: "./",

  server: {
    host: "0.0.0.0",
    port: 5173,

    // ✅ allow external hosts (Render / Vercel)
    allowedHosts: true,

    // 🔥 PROXY (avoid CORS in dev)
    proxy: {
      "/api": {
        target: "https://pathshala-backend-seven.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  preview: {
    port: 4173,
    host: true,
  },
});