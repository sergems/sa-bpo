import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import express from "express";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import { createCalculatorIntakeRouter } from "./server/calculator-intake";

const calculatorApi: Plugin = {
  name: "bpo-calculator-intake-api",
  configureServer(server) {
    const api = express();
    api.set("trust proxy", process.env.TRUST_PROXY === "true");
    api.use(express.json({ limit: "12kb" }));
    api.use("/api", createCalculatorIntakeRouter());
    server.middlewares.use(api);
  },
  configurePreviewServer(server) {
    const api = express();
    api.set("trust proxy", process.env.TRUST_PROXY === "true");
    api.use(express.json({ limit: "12kb" }));
    api.use("/api", createCalculatorIntakeRouter());
    server.middlewares.use(api);
  },
};

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["iOS >= 11", "Safari >= 11", "defaults", "not IE 11"],
    }),
    tailwindcss(),
    calculatorApi,
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
    allowedHosts: ["3000-imrbko21qjq6jli4gxek3-9f909201.us5.manus.computer", "3000-idv698pk2qr612sw83pok-06dbe1b8.us2.manus.computer", "3000-ie1v1dresq1jyjtyvz1hf-a9e1b051.us1.manus.computer", "5173-ihemikpc4qu5jdmig3w5h-d36406ae.us1.manus.computer", "3000-i29s7v2ag2b879itp9fla-1ab58dee.us1.manus.computer", "3000-ij26r66h01es9yatk8u72-270f75f7.us1.manus.computer"],
  },
});
