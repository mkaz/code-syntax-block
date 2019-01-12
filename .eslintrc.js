module.exports = {
	root: true,
	extends: [
		'wordpress'
	],
	env: {
		browser: false,
		node: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2018,
	},
	settings: {
		react: {
			pragma: 'wp'
		}
	}
};
