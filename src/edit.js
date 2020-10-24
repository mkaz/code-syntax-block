/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	PlainText, // pre GB 9.2
	RichText, // GB 9.2+
	__experimentalBlock as ExperimentalBlock, // WP 5.5
	useBlockProps, // GB 9.2 / WP 5.6
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

	// shared props for text areas
	const textAreaProps = {
		value: attributes.content || '',
		onChange: ( content ) => setAttributes( { content } ),
		placeholder: __( 'Write code…' ),
		'aria-label': __( 'Code' ),
	};

	// WP 5.5 required using a lightBlockWrapper
	const useLightBlockWrapper = hasBlockSupport(
		'core/code',
		'lightBlockWrapper',
		false
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
			<>
				{ /*
					Since this extends the core code block, the return signature must match Gutenberg

					WP5.6 / GB 9.2 - useBlockProps & RichText
					GB 9.2: https://github.com/WordPress/gutenberg/blob/v9.2.0/packages/block-library/src/code/edit.js

					WP 5.5 required using a lightBlockWrapper & PlainText
					This was replaced by useBlockProps in WP 5.6
					GB 7.8..9.0: https://github.com/WordPress/gutenberg/blob/v7.8.0/packages/block-library/src/code/edit.js

					WP older than 5.5 PlainText with wrapper
					GB <7.8: https://github.com/WordPress/gutenberg/blob/v7.7.0/packages/block-library/src/code/edit.js
				*/ }
				{ useBlockProps ? (
					<pre { ...useBlockProps() }>
						<RichText
							{ ...textAreaProps }
							preserveWhiteSpace={ true }
						/>
					</pre>
				) : useLightBlockWrapper ? (
					<ExperimentalBlock.pre>
						<PlainText
							{ ...textAreaProps }
							__experimentalVersion={ 2 }
							tagName="code"
						/>
					</ExperimentalBlock.pre>
				) : (
					<div key="editor-wrapper" className={ className }>
						<PlainText { ...textAreaProps } />
					</div>
				) }

				{ /* Language label, uses wp-block class to keep within editor bounds */ }
				<div className="wp-block mkaz-code-syntax-block__lang_label">
					{ mkaz_code_syntax_languages[ attributes.language ] }
				</div>
			</>
		</>
	);
};

export default edit;
