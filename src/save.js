/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	let cls = '';
	cls = attributes.language ? 'language-' + attributes.language : '';
	cls = attributes.lineNumbers ? cls + ' line-numbers' : cls;

	const blockProps = useBlockProps?.save( { title: attributes.title } );
	return (
		<>
			{ blockProps ? (
				<pre { ...blockProps }>
					<code lang={ attributes.language } className={ cls }>
						{ attributes.content }
					</code>
				</pre>
			) : (
				<pre className="wp-block-code" title={ attributes.title }>
					<code lang={ attributes.language } className={ cls }>
						{ attributes.content }
					</code>
				</pre>
			) }
		</>
	);
};

export default save;
