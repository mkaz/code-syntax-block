
# Code Syntax Highlighting Block

A WordPress plugin which extends the Gutenberg Block Editor by adding syntax highlighting to the core code block.


Example:

<img src="screenshot.png" title="Screenshot example in use" alt="screen shot" width="483" height="384" style="border:1px solid #333"/>

## Install


Available on WordPress Plugin Directory at: https://wordpress.org/plugins/code-syntax-block/

You can also install the code-syntax-block plugin from your WordPress plugins page, or download a zip from the  [releases page](https://github.com/mkaz/code-syntax-block/releases) then upload and activate on your site.

## Usage

When creating a new code block, select `Code` block, and then in the Inspector (Block Controls on the Right) select the language for the code. The code will not change within the editor, but you'll see a small label with the selected language.

On the front-end when the post is being viewed, the code will be color syntax highlighted.

## Customize

The default color theme is based off [One Dark](https://github.com/AGMStudio/prism-theme-one-dark). If you want to change the colors, you can download a new theme from the [Prism themes repo](https://github.com/PrismJS/prism-themes) or create your own.

The color theme is a single CSS file, there are a couple ways to customize:

1. The plugin will check the current theme for the file: `assets/prism/prism.css` and use that file if it exists. Add your customize to a file in that location, and it will be used.

2. If you do not like that file location, you can use the filter `mkaz_prism_css_path` and specify a path relative to your theme to use.

3. If you would prefer specifying a full URL, you can use the filter `mkaz_prism_css_url` and specify a full URL to the stylesheet to use.

An example adding a filter to change the URL, add the following to your theme's function.php

```php
add_filter( 'mkaz_prism_css_url', function() {
	return 'https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-hopscotch.css'; 
});
```

Note, if you customize the theme and use the title/filename option, you will likely need to update your CSS adjusting the style targeting `prism-titlename` class.

## Alternatives

Consider using Weston Ruter's [Syntax-highlighting Code Block](https://wordpress.org/plugins/syntax-highlighting-code-block/), which forked from this block. Weston's block changes the parsing engine to use `highlight.php` which renders server-side. My block uses PrismJS which renders on the front-end and requires loading an additional JS file.

Secondly, you can check out [SyntaxHighter Evolved](https://wordpress.org/plugins/syntaxhighlighter/) which is an older plugin created by my coworker Alex Mills. It recently added support for the block editor. It uses its own custom block instead of extending the core code block. The plugin is run on the front-end using the SyntaxHighlighter JS engine.

## Colophon

- Uses PrismJS syntax highlighter, http://prismjs.com/

- Uses customized GH Colors theme, https://github.com/PrismJS/prism-themes


## License

Copyright (c) 2018 Marcus Kazmierczak.

Licensed under <a href="https://opensource.org/licenses/GPL-2.0"> GPL 2.0 or later </a>.

