import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    host: "0.0.0.0", // Allow access from external networks
    port: 5173, // Use Vite's default port or your preferred one
  },
  preview: {
    allowedHosts: ["todo-list-application-4.onrender.com"], // Add Render's domain
  },
});
