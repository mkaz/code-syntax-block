/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import store from './store';

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
