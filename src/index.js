/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/* global mkaz_code_syntax_default_lang */

const defaultLang = ( mkaz_code_syntax_default_lang ) ? mkaz_code_syntax_default_lang : '';

const addSyntaxToCodeBlock = ( settings ) => {
	if ( settings.name !== 'core/code' ) {
		return settings;
	}

	const newCodeBlockSettings = {
		...settings,

		attributes: {
			...settings.attributes,
			language: {
				type: 'string',
				selector: 'code',
				source: 'attribute',
				attribute: 'lang',
				default: defaultLang,
			},
			lineNumbers: {
				type: 'boolean',
			},
			title: {
				type: 'string',
				source: 'attribute',
				selector: 'pre',
				attribute: 'title',
			},
		},
		edit,
		save,
	};

	return newCodeBlockSettings;
};

// Register Filter
addFilter(
	'blocks.registerBlockType',
	'mkaz/code-syntax-block',
	addSyntaxToCodeBlock
);
