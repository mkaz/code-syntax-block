<?php
/**
 * Plugin Name:  Code Syntax Block
 * Plugin URI:   https://github.com/mkaz/code-syntax-block
 * Description:  A plugin to extend Gutenberg code block with syntax highlighting
 * Version:      0.8.1
 * Author:       Marcus Kazmierczak
 * Author URI:   https://mkaz.blog/
 * License:      GPL2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  code-syntax-block
 *
 * @package Code_Syntax_Block
 */

/**
 * Load text domain.
 */
function mkaz_load_plugin_textdomain() {
	load_plugin_textdomain( 'code-syntax-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'mkaz_load_plugin_textdomain' );

/**
 * Enqueue assets for editor portion of Gutenberg
 */
function mkaz_code_syntax_editor_assets() {
	// Files.
	$block_path        = 'code-syntax.js';
	$prism_languages_path = 'assets/prism/prism-languages.js';
	$editor_style_path = 'assets/blocks.editor.css';

	// Prism Languages
	wp_enqueue_script(
		'mkaz-code-syntax-langs',
		plugins_url( $prism_languages_path, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $prism_languages_path )
	);

	// Block.
	wp_enqueue_script(
		'mkaz-code-syntax',
		plugins_url( $block_path, __FILE__ ),
		array( 'wp-blocks', 'wp-editor', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

}
add_action( 'enqueue_block_editor_assets', 'mkaz_code_syntax_editor_assets' );

/**
 * Enqueue assets for viewing posts
 */
function mkaz_code_syntax_view_assets() {
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
		mkaz_prism_theme(),
		[],
		filemtime( mkaz_prism_theme(true) )
	);

	// Enqueue prism script.
	wp_enqueue_script(
		'mkaz-code-syntax-prism-css',
		plugins_url( $prism_js_path, __FILE__ ),
		[], // No dependencies.
		filemtime( plugin_dir_path( __FILE__ ) . $prism_js_path ),
		true // In footer.
	);

	// enqueue prism settings script
	wp_enqueue_script(
		'mkaz-code-syntax-prism-settings',
		plugins_url( $prism_settings_path, __FILE__ ),
		[], // no dependencies
		filemtime( plugin_dir_path(__FILE__) . $prism_settings_path ),
		true // in footer
	);

	// save the plugin path
	wp_localize_script('mkaz-code-syntax-prism-settings', 'settings', array(
		'pluginUrl' => plugin_dir_url(__FILE__),
	));
}
add_action( 'wp_enqueue_scripts', 'mkaz_code_syntax_view_assets' );

/**
 * Locate a given resource URL, either in the
 * active theme or with the default
 * 
 * @param $file The file to be located
 */
function mkaz_prism_theme( $path = false ) {

	$default_location = '/assets/prism/prism.css';

	/**
	 * Filter the theme directory used for resource overrides
	 *
	 * @since 0.x.x
	 *
	 * @param string $path Path to the override directory, relative to the theme
	 */
	$override_directory = apply_filters( 'mkaz_override_directory', "prism");
	$override_file_path = get_stylesheet_directory() . "/$override_directory/prism.css";

	if( file_exists( $override_file_path ) ) {
		$prism_css = ( $path ? $override_file_path : get_stylesheet_directory_uri() . "/$override_directory/prism.css" );
	}
	else {
		$prism_css = ( $path ? plugin_dir_path( __FILE__ ) . $default_location : plugins_url( $default_location, __FILE__ ) );
	}

	// Syntax Highlighting colors
	/**
	 * Filter the URL of the Syntax Highlighting colors.
	 * Use this filter to define your own color set.
	 * Kept for backwards compatibility
	 *
	 * @since 0.8.1
	 * @deprecated since 0.x.x in favor of file overriding 
	 *
	 * @param string $prism_css_url Absolute URL of the default CSS file you want to enqueue.
	 */
	$prism_css = apply_filters( 'mkaz_prism_css_' . ( $path ? 'path' : 'url'), $prism_css );

	return $prism_css;
}

