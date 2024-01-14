import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
  };
});