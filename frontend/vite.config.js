import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /*   server: {
    port: 6600,
    host: "192.168.100.254",
  }, */
});
