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
import { languages } from './assets/prism-languages.json';

let langs = {};

for ( let lang in languages ) {
	if (  ! languages.hasOwnProperty( lang ) ) { continue; }
	if ( typeof languages[lang].title !== 'undefined' ) {
		langs[lang] = __( languages[lang].title, 'code-syntax-block' );
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
						onChange={ ( content ) => setAttributes({ content }) }
						placeholder={ __( 'Write code…', 'code-syntax-block' ) }
						aria-label={ __( 'Code', 'code-syntax-block' ) }
					/>
					<div className="language-selected">{ langs[ attributes.language ] }</div>
				</div>
			];
		},

		save({ attributes }) {
			const cls = ( attributes.language ) ? 'language-' + attributes.language : '';
			return <pre><code lang={ attributes.language } className={ cls }>{ attributes.content }</code></pre>;
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
