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

const addSyntaxToCodeBlock = ( settings ) => {
	if ( settings.name !== 'core/code' ) {
		return settings;
	}

	const blockAttributes = {
		...settings.attributes,
		language: {
			type: 'string',
			selector: 'code',
			source: 'attribute',
			attribute: 'data-lang',
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
	};

	return {
		...settings,

		attributes: blockAttributes,

		deprecated: [{
			// old attributes
			attributes: {
				...blockAttributes,
				language: {
					type: 'string',
					selector: 'code',
					source: 'attribute',
					attribute: 'lang',
				},
			},
			migrate: ( attributes ) => { return attributes; },
			// old save function
			save: ( { attributes } ) => {
				let cls = '';
				cls = ( attributes.language ) ? 'language-' + attributes.language : '';
				cls = ( attributes.lineNumbers ) ? cls + ' line-numbers' : cls;
				return (
					<pre title={ attributes.title }>
						<code lang={ attributes.language } className={ cls }>
							{ attributes.content }
						</code>
					</pre>
				);
			},
		}],

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
