import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // enables access via IP
    port: 5174,        // change to your desired port
  },
  worker: {
    format: 'es',
  },
})

