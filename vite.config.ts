import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [tailwindcss(), react()],
	// Caminhos relativos no build de produção para funcionar corretamente
	// ao publicar em um subdiretório (ex.: GitHub Pages de projeto).
	base: command === 'build' ? './' : '/',
}))
