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
import blockAttributes from './block-attributes';
import deprecated from './deprecated';
import edit from './edit';
import save from './save';

const addSyntaxToCodeBlock = ( settings ) => {
	if ( settings.name !== 'core/code' ) {
		return settings;
	}

	return {
		...settings,
		attributes: { ...blockAttributes },
		deprecated: [ deprecated ],
		edit,
		save,
	};
};

// Register Filter
addFilter(
	'blocks.registerBlockType',
	'mkaz/code-syntax-block',
	addSyntaxToCodeBlock
);
