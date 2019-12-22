
# About Prism JS Files

The Prism.js file is the minified version from prismjs.com
See the URL in the comments for plugins loaded.

Additionally, prism.js inlcudes the contents of prism-settings.js, and prism-title.js. The files are combined together to avoid mulitple connections and downloads of files which are small.

The prism/components directory contains the contents of https://github.com/PrismJS/prism/tree/master/components. These files are the extra language definitions for the autoloader.

### Upgrading Assets

1. Download [latest prism.js using these params](https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript&plugins=line-highlight+line-numbers+autoloader)

2. Copy prism.js to replace prism.js
3. Append `cat prism-settings.js >> prism.js`
4. Append `cat prism-title.js >> prism.js`
5. [Download grammars](https://prismjs.com/plugins/autoloader/) and update prism-components/
