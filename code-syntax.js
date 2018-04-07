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

const langs = {
    css: 'css',
    go:  'go',
    js:  'javascript',
    php: 'php',
    py:  'python',
    sh:  'bash',
};

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
            selector: 'code',
            source: 'attribute',
            attribute: 'lang'
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
						Object.keys( langs ).map( ( lang ) => ( {
							title: lang,
                            subscript: lang,
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
                <div class="language-selected">{ langs[ attributes.language ] }</div>
			</div>
		];
	},

	save( { attributes } ) {
        const cls = ( attributes.language ) ? "language-" + langs[ attributes.language ]: "";
		return <pre><code lang={ attributes.language } className={ cls }>{ attributes.content }</code></pre>;
	},
} );
