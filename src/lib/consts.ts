export default {
	LOGO: 'https://raw.githubusercontent.com/Modern-Modpacks/assets/main/Icons/Other/kjspkg.png',
	PACKAGES: 'https://raw.githubusercontent.com/Modern-Modpacks/kjspkg/main/pkgs.json',
	AVATARS: 'https://avatars.githubusercontent.com/',
	NO_SIDEBAR: ['/'],
	LOCATOR_REGEX: '([^/@$]*)/([^/@$]*)(@[^/@$]*)?(\\$[^@$]*)?',
	DOCS_URL_REGEX: 'github.com/([^/]+/[^/]+)/blob/(.*)',
	WHERE_TO: {
		'/s': '/',
		'/p': '/s'
	} as { [key: string]: string },
	KJSPKG_README: 'https://github.com/Modern-Modpacks/kjspkg#kjspkg'
	// MR_VALID: 'https://api.modrinth.com/v2/project/',
	// MR_TARGET: 'https://modrinth.com/mod/'
};
