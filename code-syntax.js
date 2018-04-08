/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */

 /**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { PlainText, InspectorControls } = wp.blocks;
const { SelectControl } = wp.components;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const langs = {
	bash:       'Bash (shell)',
	clike:      'C-like',
	css:        'CSS',
	go:         'Go (golang)',
	javascript: 'JavaScript',
	markup:     'Markup',
	php:        'PHP',
	python:     'Python',
};

const addSyntaxToCodeBlock = settings => {
	if ( settings.name !== "core/code" ) {
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
			},
		},

		edit( { attributes, setAttributes, isSelected, className } ) {
			const updateLanguage = language => setAttributes({ language });
			return [
				isSelected && (
					<InspectorControls>
						<SelectControl
							label="Language"
							value={ attributes.language }
							options={
								[ { label: __( 'Select code language' ), value: '' } ].concat (
								Object.keys( langs ).map( ( lang ) => (
									{ label: langs[lang], value: lang }
								) ) )
							}
							onChange={ updateLanguage }
						/>
					</InspectorControls>
				),
				<div className={ className }>
					<PlainText
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Write code…' ) }
						aria-label={ __( 'Code' ) }
					/>
					<div class="language-selected">{ langs[ attributes.language ] }</div>
				</div>
			];
		},

		save( { attributes } ) {
			const cls = ( attributes.language ) ? "language-" + langs[ attributes.language ]: "";
			return <pre><code lang={ attributes.language } className={ cls }>{ attributes.content }</code></pre>;
		},
	};

	return newCodeBlockSettings;
};

// Register Filter
addFilter(
	"blocks.registerBlockType",
	"mkaz/code-syntax-block",
	addSyntaxToCodeBlock
)
