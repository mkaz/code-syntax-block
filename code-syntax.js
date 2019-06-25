/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */
( function( wp ) {
/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;
const  el = wp.element.createElement;
const { PlainText, InspectorControls } = wp.editor;
const {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl
} = wp.components;

const { __ } = wp.i18n;

const editorStyle = {
	fontFamily: 'sans-serif',
	fontSize: '.6rem',
	color: '#999999',
	position: 'absolute',
	top: '.3rem',
	right: '.5rem',
};

let langs = {};

for ( let lang in prismLanguages ) {
	if (  ! prismLanguages.hasOwnProperty( lang ) ) { continue; }
	if ( typeof prismLanguages[lang].title !== 'undefined' ) {
		langs[lang] = prismLanguages[lang].title;
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
			},
			lineNumbers: {
				type: 'boolean'
			},
            title: {
                type: 'string',
                source: 'attribute',
                selector: 'pre',
                attribute: 'title',
            }
		},

		edit({ attributes, setAttributes, className }) {
			const {
				language,
				lineNumbers,
			} = attributes;

			const updateLanguage = language => {
				setAttributes({ language });
			};

			return [
				el( InspectorControls, { key: 'controls' },
                    el( PanelBody, { title: __( 'Settings' ) },
                        el( SelectControl, {
                            label: __( 'Language' ),
                            value: attributes.language,
                            options: [ {
                                    label: __( 'Select code language' ),
                                    value: '',
                                }].concat (
                                    Object.keys( langs ).sort().map( ( lang ) => (
                                        { label: langs[lang], value: lang }
                                    ) )
                                ),
                            onChange: updateLanguage,
                        } ),
                        el( ToggleControl, {
                            label: __( 'Show line numbers' ),
                            checked: lineNumbers,
                            onChange: ( lineNumbers ) => setAttributes( { lineNumbers } ),
                        } ),
                        el( TextControl, {
                                label: __( 'Title for Code Block' ),
                                value: attributes.title,
                                onChange: ( title ) => setAttributes({ title }),
                                placeholder: __( 'Title or File (optional)' ),
                                ariaLabel: __( 'Title for Block' ),
                        }),
                    ),
				),
				el( 'div', { key: 'editor-wrapper', className: className },
					el( PlainText, {
							value: attributes.content,
							onChange: ( content ) => setAttributes({ content }),
							placeholder: __( 'Write code…' ),
							ariaLabel: __( 'Code' ),
						}),
					el( 'div', { style: editorStyle }, langs[ attributes.language ] )
				)
			];
		},

		save({ attributes }) {
			cls = ( attributes.language ) ? 'language-' + attributes.language : '';
			cls = ( attributes.lineNumbers ) ? cls + ' line-numbers' : cls;
			return el(
				'pre',
				{ title: attributes.title },
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

} )( window.wp );
