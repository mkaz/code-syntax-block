const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'code',
	},
	datalang: {
		type: 'string',
		selector: 'code',
		source: 'attribute',
		attribute: 'data-lang',
	},
	lineNumbers: {
		type: 'boolean',
	},
	title: {
		type: 'string',
		source: 'attribute',
		selector: 'pre',
		attribute: 'title',
	},
};

export default blockAttributes;
