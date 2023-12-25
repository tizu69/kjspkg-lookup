export default {
	LOGO: 'https://raw.githubusercontent.com/Modern-Modpacks/assets/main/Icons/Other/kjspkg.png',
	PACKAGES: 'https://raw.githubusercontent.com/Modern-Modpacks/kjspkg/main/pkgs.json',
	AVATARS: 'https://avatars.githubusercontent.com/',
	NO_SIDEBAR: ['/', '/s/[query]'],
	LOCATOR_REGEX: '([^/@$]*)/([^/@$]*)(@[^/@$]*)?(\\$[^@$]*)?',
	DOCS_URL_REGEX: 'github.com/([^/]+/[^/]+)/blob/(.*)',
	WHERE_TO: {
		'/s/[query]': '/',
		'/p/[package]': '/s/*'
	} as { [key: string]: string },
	// MR_VALID: 'https://api.modrinth.com/v2/project/',
	// MR_TARGET: 'https://modrinth.com/mod/'
};
