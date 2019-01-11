/**
 * Code Syntax Highlighting Block
 * A gutenberg block that allows inserting code with syntax highlighting.
 */
( function( wp ) {
/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;
const  el = wp.element.createElement;
const { PlainText, InspectorControls } = wp.editor;
const { SelectControl } = wp.components;
const { TextControl } = wp.components;
const { ToggleControl } = wp.components;

const editorStyle = {
    fontFamily: 'sans-serif',
    fontSize: '.6rem',
    color: '#999999',
    position: 'absolute',
    top: '.3rem',
    right: '.5rem',
};

let langs = {};

for ( let lang in prismLanguages ) {
	if (  ! prismLanguages.hasOwnProperty( lang ) ) { continue; }
	if ( typeof prismLanguages[lang].title !== 'undefined' ) {
		langs[lang] = prismLanguages[lang].title;
	}
}

const addSyntaxToCodeBlock = settings => {
	if ( settings.name !== 'core/code' ) {
		return settings;
	}

	const newCodeBlockSettings = {
		...settings,

		attributes: {
			...settings.attributes,
			language: {
				type: 'string',
				selector: 'code',
				source: 'attribute',
				attribute: 'lang'
			},
      lineNumbers: {
        type: 'boolean'
      },
      lineNumbersShift: {
        type: 'int'
      },
      lineHighlight: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      urlsClickable: {
        type: 'boolean'
      }
		},

		edit({ attributes, setAttributes, className }) {
      const {
        language,
        lineNumbers,
        lineNumbersShift,
        lineHighlight,
        title,
        urlsClickable
      } = attributes;

      const updateLanguage = language => {
				setAttributes({ language });
			};

			return [
				el( InspectorControls, { key: 'controls' },
					el( SelectControl, {
						label: "Language",
						value: attributes.language,
						options: [ {
								label: 'Select code language',
								value: '',
							}].concat (
								Object.keys( langs ).sort().map( ( lang ) => (
									{ label: langs[lang], value: lang }
								) )
							),
						onChange: updateLanguage,
					} ),
          el( TextControl, {
						label: "Title",
            value: title,
            onChange: ( title ) => setAttributes( { title } )
					} ),
          el( ToggleControl, {
						label: "Make URLs clickable",
            checked: urlsClickable,
            onChange: ( urlsClickable ) => setAttributes( { urlsClickable } )
					} ),
          el( ToggleControl, {
						label: "Show line numbers",
            checked: lineNumbers,
            onChange: ( lineNumbers ) => setAttributes( { lineNumbers } )
					} ),
          el( TextControl, {
						label: "First line number",
            type: 'number',
            value: ( lineNumbersShift ) ? lineNumbersShift : '1',
            min: 1,
            max: 100000,
            onChange: ( lineNumbersShift ) => setAttributes( { lineNumbersShift } )
					} ),
          el( TextControl, {
						label: "Highlight Lines",
            value: lineHighlight,
            onChange: ( lineHighlight ) => setAttributes( { lineHighlight } ),
            help: "A comma-separated list of line numbers to highlight. Can also be a range. Example: 1,5,10-20"
					} )
				),
				el( 'div', { key: 'editor-wrapper', className: className },
					el( PlainText, {
							value: attributes.content,
							onChange: ( content ) => setAttributes({ content }),
							placeholder: 'Write code…',
							ariaLabel: 'Code',
						}),
					el( 'div', { style: editorStyle }, langs[ attributes.language ] )
				)
			];
		},

		save({ attributes }) {
			cls = ( attributes.language ) ? 'language-' + attributes.language : '';
      cls = ( attributes.lineNumbers ) ? cls + ' line-numbers' : cls;
      cls = ( attributes.urlsClickable ) ? cls + ' urlsclickable' : cls;
      const lineNumbersShift = ( attributes.lineNumbersShift ) ? attributes.lineNumbersShift : 1;
      const lineHighlight = ( attributes.lineHighlight ) ? attributes.lineHighlight : '';
      const title = ( attributes.title ) ? attributes.title : '';

			return el(
				'pre',
				{"data-start": lineNumbersShift, "data-line": lineHighlight, "data-language": title},
				el( 'code', { lang: attributes.language, className: cls }, attributes.content )
			);
		}
	};

	return newCodeBlockSettings;
};

// Register Filter
addFilter(
	'blocks.registerBlockType',
	'mkaz/code-syntax-block',
	addSyntaxToCodeBlock
);

} )( window.wp )
