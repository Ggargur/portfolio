import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const port = Number(process.env.PORT) || 3000;
const allowedHosts = ['portifolio-xheo.onrender.com'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Development server (kept reachable on Render until its start command is switched to `npm start`).
  server: { host: '0.0.0.0', port, allowedHosts },
  // Production on Render: `npm run build` then `npm start` serves the built `dist/`.
  preview: { host: '0.0.0.0', port, allowedHosts },
});
