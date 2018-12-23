// On-Demand Loading with prismJs and prismCSS
function lazy_load_prism() {
    const code_block = 'pre[class*="language-"], code[class*="language-"], pre[class*="lang-"], code[class*="lang-"]'
    
    // Avoid conflicts and determine if there is a code block
    if(!this.hasOwnProperty('Prism') && document.querySelector(code_block)) {
        // url example: http://localhost/wp-content/plugins/code-syntax-block/assets/prism/prism-manage.js
        let url = document.currentScript.href
        // base_path example: http://localhost/wp-content/plugins/code-syntax-block/assets/prism/
        let base_path = url.substr(0, url.lastIndexOf('/')+1)

        // load js
        let prismJs = document.createElement('script')
        prismJs.type = 'text/javascript';
        prismJs.src = base_path + 'prism.js';

        // prismJs settings
        prismJs.onload = function(){
            Prism.plugins.autoloader.languages_path = settings.pluginUrl + 'assets/prism/prism-components/';
        }

        // load style
        let prismCSS = document.createElement('link');
        prismCSS.rel = 'stylesheet';
        prismCSS.href = base_path + 'prism.css';

        document.body.append(prismJs, prismCSS);
    }
}

window.onload = lazy_load_prism;