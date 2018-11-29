
# Code Syntax Highlighting Block

A WordPress plugin which extends Gutenberg by adding syntax highlighting to the core code block.


Example:

<img src="screenshot.png" title="Screenshot example in use" alt="screen shot" width="554" height="202" style="border:1px solid #333"/>


### Usage

Install code-syntax-block plugin to your WordPress plugins directory and activate. You can download a zip from the  [releases page](https://github.com/mkaz/code-syntax-block/releases).

When creating a new code block, select `Code` block, and then in the Inspector (Block Controls on the Right) select the language for the code. The code will not change within the editor, but you'll see a small label with the selected language.

On the front-end when the post is being viewed, the code will be color syntax highlighted.

### Customize

If you want to change the colors, the default color theme is based off [GHColors](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-ghcolors.css). You can download a new theme from the link above, or from the [Prism themes repo](https://github.com/PrismJS/prism-themes).

To enqueue your custom file, you can use the `mkaz_prism_css_url` filter in your own plugin. Add the CSS file to your plugin, and then declare the file like so:

```php
// Define a custom stylesheet to be used to highlight code.
function yourprefix_syntax_atom_hl() {
       	return plugins_url( 'atom-dark-hl.css' , __FILE__ );
}
add_filter( 'mkaz_prism_css_url', 'yourprefix_syntax_atom_hl' );
```


### Build

It is not necessary to build the plugin to use it, but if you want to contribute, or modify the plugin.

#### Dependencies

- Node dependencies (`$ npm install`)
- [WP-CLI](https://wp-cli.org/)
- [wp i18n](https://github.com/wp-cli/i18n-command)

#### Build steps

```
$ npm run build
$ npm run zip
```

Generated zip can be installed via Admin UI Plugins page

### Contribute

See Github issues for list of current issues with the plugin. Please feel free to file any additional issues or requests that you may come across. Pull requests are welcome to help extend.


### Colophon

- Uses PrismJS syntax highlighter, http://prismjs.com/

- Uses customized GH Colors theme, https://github.com/PrismJS/prism-themes


### License

Copyright (c) 2018 Marcus Kazmierczak.

Licensed under <a href="https://opensource.org/licenses/GPL-2.0"> GPL 2.0 or later </a>.

