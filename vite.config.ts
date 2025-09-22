import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
