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
						The global color scheme is now set in the Dashboard settings menu.
					</p>
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
