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
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			pragma: 'wp'
		}
	}
};
