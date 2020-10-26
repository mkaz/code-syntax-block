<?php

add_action( 'rest_api_init', function() {

	// Get color scheme option
	register_rest_route(
		'mkaz/code-syntax/v1',
		'/get/color-scheme/',
		array(
			'callback' => function () {
				return get_option( 'mkaz-code-syntax-color-scheme', MKAZ_CODE_SYNTAX_DEFAULT_SCHEME );
			},
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
	// Set color scheme option
	register_rest_route(
		'mkaz/code-syntax/v1',
		'/set/color-scheme/(?P<scheme>([A-Za-z0-9\_\-])+)/',
		array(
			'callback' => function ( $request ) {
				$scheme = isset( $request['scheme'] ) ? esc_attr( $request['scheme'] ) : null;
				if ( $scheme && in_array( $scheme, MKAZ_CODE_SYNTAX_COLOR_SCHEMES ) ) {
					$rtn = update_option( 'mkaz-code-syntax-color-scheme', $scheme );
					if ( $rtn ) {
						$rtn = $scheme; // return scheme set
					} else {
						$rtn = "Error: Updating option.";
					}
				} else {
					$rtn = "Error: No color scheme specified.";
				}
				return $rtn;
			},
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
} );
