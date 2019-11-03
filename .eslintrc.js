
module.exports = {
	root: true,
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:eslint-comments/recommended',
	],
	plugins: [
		'import',
	],
	globals: {
		wp: 'off',
	},
};
