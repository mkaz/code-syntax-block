/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */

 /**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { PlainText, InspectorControls } = wp.editor;
const { SelectControl } = wp.components;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const langs = {
	bash:       __( 'Bash (shell)', 'code-syntax-block' ),
	clike:      __( 'C-like', 'code-syntax-block' ),
	css:        __( 'CSS', 'code-syntax-block' ),
	git:        __( 'Git', 'code-syntax-block' ),
	go:         __( 'Go (golang)', 'code-syntax-block' ),
	markup:     __( 'HTML/Markup', 'code-syntax-block' ),
	javascript: __( 'JavaScript', 'code-syntax-block' ),
	json:       __( 'JSON', 'code-syntax-block' ),
	markdown:   __( 'Markdown', 'code-syntax-block' ),
	php:        __( 'PHP', 'code-syntax-block' ),
	python:     __( 'Python', 'code-syntax-block' ),
	jsx:        __( 'React JSX', 'code-syntax-block' ),
	sql:        __( 'SQL', 'code-syntax-block' ),
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

			const updateLanguage = language => {
				setAttributes( { language } );
			};

			return [
				<InspectorControls key="controls">
					<SelectControl
						label="Language"
						value={ attributes.language }
						options={
							[ { label: __( 'Select code language', 'code-syntax-block' ), value: '' } ].concat (
							Object.keys( langs ).map( ( lang ) => (
								{ label: langs[lang], value: lang }
							) ) )
						}
						onChange={ updateLanguage }
					/>
				</InspectorControls>,
				<div key="editor-wrapper" className={ className }>
					<PlainText
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Write code…', 'code-syntax-block' ) }
						aria-label={ __( 'Code', 'code-syntax-block' ) }
					/>
					<div className="language-selected">{ langs[ attributes.language ] }</div>
				</div>
			];
		},

		save( { attributes } ) {
			const cls = ( attributes.language ) ? "language-" + attributes.language : "";
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
