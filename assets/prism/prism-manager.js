// url example: http://localhost/wp-content/plugins/code-syntax-block/assets/prism/prism-manage.js
let url = document.currentScript.src;
// base_path example: http://localhost/wp-content/plugins/code-syntax-block/assets/prism/
let base_path = url.substr(0, url.lastIndexOf('/')+1);

// On-Demand Loading with prismJs and prismCSS
function lazy_load_prism() {
    const code_block = 'pre[class*="language-"], code[class*="language-"], pre[class*="lang-"], code[class*="lang-"]';
    // If there is no code block, it will not continue
    if (!document.querySelector(code_block)) {
        return
    }

    // Avoid conflicts
    if (!this.hasOwnProperty('Prism')) {
        // load js
        let prismJs = document.createElement('script');
        prismJs.type = 'text/javascript';
        prismJs.src = base_path + 'prism.js?lazyload=true';

        // prismJs settings
        prismJs.onload = function(){
            Prism.plugins.autoloader.languages_path = settings.pluginUrl + 'assets/prism/prism-components/';
        }

        document.body.append(prismJs, );
    }

    // Load only when the plugin is not loaded with prism css
    if (!document.getElementById('mkaz-code-syntax-prism-css')) {
        let prismCSS = document.createElement('link');
        prismCSS.rel = 'stylesheet';
        prismCSS.href = base_path + 'prism.css?lazyload=true';

        document.body.append(prismCSS);
    }
}

window.onload = lazy_load_prism;
