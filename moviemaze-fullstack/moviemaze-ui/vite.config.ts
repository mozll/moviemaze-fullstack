import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Check if it's a build (production) command
  const isBuild = command === "build";

  return {
    base: "/",
    plugins: [react()],
    optimizeDeps: {
      include: ["application/javascript"],
    },
    define: {
      // Only define VITE_API_KEY for the build
      ...(isBuild && {
        "import.meta.env.VITE_API_KEY": JSON.stringify(
          process.env.VITE_API_KEY
        ),
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
          process.env.VITE_API_BASE_URL
        ),
      }),
    },
  };
});
