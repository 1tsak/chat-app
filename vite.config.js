import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process": process,
      "process.env":env,
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
    },
    plugins: [react()],
  };
});
