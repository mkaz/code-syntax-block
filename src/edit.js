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
	ToggleControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/* global mkaz_code_syntax_languages */

const editorStyle = {
	fontFamily: 'sans-serif',
	fontSize: '.6rem',
	color: '#999999',
	position: 'absolute',
	top: '.3rem',
	right: '.5rem',
};

const edit = ( { attributes, setAttributes, className } ) => (
	<>
		<InspectorControls key='controls'>
			<PanelBody title={ __( 'Settings' ) }>
				<SelectControl
					label={ __( 'Language' ) }
					value={ attributes.language }
					options={ [ {
						label: __( 'Select code language' ),
						value: '',
					}].concat (
						Object.keys(mkaz_code_syntax_languages).sort().map( ( lang ) => (
							{ label: mkaz_code_syntax_languages[lang], value: lang }
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
					onChange={ ( title ) => setAttributes({ title }) }
					placeholder={ __( 'Title or File (optional)' ) }
				/>
			</PanelBody>
		</InspectorControls>
		<div key='editor-wrapper' className={ className }>
			<PlainText
				value={ attributes.content }
				onChange={ ( content ) => setAttributes({ content }) }
				placeholder={ __( 'Write code…' ) }
			/>
			<div style={ editorStyle }>
				{ mkaz_code_syntax_languages[ attributes.language ] }
			</div>
		</div>
	</>
);


export default edit;