
const save = ( { attributes } ) => {
	let cls = '';
	cls = ( attributes.language ) ? 'language-' + attributes.language : '';
	cls = ( attributes.lineNumbers ) ? cls + ' line-numbers' : cls;
	return (
		<pre title={ attributes.title }>
			<code data-lang={ attributes.language } className={ cls }>
				{ attributes.content }
			</code>
		</pre>
	);
};

export default save;
