/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const  el = wp.element.createElement;
const { PlainText, InspectorControls } = wp.editor;
const { SelectControl } = wp.components;

const editorStyle = { fontFamily: 'sans-serif', fontSize: '10px', color: '#999999', textAlign: 'right' };

let langs = {};

for ( let lang in prismLanguages ) {
	if (  ! prismLanguages.hasOwnProperty( lang ) ) { continue; }
	if ( typeof prismLanguages[lang].title !== 'undefined' ) {
		langs[lang] = __( prismLanguages[lang].title, 'code-syntax-block' );
	}
}

const addSyntaxToCodeBlock = settings => {
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
				attribute: 'lang'
			}
		},

		edit({ attributes, setAttributes, isSelected, className }) {

			const updateLanguage = language => {
				setAttributes({ language });
			};

			return [
				el( InspectorControls, { key: 'controls' },
					el( SelectControl, {
						label: "Language",
						value: attributes.language,
						options: [ {
								label: __( 'Select code language', 'code-syntax-block' ),
								value: '',
							}].concat (
								Object.keys( langs ).map( ( lang ) => (
									{ label: langs[lang], value: lang }
								) )
							),
						onChange: updateLanguage,
					} )
				),
				el( 'div', { key: 'editor-wrapper', className: className },
					el( PlainText, {
							value: attributes.content,
							onChange: ( content ) => setAttributes({ content }),
							placeholder: __( 'Write code…', 'code-syntax-block' ),
							ariaLabel: __( 'Code', 'code-syntax-block' ),
						}),
					el( 'div', { style: editorStyle }, langs[ attributes.language ] )
				)
			];
		},

		save({ attributes }) {
			const cls = ( attributes.language ) ? 'language-' + attributes.language : '';
			return el(
				'pre',
				{},
				el( 'code', { lang: attributes.language, className: cls }, attributes.content )
			);
		}
	};

	return newCodeBlockSettings;
};

// Register Filter
addFilter(
	'blocks.registerBlockType',
	'mkaz/code-syntax-block',
	addSyntaxToCodeBlock
);
