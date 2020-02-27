=== Code Syntax Block ===
Contributors: mkaz, westonruter, memuller, jazanne, jeherve, eclev91
Donate link: https://www.paypal.me/marcuskazmierczak
Tags: code, code syntax, syntax highlight, code highlighting
Requires at least: 5.0
Tested up to: 5.3.2
Requires PHP: 5.2.4
Stable tag: 1.2.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Code Syntax Block plugin extends the Gutenberg Block Editor by adding syntax highlighting to the core code block.

== Description ==

Code Syntax Block extends the WordPress Block Editor by adding syntax highlighting support to the core code block using the Prism syntax highlighter.

The Prism syntax highlighter runs JavaScript loaded on the front-end to parse code blocks and apply syntax markup. A CSS file specifies the color and style to apply to that markup.  See [Prism syntax highlighter](https://prismjs.com) for full details.

Primary development and issues tracked on Github at: [https://github.com/mkaz/code-syntax-block](https://github.com/mkaz/code-syntax-block)

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

    add_filter( 'mkaz_prism_css_url', function() {
        return 'https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-hopscotch.css';
    });

Note: if you use the title/filename feature and customize the CSS, you will need to apply your own style targeting the prism-titlename class.


= How to customize the language list? =

Use the filter `mkaz_code_syntax_language_list` to customize the list of languages to select displayed in the editor. By default the code syntax block shows a shorter list of popular languages, but Prism supports close to 200, [see list](https://prismjs.com/#supported-languages).

Use this filter to extend to support the languages you need. Additionally you can use the filter to shorten the list to just the languages you use to make it easier to select.

Here is an example shortening the list to a smaller set:

    add_filter( 'mkaz_code_syntax_language_list', function() {
        return array(
            "bash" => "Bash",
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

= Can I set a default language so I don't have to select each time? =

Yes, use the filter `mkaz_code_syntax_default_lang` to set a default language when inserting a code block. You can still change if you wish to show code not using the default language.

This example would set JavaScript as the default:

    add_filter( 'mkaz_code_syntax_default_lang', function() { return 'javascript'; });

= Can I override the conditional loading, so assets always load? =

Yes, use the filter `mkaz_code_syntax_force_loading` to force always loading assets, otherwise it users has_block to check.

Example:

	add_filter( 'mkaz_code_syntax_force_loading', '__return_true' );


== Screenshots ==

1. Example Syntax Highlighting
2. In Editor Example

== Changelog ==

= 1.24 =

Add filter to force loading assets, regardless of has_block

= 1.2.3 =

Conditionally load asset if has_blocks
Move Hack to front of default font list
Remove !important from font declaration
Change default font size to 15px for usability

= 1.2.2 =

Fix alignment issue with TwentyTwenty

= 1.2.1 =

Add Java and Kotlin to default language list

= 1.2.0 =

Upgrade Prism to 1.17.1

= 1.1.0 =

Add filters for customizing language list, and default language.

See full Release Notes on [Github releases page](https://github.com/mkaz/code-syntax-block/releases)

== Upgrade Notice ==

= 1.1.0 =

Add filters for customizing language list, and default language.

= 1.0 =

Initial WordPress Plugin Repository releases, include upgrade Prism to 1.16.0 and new default One Dark theme.

