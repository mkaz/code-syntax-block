import omit from 'lodash.omit';

const deprecated = {
	// old attributes
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'code',
		},
		language: {
			type: 'string',
			selector: 'code',
			source: 'attribute',
			attribute: 'lang',
		},
	},
	migrate: ( attributes ) => {
		return {
			datalang: attributes.language,
			content: attributes.content,
		};
	},
	// old save function
	save: ( { attributes } ) => {
		let cls = '';
		cls = attributes.language ? 'language-' + attributes.language : '';
		cls = attributes.lineNumbers ? cls + ' line-numbers' : cls;

		return (
			<pre className="wp-block-code">
				<code lang={ attributes.language } className={ cls }>
					{ attributes.content }
				</code>
			</pre>
		);
	},
};

export default deprecated;
