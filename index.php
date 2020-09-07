<?php
/**
 * Plugin Name:  Code Syntax Block
 * Plugin URI:   https://github.com/mkaz/code-syntax-block
 * Description:  A plugin to extend Gutenberg code block with syntax highlighting
 * Version:      1.3.5
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  code-syntax-block
 *
 * @package Code_Syntax_Block
 */

// version added, used in URL
define( 'MKAZ_CODE_SYNTAX_BLOCK_VERSION', '1.3.5' );
require dirname( __FILE__ ) . '/prism-languages.php';

/**
 * Enqueue assets for editor portion of Gutenberg
 */
add_action( 'enqueue_block_editor_assets', function() {
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );
	$prism_languages_path = 'assets/prism/prism-languages.js';
	$editor_style_path = 'assets/blocks.editor.css';

	// Prism Languages - write out as JavaScript array that makes
	// it available to show in the editor
	$languages = mkaz_code_syntax_block_get_supported_languages();

	// Block.
	wp_enqueue_script(
		'mkaz-code-syntax',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	/**
	 * Use the mkaz_code_syntax_default__lang filter to set a default language
	 * When inserting a new code block, the language will automatically be set
	 *
	 * @since 1.1.0
	 *
	 * @param string $lang string
	 */
	$default_lang = apply_filters( 'mkaz_code_syntax_default_lang', '' );

	wp_add_inline_script(
		'mkaz-code-syntax',
		implode(
			"\n",
			array(
				'const mkaz_code_syntax_languages = ' . json_encode( $languages ) . ';',
				'const mkaz_code_syntax_default_lang = ' . json_encode( $default_lang ) . ';',
			)
		),
		'before'
	);

} );

/**
 * Enqueue assets for viewing for both front and editor.
 */
add_action( 'enqueue_block_assets', function() {

	// If not in editor, check if we should load the asset files
	if ( ! is_admin() ) {
		global $posts;
		/**
		 * Filter forces loading assets event if no block detected
		 *
		 * @since 1.2.4
		 *
		 */
		$force_load = apply_filters( 'mkaz_code_syntax_force_loading', false );
		// if not forcing the loading of assets check if the block
		// is found and if no block skip loading assets
		if ( ! $force_load ) {
			if ( empty( $posts ) ) {
				return;
			}

			$found_block = array_reduce( $posts, function($found, $post) {
				return $found || has_block( 'code', $post );
			}, false );

			if ( ! $found_block ) {
				return;
			}
		}
	}

	// Files.
	$view_style_path = 'assets/blocks.style.css';
	$prism_js_path   = 'assets/prism/prism.js';
	$prism_settings_path = 'assets/prism/prism-settings.js';

	// Enqueue view style.
	wp_enqueue_style(
		'mkaz-code-syntax-css',
		plugins_url( $view_style_path, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $view_style_path )
	);

	// Enqueue prism style.
	wp_enqueue_style(
		'mkaz-code-syntax-prism-css',
		mkaz_prism_theme_css(),
		[],
		mkaz_prism_theme_css_ver()
	);

	// Enqueue prism script.
	wp_enqueue_script(
		'mkaz-code-syntax-prism-js',
		plugins_url( $prism_js_path, __FILE__ ),
		[], // No dependencies.
		filemtime( plugin_dir_path( __FILE__ ) . $prism_js_path ),
		true // In footer.
	);

	// save the plugin path
	wp_localize_script('mkaz-code-syntax-prism-js', 'prism_settings', array(
		'pluginUrl' => plugin_dir_url(__FILE__),
	));
} );

/**
 * Locate a given resource URL in the active theme or with the default
 *
 * @param boolean $rtnPath True returns path, default false returns URL
 */
function mkaz_prism_theme_css( $rtnPath = false ) {

	$default_path = '/assets/prism/prism.css';

	/**
	 * Filter the theme directory path used for overriding css path
	 *
	 * @since 0.8.2
	 *
	 * @param string $path Path to the file to override, relative to the theme
	 */
	$css_rel_path = apply_filters( 'mkaz_prism_css_path', $default_path );
	$theme_file_path = get_stylesheet_directory() . $css_rel_path;

	if ( file_exists( $theme_file_path ) ) {
		$prism_css_path = $theme_file_path;
		$prism_css_url = get_stylesheet_directory_uri() . $css_rel_path;
	}
	else {
		$prism_css_path = plugin_dir_path( __FILE__ ) . $default_path;
		$prism_css_url = plugins_url( $default_path, __FILE__ );
	}

	if ( $rtnPath ) {
		return $prism_css_path;
	}

	/**
	 * Filter the URL of the Syntax Highlighting colors.
	 * Use this filter to define your own color set.
	 *
	 * @since 0.8.1
	 *
	 * @param string $prism_css_url Absolute URL of the default CSS file you want to enqueue.
	 */
	return apply_filters( 'mkaz_prism_css_url', $prism_css_url );
}

/**
 * Return timestamp for theme_css to be used in enqueue version
 *
 */
function mkaz_prism_theme_css_ver() {
	// check if full url is being used, if so return 0
	$prism_css_url = apply_filters( 'mkaz_prism_css_url', false );
	if ( $prism_css_url ) {
		return MKAZ_CODE_SYNTAX_BLOCK_VERSION;
	}

	$css_path = mkaz_prism_theme_css( true );
	if ( file_exists( $css_path ) ) {
		return filemtime( $css_path );
	}
	return MKAZ_CODE_SYNTAX_BLOCK_VERSION;
}

// extend code tag to allow lang attribute
add_filter( 'wp_kses_allowed_html', function( $tags ) {

	if ( is_array( $tags['code'] ) ) {
		$tags['code']['data-lang'] = array();
		$tags['code']['lang'] = array();
	} else {
		$tags['code'] = array(
			'data-lang' => array(),
			'lang' => array(),
		);
	}
    return $tags;
}, 10, 2);
