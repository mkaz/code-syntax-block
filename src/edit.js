/**
 * WordPress dependencies
 */
import {
	PlainText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/* global mkaz_code_syntax_languages, mkaz_code_syntax_default_lang, Prism */

const editorStyle = {
	fontFamily: 'sans-serif',
	fontSize: '.6rem',
	color: '#999999',
	position: 'absolute',
	top: '.3rem',
	right: '.5rem',
};

const edit = ( { attributes, className, isSelected, setAttributes } ) => {
	useEffect( () => {
		if ( ! attributes.language && mkaz_code_syntax_default_lang ) {
			setAttributes( { language: mkaz_code_syntax_default_lang } );
		}
		// trigger color render
		if ( ! isSelected ) {
			Prism.highlightAll();
		}
	} );

	let cls = '';
	cls = ( attributes.language ) ? 'language-' + attributes.language : '';
	cls = ( attributes.lineNumbers ) ? cls + ' line-numbers' : cls;
	return (
		<>
			<InspectorControls key="controls">
				<PanelBody title={ __( 'Settings' ) }>
					<SelectControl
						label={ __( 'Language' ) }
						value={ attributes.language }
						options={ [ {
							label: __( 'Select code language' ),
							value: '',
						} ].concat(
							Object.keys( mkaz_code_syntax_languages ).map( ( lang ) => (
								{ label: mkaz_code_syntax_languages[ lang ], value: lang }
							) )
						) }
						onChange={ ( language ) => setAttributes( { language } ) }
					/>
					<ToggleControl
						label={ __( 'Show line numbers' ) }
						checked={ attributes.lineNumbers }
						onChange={ ( lineNumbers ) => setAttributes( { lineNumbers } ) }
					/>
					<TextControl
						label={ __( 'Title for Code Block' ) }
						value={ attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) }
						placeholder={ __( 'Title or File (optional)' ) }
					/>
				</PanelBody>
			</InspectorControls>
			{ isSelected || ! attributes.language ?
				<div key="editor-wrapper" className={ className }>
					<PlainText
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Write code…' ) }
					/>
					<div style={ editorStyle }>
						{ mkaz_code_syntax_languages[ attributes.language ] }
					</div>
				</div> :
				<pre title={ attributes.title }>
					<code lang={ attributes.language } className={ cls }>
						{ attributes.content }
					</code>
				</pre>
			}
		</>
	);
};

export default edit;
