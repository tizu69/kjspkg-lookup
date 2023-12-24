import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const ThemeKJSPKG: CustomThemeConfig = {
	name: 'kjspkg',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '12px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #c37ee5
		'--color-primary-50': '246 236 251', // #f6ecfb
		'--color-primary-100': '243 229 250', // #f3e5fa
		'--color-primary-200': '240 223 249', // #f0dff9
		'--color-primary-300': '231 203 245', // #e7cbf5
		'--color-primary-400': '213 165 237', // #d5a5ed
		'--color-primary-500': '195 126 229', // #c37ee5
		'--color-primary-600': '176 113 206', // #b071ce
		'--color-primary-700': '146 95 172', // #925fac
		'--color-primary-800': '117 76 137', // #754c89
		'--color-primary-900': '96 62 112', // #603e70
		// secondary | #4e355a
		'--color-secondary-50': '228 225 230', // #e4e1e6
		'--color-secondary-100': '220 215 222', // #dcd7de
		'--color-secondary-200': '211 205 214', // #d3cdd6
		'--color-secondary-300': '184 174 189', // #b8aebd
		'--color-secondary-400': '131 114 140', // #83728c
		'--color-secondary-500': '78 53 90', // #4e355a
		'--color-secondary-600': '70 48 81', // #463051
		'--color-secondary-700': '59 40 68', // #3b2844
		'--color-secondary-800': '47 32 54', // #2f2036
		'--color-secondary-900': '38 26 44', // #261a2c
		// tertiary | #000000
		'--color-tertiary-50': '217 217 217', // #d9d9d9
		'--color-tertiary-100': '204 204 204', // #cccccc
		'--color-tertiary-200': '191 191 191', // #bfbfbf
		'--color-tertiary-300': '153 153 153', // #999999
		'--color-tertiary-400': '77 77 77', // #4d4d4d
		'--color-tertiary-500': '0 0 0', // #000000
		'--color-tertiary-600': '0 0 0', // #000000
		'--color-tertiary-700': '0 0 0', // #000000
		'--color-tertiary-800': '0 0 0', // #000000
		'--color-tertiary-900': '0 0 0', // #000000
		// success | #7EB77F
		'--color-success-50': '236 244 236', // #ecf4ec
		'--color-success-100': '229 241 229', // #e5f1e5
		'--color-success-200': '223 237 223', // #dfeddf
		'--color-success-300': '203 226 204', // #cbe2cc
		'--color-success-400': '165 205 165', // #a5cda5
		'--color-success-500': '126 183 127', // #7EB77F
		'--color-success-600': '113 165 114', // #71a572
		'--color-success-700': '95 137 95', // #5f895f
		'--color-success-800': '76 110 76', // #4c6e4c
		'--color-success-900': '62 90 62', // #3e5a3e
		// warning | #000000
		'--color-warning-50': '217 217 217', // #d9d9d9
		'--color-warning-100': '204 204 204', // #cccccc
		'--color-warning-200': '191 191 191', // #bfbfbf
		'--color-warning-300': '153 153 153', // #999999
		'--color-warning-400': '77 77 77', // #4d4d4d
		'--color-warning-500': '0 0 0', // #000000
		'--color-warning-600': '0 0 0', // #000000
		'--color-warning-700': '0 0 0', // #000000
		'--color-warning-800': '0 0 0', // #000000
		'--color-warning-900': '0 0 0', // #000000
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #240637
		'--color-surface-50': '222 218 225', // #dedae1
		'--color-surface-100': '211 205 215', // #d3cdd7
		'--color-surface-200': '200 193 205', // #c8c1cd
		'--color-surface-300': '167 155 175', // #a79baf
		'--color-surface-400': '102 81 115', // #665173
		'--color-surface-500': '36 6 55', // #240637
		'--color-surface-600': '32 5 50', // #200532
		'--color-surface-700': '27 5 41', // #1b0529
		'--color-surface-800': '22 4 33', // #160421
		'--color-surface-900': '18 3 27' // #12031b
	}
};
