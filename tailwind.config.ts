const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
import { skeleton } from '@skeletonlabs/tw-plugin';

import { join } from 'path';
import type { Config } from 'tailwindcss';

import { ThemeKJSPKG } from './src/themes/kjspkg';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [ThemeKJSPKG]
			}
		})
	]
} satisfies Config;

export default config;
