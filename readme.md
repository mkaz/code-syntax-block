
# Code Syntax Highlighting Block

A WordPress plugin which extends the WordPress Block Editor by adding syntax highlighting to the core code block.

Example:

<img src="screenshot.png" title="Screenshot example in use" alt="screen shot" width="483" height="384" style="border:1px solid #333"/>

## Install

Available on WordPress Plugin Directory at: https://wordpress.org/plugins/code-syntax-block/

You can install the code-syntax-block plugin from your WordPress plugins page, or download a zip from the  [releases page](https://github.com/mkaz/code-syntax-block/releases) then upload and activate on your site.

## Usage

When creating a new code block, select `Code` block, and then in the Inspector (Block Controls on the Right) select the language for the code. The code will not change within the editor, but you'll see a small label with the selected language.

On the front-end when the post is being viewed, the code will be color syntax highlighted.

## Customize

### Colors

The default color theme is based off [One Dark](https://github.com/AGMStudio/prism-theme-one-dark). If you want to change the colors, you can download a new theme from the [Prism themes repo](https://github.com/PrismJS/prism-themes) or create your own.

The color theme is a single CSS file, there are a couple ways to customize:

1. The plugin will check the current theme for the file: `assets/prism/prism.css` and use that file if it exists. Add your customize to a file in that location, and it will be used.

2. If you do not like that file location, you can use the filter `mkaz_prism_css_path` and specify a path relative to your theme to use. An example, creating a `prism-theme.css` file at the top-level of my theme directory:

```php
	// Use local prism theme
	add_filter( 'mkaz_prism_css_path', function() {
		return '/prism-theme.css';
	});
```

3. If you would prefer specifying a full URL, you can use the filter `mkaz_prism_css_url` and specify a full URL to the stylesheet to use.

An example adding a filter to change the URL, add the following to your theme's function.php

```php
add_filter( 'mkaz_prism_css_url', function() {
	return 'https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-hopscotch.css';
});
```

Note, if you customize the theme and use the title/filename option, you will likely need to update your CSS adjusting the style targeting `prism-titlename` class.

### Languages

Use the filter `mkaz_code_syntax_language_list` to customize the list of languages to select displayed in the editor. By default the code syntax block shows a shorter list of popular languages, but Prism supports close to 200, [see list](https://prismjs.com/#supported-languages).

Use this filter to extend to support the languages you need. Additionally you can use the filter to shorten the list to just the languages you use to make it even simpler to select.

Here is an example shortening the list to a smaller set:

```php
add_filter( 'mkaz_code_syntax_language_list', function() {
	return array(
		"bash" => "Bash/Shell",
		"go" => "Go",
		"html" => "HTML",
		"javascript" => "JavaScript",
		"json" => "JSON",
		"markdown" => "Markdown",
		"php" => "PHP",
		"python" => "Python",
		"jsx" => "React JSX",
		"sass" => "Sass",
		"sql" => "SQL",
		"svg" => "SVG",
		"toml" => "TOML",
		"vim" => "vim",
		"xml" => "XML",
		"yaml" => "YAML",
	);
} );
```

You can also **set a default language** using the filter `mkaz_code_syntax_default_lang`, by default no default is set requiring you to select the language. By setting a default language when inserting a code block the language will already be set, you can still change if you wish to show code not using the default language.

This example would set JavaScript as the default:

```php
add_filter( 'mkaz_code_syntax_default_lang', function() { return 'javascript'; });
```

### Conditional Loading

By default the plugin will check if the current loop `has_blocks` and will only load the assets if the blocks are detected. If you need to override this, and force loading of assets using the following filter in your theme:

```php
add_filter( 'mkaz_code_syntax_force_loading', '__return_true' );
```


## Alternative

For server-side rendering, consider using Weston Ruter's [Syntax-highlighting Code Block](https://wordpress.org/plugins/syntax-highlighting-code-block/), it was initially forked from this block. Weston's block changes the parsing engine to use `highlight.php` that renders server-side. My block uses PrismJS which renders on the front-end and requires loading additional JS file.

## Colophon

- Uses PrismJS syntax highlighter, http://prismjs.com/

- Uses customized GH Colors theme, https://github.com/PrismJS/prism-themes


## License

Copyright (c) 2018-2020 Marcus Kazmierczak.

Licensed under <a href="https://opensource.org/licenses/GPL-2.0"> GPL 2.0 or later </a>.

