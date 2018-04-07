/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */

 /**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType, PlainText, BlockControls } = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const langs = [ 'js', 'php', 'python' ];

export  default registerBlockType( 'mkaz/code-syntax', {
	title: 'Code Syntax',
	icon: 'editor-code',
	category: 'formatting',

	attributes: {
		content: {
			type: 'string',
			source: 'property',
			selector: 'code',
			property: 'textContent',
		},
        language: {
            type: 'string',
            source: 'property',
            selector: 'js,php,python',
            default: ''
        },
	},

	supports: {
		html: false,
	},

	edit( { attributes, setAttributes, isSelected, className } ) {

		return [
			isSelected && (
				<BlockControls
					key="controls"
					controls={
						langs.map( ( lang ) => ( {
							title: lang,
							onClick: () => setAttributes( { language: lang } ),
						} ) )
					}
				/>
			),
			<div className={ className }>
				<PlainText
					value={ attributes.content }
					onChange={ ( content ) => setAttributes( { content } ) }
					placeholder={ __( 'Write code…' ) }
					aria-label={ __( 'Code' ) }
				/>
			</div>
		];
	},

	save( { attributes } ) {
        const lang = ( attributes.language ) ? "language-" + attributes.language : "";
		return <pre><code class={ lang }>{ attributes.content }</code></pre>;
	},
} );
