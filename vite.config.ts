import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import autoImport from 'sveltekit-autoimport';

// autoImport({
// 	components: { name: './src/lib', flat: true }
//   })
  
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
