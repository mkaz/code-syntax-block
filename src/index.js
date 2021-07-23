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

	return {
		...settings,
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'code',
			},
			datalang: {
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
		},
		deprecated: [
			{
				// old attributes
				attributes: {
					...settings.attributes,
					language: {
						type: 'string',
						selector: 'code',
						source: 'attribute',
						attribute: 'lang',
					},
				},
				migrate: ( attributes ) => {
					return {
						...attributes,
						datalang: attributes.language,
					};
				},
				// old save function
				save: ( { attributes } ) => {
					let cls = '';
					cls = attributes.language
						? 'language-' + attributes.language
						: '';
					cls = attributes.lineNumbers ? cls + ' line-numbers' : cls;

					return (
						<pre>
							<code
								lang={ attributes.language }
								className={ cls }
							>
								{ attributes.content }
							</code>
						</pre>
					);
				},
			},
		],
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
