
# Code Syntax Highlighting Block

A WordPress plugin which extends Gutenberg by adding syntax highlighting to the core code block.


Example:

<img src="screenshot.png" title="Screenshot example in use" alt="screen shot" width="554" height="202" style="border:1px solid #333"/>


### Usage

Install code-syntax-block plugin to your WordPress plugins directory and activate. You can download a zip from the  [releases page](https://github.com/mkaz/code-syntax-block/releases).

When creating a new code block, select `Code` block, and then in the Inspector (Block Controls on the Right) select the language for the code. The code will not change within the editor, but you'll see a small label with the selected language.

On the front-end when the post is being viewed, the code will be color syntax highlighted.

### Customize

The default install uses a limited set of languages from highlight.php (bash, cpp, css, diff, go, javascript, json, markdown, php, python, sql, xml). If your language is not included, you can modify the [`.gitignore`] to skip ignoring them you will also need to edit the `langs` array in [`code-syntax.js`](code-syntax.js) and rebuild.

Changing color theme, the [default color theme](https://github.com/scrivo/highlight.php/blob/master/styles/default.css) is used from highlight.php. To use a different color scheme, just download one of the [other styles](https://github.com/scrivo/highlight.php/tree/master/styles) and then dequeue the default CSS to replace with your own.

### Colophon

- Uses [highlight.php syntax highlighter](https://github.com/scrivo/highlight.php)

### Contribute

See [list of current issues](https://github.com/mkaz/code-syntax-block/issues) with the plugin. Please feel free to file any additional issues or requests that you may come across. [Pull requests](https://github.com/mkaz/code-syntax-block/pulls) are welcome to help extend.

### License

Copyright (c) 2018 Marcus Kazmierczak.

Licensed under <a href="https://opensource.org/licenses/GPL-2.0"> GPL 2.0 or later </a>.

