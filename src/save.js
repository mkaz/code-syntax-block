/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	let cls = '';
	cls = attributes.language ? 'language-' + attributes.language : '';
	cls = attributes.lineNumbers ? cls + ' line-numbers' : cls;

	const blockProps = useBlockProps.save( { title: attributes.title } );
	return (
		<>
			<pre { ...blockProps }>
				<RichText.Content
					tagName="code"
					value={ attributes.content }
					lang={ attributes.language }
					className={ cls }
				/>
			</pre>
		</>
	);
};

export default save;
