/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	PlainText,
	__experimentalBlock as Block, // WP 5.5
	useBlockProps,
} from '@wordpress/block-editor';
import { hasBlockSupport } from '@wordpress/blocks';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/* global mkaz_code_syntax_languages, mkaz_code_syntax_default_lang, Prism */

const edit = ( { attributes, className, setAttributes } ) => {
	useEffect( () => {
		if ( ! attributes.language && mkaz_code_syntax_default_lang ) {
			setAttributes( { language: mkaz_code_syntax_default_lang } );
		}
	}, [ attributes.language ] );

	let cls = '';
	cls = attributes.language ? 'language-' + attributes.language : '';
	cls = attributes.lineNumbers ? cls + ' line-numbers' : cls;

	const editorStyle = {
		fontFamily: 'sans-serif',
		fontSize: '.6rem',
		color: '#999999',
		margin: '-1.5rem auto 1.0rem auto',
		paddingRight: '16px',
		textAlign: 'right',
	};

	// GB 9.2, WP 5.6
	const blockProps = useBlockProps && useBlockProps();

	// WP 5.5 required using a lightBlockWrapper
	// This was replaced by the blockProps above in WP 5.6
	// to support older versions of WordPress after 5.6 release
	// the following is needed with the OldLightBlock ternary
	// providing the additional support for WP prior to 5.5
	const useLightBlockWrapper = hasBlockSupport(
		'core/code',
		'lightBlockWrapper',
		false
	);

	const plainTextProps = {
		value: attributes.content,
		onChange: ( content ) => setAttributes( { content } ),
		placeholder: __( 'Write code…' ),
		'aria-label': __( 'Code' ),
	};

	const OldLightBlock = () =>
		useLightBlockWrapper ? (
			<Block.pre>
				<PlainText
					__experimentalVersion={ 2 }
					tagName="code"
					{ ...plainTextProps }
				/>
			</Block.pre>
		) : (
			<PlainText { ...plainTextProps } />
		);

	return (
		<>
			<InspectorControls key="controls">
				<PanelBody title={ __( 'Settings' ) }>
					<SelectControl
						label={ __( 'Language' ) }
						value={ attributes.language }
						options={ [
							{
								label: __(
									'Select code language',
									'code-syntax-block'
								),
								value: '',
							},
						].concat(
							Object.keys( mkaz_code_syntax_languages ).map(
								( lang ) => ( {
									label: mkaz_code_syntax_languages[ lang ],
									value: lang,
								} )
							)
						) }
						onChange={ ( language ) =>
							setAttributes( { language } )
						}
					/>
					<ToggleControl
						label={ __( 'Show line numbers', 'code-syntax-block' ) }
						checked={ attributes.lineNumbers }
						onChange={ ( lineNumbers ) =>
							setAttributes( { lineNumbers } )
						}
					/>
					<TextControl
						label={ __(
							'Title for Code Block',
							'code-syntax-block'
						) }
						value={ attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) }
						placeholder={ __(
							'Title or File (optional)',
							'code-syntax-block'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div key="editor-wrapper" className={ className }>
				{ blockProps ? (
					<pre { ...blockProps }>
						<PlainText { ...plainTextProps } />
					</pre>
				) : (
					<OldLightBlock />
				) }
				{ /* wp-block class is used to keep item in editor bounds */ }
				<div style={ editorStyle } className="wp-block">
					{ mkaz_code_syntax_languages[ attributes.language ] }
				</div>
			</div>
		</>
	);
};

export default edit;
