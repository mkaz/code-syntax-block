/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/* global mkaz_code_syntax_languages, mkaz_code_syntax_default_lang, Prism */

const edit = ( { attributes, setAttributes } ) => {
	const { colorScheme, content, language, lineNumbers, title } = attributes;

	useEffect( () => {
		if ( ! language && mkaz_code_syntax_default_lang ) {
			setAttributes( { language: mkaz_code_syntax_default_lang } );
		}
	}, [ language ] );

	// Onload fetch color scheme option
	useEffect( () => {
		apiFetch( {
			path: '/mkaz/code-syntax/v1/get/color-scheme/',
		} )
			.then( ( response ) => {
				setAttributes( { colorScheme: response } );
			} )
			.catch( ( error ) => {
				console.log( 'Error fetching color scheme option: ', error );
			} );
	}, [ colorScheme ] );

	const schemes = [
		{
			label: 'A11y Dark',
			value: 'prism-a11y-dark',
		},
		{
			label: 'One Dark',
			value: 'prism-onedark',
		},
		{
			label: 'GH Colors (Light)',
			value: 'prism-ghcolors',
		},
		{
			label: 'Nord',
			value: 'prism-nord',
		},
	];

	const updateColorScheme = ( scheme ) => {
		let path = '/mkaz/code-syntax/v1/set/color-scheme/' + scheme;
		apiFetch( { path } )
			.then( () => {
				setAttributes( { colorScheme: scheme } );
			} )
			.catch( ( error ) => {
				console.log( 'Error updating color scheme option: ', error );
			} );
	};

	/* Show line numbers within editor view. */
	const myProps = lineNumbers ? { 'line-numbers': 'true' } : {};
	const blockProps = useBlockProps( { ...myProps } );

	return (
		<>
			<InspectorControls key="controls">
				<PanelBody title={ __( 'Settings' ) }>
					<PanelRow>
						<SelectControl
							label={ __( 'Language' ) }
							value={ language }
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
										label:
											mkaz_code_syntax_languages[ lang ],
										value: lang,
									} )
								)
							) }
							onChange={ ( lang ) =>
								setAttributes( { language: lang } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show line numbers' ) }
							checked={ lineNumbers }
							onChange={ ( state ) =>
								setAttributes( { lineNumbers: state } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __(
								'Title for Code Block',
								'code-syntax-block'
							) }
							value={ title }
							onChange={ ( str ) =>
								setAttributes( { title: str } )
							}
							placeholder={ __(
								'Title or File (optional)',
								'code-syntax-block'
							) }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Global Color Scheme', 'code-syntax-block' ) }
				>
					<p>
						Color scheme applies to all code blocks across the site.
					</p>
					<SelectControl
						label={ __( 'Schemes' ) }
						value={ colorScheme }
						options={ [
							{
								label: __(
									'Pick color scheme',
									'code-syntax-block'
								),
								value: '',
							},
						].concat(
							schemes.map( ( scheme ) => ( {
								label: scheme.label,
								value: scheme.value,
							} ) )
						) }
						onChange={ updateColorScheme }
					/>
				</PanelBody>
			</InspectorControls>
			<>
				{ /* Language label, uses wp-block class to keep within editor bounds */ }
				<div className="wp-block mkaz-code-syntax-block__labels">
					<span className="mkaz-code-syntax-block__label-lang">
						&lt;
						{ mkaz_code_syntax_languages[ language ] }
						&gt;
					</span>
					{ lineNumbers && (
						<span className="mkaz-code-syntax-block__label-line-num">
							#
						</span>
					) }
				</div>
				<pre { ...blockProps }>
					<RichText
						value={ content || '' }
						onChange={ ( text ) =>
							setAttributes( { content: text } )
						}
						placeholder={ __( 'Write code…' ) }
						aria-label={ __( 'Code' ) }
						preserveWhiteSpace={ true }
						allowedFormats={ [] }
						withoutInteractiveFormatting={ true }
						__unstablePastePlainText={ true /* GB 9.5 */ }
					/>
				</pre>
			</>
		</>
	);
};

export default edit;
