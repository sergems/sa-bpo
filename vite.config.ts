import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["iOS >= 11", "Safari >= 11", "defaults", "not IE 11"],
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  root: path.resolve(__dirname, "client"),

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
    allowedHosts: ["3000-imrbko21qjq6jli4gxek3-9f909201.us5.manus.computer", "3000-idv698pk2qr612sw83pok-06dbe1b8.us2.manus.computer", "3000-ie1v1dresq1jyjtyvz1hf-a9e1b051.us1.manus.computer"],
  },
});
