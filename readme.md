
# Code Syntax Highlighting Block

A WordPress plugin which extends Gutenberg adding a new code block with syntax highlighting.

<img src="screenshot.png" alt="screen shot">


### Usage

- Install code-syntax-block plugin to your WordPress plugins directory and activate.

- When creating a new code block, select



### Issues

See Github issues for list of current issues with the plugin. The biggest known issue is the usability arounding the language list. Please feel free to file any additional issues or requests that you may come across.



### Customize

The default install uses a limited set of languages from Prism (markup, css, clike, javascript, bash, git, go, php, python, jsx). If your language is not included, you can build and download a new prism.js <a href="http://prismjs.com/download.html#languages=markup+css+clike+javascript+bash+markup-templating+git+go+php+python+jsx">using this form</a>. Just replace `assets/prism.js` with the new file.

Changing color theme, the default color theme is based off [GHColors](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-ghcolors.css). You can download a new theme from the link above, or from the [Prism themes repo](https://github.com/PrismJS/prism-themes). The easiest way would be to download and customize the new css and replace `assets/prism.css`.



### Colophon

- Uses PrismJS syntax highlighter, http://prismjs.com/

- Uses customized GH Colors theme, https://github.com/PrismJS/prism-themes

