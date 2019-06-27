=== Code Syntax Block ===
Contributors: mkaz
Donate link: https://www.patreon.com/mkaz
Tags: code, code syntax, syntax highlight, code highlighting
Requires at least: 5.0
Tested up to: 5.2.2
Requires PHP: 5.2.4
Stable tag: trunk
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Code Syntax Block plugin extends the Gutenberg Block Editor by adding syntax highlighting to the core code block.

== Description ==

Code Syntax Block extends the WordPress Block Editor by adding syntax highlighting support to the core code block using the Prism syntax highlighter.

The Prism syntax highlighter is JavaScript loaded on the 
See [Prism syntax highlighter](https://prismjs.com)



== Installation ==

After installing and activating the plugin, use in the Block Editor by creating a standard code block and selecting a language format.

When creating a new code block, select Code block, and then in the Inspector (Block Controls on the Right) select the language for the code. The code will not change within the editor, but you'll see a small label with the selected language.

On the front-end when the post is being viewed, the code will be color syntax highlighted.

== Frequently Asked Questions ==

= What languages are supported? =

The Code Syntax Block plugin uses the Prism autoloader plugin to support all of the languages Prism supports. See the [list of supported languages here](https://prismjs.com/#supported-languages).


= How to customize the color scheme? =


The default color theme is [One Dark](https://github.com/AGMStudio/prism-theme-one-dark) based off Atom's One Dark theme . If you want to change the colors, you can download a new theme from the [Prism themes repo](https://github.com/PrismJS/prism-themes) or create your own.

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

Note: if you use the title/filename feature and customize the CSS, you will need to apply your own style targeting the prism-titlename class.

== Screenshots ==

1. Example Syntax Highlighting

== Changelog ==

See Release Notes on Github releases page: https://github.com/mkaz/code-syntax-block/releases

== Upgrade Notice ==

= 1.0 =

Initial WordPress Plugin Repository releases, include upgrade Prism to 1.16.0 and new default One Dark theme.

