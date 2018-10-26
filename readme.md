
# Code Syntax Highlighting Block

A WordPress plugin which extends Gutenberg by adding syntax highlighting to the core code block.


Example:

<img src="screenshot.png" title="Screenshot example in use" alt="screen shot" width="554" height="202" style="border:1px solid #333"/>


### Usage

Install code-syntax-block plugin to your WordPress plugins directory and activate. You can download a zip from the  [releases page](https://github.com/mkaz/code-syntax-block/releases).

When creating a new code block, select `Code` block, and then in the Inspector (Block Controls on the Right) select the language for the code. The code will not change within the editor, but you'll see a small label with the selected language.

On the front-end when the post is being viewed, the code will be color syntax highlighted.

### Customize

The default install uses a limited set of languages from Prism (bash, css, clike, html/markup git, go, javascript, json, php, python, react jsx, sql). If your language is not included, you can build and download a new prism.js <a href="http://prismjs.com/download.html#languages=markup+css+clike+javascript+bash+markup-templating+git+go+php+python+jsx">using this form</a>. Just replace `assets/prism.js` with the new file. You will also need to edit the langs array in code-syntax.js and rebuild.

Changing color theme, the default color theme is based off [GHColors](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-ghcolors.css). You can download a new theme from the link above, or from the [Prism themes repo](https://github.com/PrismJS/prism-themes). The easiest way would be to download and customize the new css and replace `assets/prism.css`.

#### Build requirements

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

