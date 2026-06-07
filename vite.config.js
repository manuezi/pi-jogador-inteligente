import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"

import { fileURLToPath, URL } from "url"

const workingDirectory = process.cwd();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), 
      "@two": path.resolve(workingDirectory, "src"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
})
