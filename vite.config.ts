import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [react()],
	// Caminhos relativos no build de produção para funcionar corretamente
	// ao publicar em um subdiretório (ex.: GitHub Pages de projeto).
	base: command === 'build' ? './' : '/',
}))
