/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	let cls = '';
	cls = attributes.datalang ? 'language-' + attributes.datalang : '';
	cls = attributes.lineNumbers ? cls + ' line-numbers' : cls;

	// WP 5.6 / GB 9.2
	if ( useBlockProps ) {
		const blockProps = useBlockProps.save( { title: attributes.title } );
		return (
			<>
				<pre { ...blockProps }>
					<RichText.Content
						tagName="code"
						value={ attributes.content }
						data-lang={ attributes.datalang }
						className={ cls }
					/>
				</pre>
			</>
		);
	}

	// Backward compatibility < WP 5.6
	return (
		<pre className="wp-block-code" title={ attributes.title }>
			<code data-lang={ attributes.datalang } className={ cls }>
				{ attributes.content }
			</code>
		</pre>
	);
};

export default save;
