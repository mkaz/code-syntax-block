// Title or Filename Plugin
(function(){

    const hook = function( env ) {
        console.log("Title Plugin here...");

		var pre = env.element.parentNode;
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return;
		}

		// check for title div already exists
        // autoload runs twice for languages 
        var matches = pre.getElementsByClassName( 'prism-titlename' )
        if ( matches.length > 0 ) {
            return;
        }

		// Create wrapper for <pre> to prevent scrolling toolbar with content
        if ( pre.getAttribute('title') ) {
            var title = document.createElement("div");
            title.classList.add("prism-titlename");
            title.innerHTML = pre.getAttribute('title');
            pre.prepend(title);
        }
	}

	/**
	 * Register the toolbar with Prism.
	 */
	Prism.hooks.add('complete', hook);

})();
