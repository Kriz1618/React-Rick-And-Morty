import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from "vite-plugin-eslint";


// https://vitejs.dev/config/
export default defineConfig({
  base: "https://github.com/Kriz1618/React-Rick-And-Morty/",
  plugins: [react()]
});
