<?php

/**
 * Retrieve support languages
 * @return array Hash of lang => language
 */
function mkaz_code_syntax_block_get_supported_languages() {
	
	$languages = array(
		"apacheconf" => "Apache Config",
		"shell" => "Bash/Shell",
		"basic" => "BASIC",
		"clike" => "C-like",
		"csharp" => "C#",
		"cpp" => "C++",
		"css" => "CSS",
		"dart" => "Dart",
		"jinja2" => "Django/Jinja2",
		"dockerfile" => "Docker",
		"fsharp" => "F#",
		"graphql" => "GraphQL",
		"go" => "Go",
		"hs" => "Haskell",
		"html" => "HTML",
		"js" => "JavaScript",
		"json" => "JSON",
		"lisp" => "Lisp",
		"md" => "Markdown",
		"mathml" => "MathML",
		"matlab" => "MATLAB",
		"nginx" => "nginx",
		"objectivec" => "Objective-C",
		"php" => "PHP",
		"powershell" => "PowerShell",
		"properties" => ".properties",
		"py" => "Python",
		"jsx" => "React JSX",
		"rest" => "reST (reStructuredText)",
		"rb" => "Ruby",
		"sass" => "Sass",
		"sql" => "SQL",
		"svg" => "SVG",
		"toml" => "TOML",
		"ts" => "TypeScript",
		"vim" => "vim",
		"vb" => "Visual Basic",
		"wasm" => "WebAssembly",
		"wiki" => "Wiki markup",
		"xml" => "XML",
		"yaml" => "YAML",
	);

	/**
	 * Filter the list of supported languages for the Syntax Highlighting colors.
	 * Use this filter to shorten or extend the language shown in the editor interface.
	 
	 * The array key must match a Prism's supported alias, the array value is a descriptive
	 * field. For languages and aliases see: https://prismjs.com/#supported-languages
	 *
	 * @since 1.1.0
	 *
	 * @param string $languages Array of languages supported
	 */
	return apply_filters( 'mkaz_code_syntax_language_list', $languages );
}
