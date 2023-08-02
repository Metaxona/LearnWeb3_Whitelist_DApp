import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/LearnWeb3_Whitelist_DApp/",
  plugins: [react()],
})
